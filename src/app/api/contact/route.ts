import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, landInterest, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const contact = await Contact.create({ firstName, lastName, email, phone, landInterest, message });

    return Response.json({ success: true, id: contact._id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return Response.json({ error: "Failed to save message" }, { status: 500 });
  }
}
