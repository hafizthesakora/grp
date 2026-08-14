import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { EventRegistration } from "@/models/EventRegistration";
import {
  sendMail,
  buildEventRegistrationNotification,
  buildEventRegistrationConfirmation,
  buildFestivalRegistrationNotification,
  buildFestivalRegistrationConfirmation,
  OFFICIAL_EMAIL,
} from "@/lib/email";

const FESTIVAL = "roots-festival-2026";
const WEBINAR = "beyond-accra-2026";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName, lastName, email, phone, country, investorType, landInterest,
      comingFrom, attendingAs, guests, heardFrom,
    } = body;

    const eventSlug = body.eventSlug === FESTIVAL ? FESTIVAL : WEBINAR;
    const isFestival = eventSlug === FESTIVAL;

    // Shared requirements, then the fields that only matter for one event.
    if (!firstName || !lastName || !email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (isFestival && (!phone || !comingFrom || !attendingAs)) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isFestival && (!country || !investorType)) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const existing = await EventRegistration.findOne({ email: email.toLowerCase(), eventSlug });
    if (existing) {
      return Response.json({ error: "already_registered" }, { status: 409 });
    }

    const guestCount = Math.min(Math.max(parseInt(String(guests), 10) || 1, 1), 50);

    const registration = await EventRegistration.create({
      eventSlug,
      firstName, lastName, email, phone, heardFrom,
      ...(isFestival
        ? { comingFrom, attendingAs, guests: guestCount }
        : { country, investorType, landInterest }),
    });

    const notification = isFestival
      ? buildFestivalRegistrationNotification({ firstName, lastName, email, phone, comingFrom, attendingAs, guests: guestCount, heardFrom })
      : buildEventRegistrationNotification({ firstName, lastName, email, phone, country, investorType, landInterest, heardFrom });

    const confirmation = isFestival
      ? buildFestivalRegistrationConfirmation(firstName, guestCount, attendingAs)
      : buildEventRegistrationConfirmation(firstName, email);

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
