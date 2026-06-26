import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { EventRegistration } from "@/models/EventRegistration";
import {
  sendMail,
  buildEventRegistrationNotification,
  buildEventRegistrationConfirmation,
  OFFICIAL_EMAIL,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, country, investorType, landInterest, heardFrom } = body;

    if (!firstName || !lastName || !email || !country || !investorType) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const existing = await EventRegistration.findOne({ email: email.toLowerCase(), eventSlug: "beyond-accra-2026" });
    if (existing) {
      return Response.json({ error: "already_registered" }, { status: 409 });
    }

    const registration = await EventRegistration.create({
      eventSlug: "beyond-accra-2026",
      firstName, lastName, email, phone, country, investorType, landInterest, heardFrom,
    });

    const notification = buildEventRegistrationNotification({ firstName, lastName, email, phone, country, investorType, landInterest, heardFrom });
    const confirmation = buildEventRegistrationConfirmation(firstName, email);

    await Promise.allSettled([
      sendMail({ to: OFFICIAL_EMAIL, fromName: `${firstName} ${lastName}`, ...notification }),
      sendMail({ to: email, subject: confirmation.subject, html: confirmation.html }),
    ]);

    return Response.json({ success: true, id: registration._id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/events/register error:", err);
    return Response.json({ error: "Registration failed" }, { status: 500 });
  }
}
