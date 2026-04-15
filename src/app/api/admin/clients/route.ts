import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Enquiry } from "@/models/Enquiry";
import crypto from "crypto";

function hash(p: string) { return crypto.createHash("sha256").update(p).digest("hex"); }

// GET — list all client users with their enquiry
export async function GET() {
  try {
    await connectDB();
    const clients = await User.find({ role: "client" }).select("-passwordHash").sort({ createdAt: -1 }).lean();
    const emails = clients.map(c => c.email);
    const enquiries = await Enquiry.find({ email: { $in: emails } }).sort({ createdAt: -1 }).lean();
    const enquiryMap = new Map<string, typeof enquiries[0]>();
    for (const e of enquiries) {
      if (!enquiryMap.has(e.email)) enquiryMap.set(e.email, e);
    }
    const result = clients.map(c => ({ ...c, enquiry: enquiryMap.get(c.email) ?? null }));
    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}

// POST — create a portal account for a client
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return Response.json({ error: "Name, email and password are required" }, { status: 400 });
    }
    await connectDB();
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return Response.json({ error: "An account already exists for this email" }, { status: 409 });
    }
    const user = await User.create({
      email: email.toLowerCase().trim(),
      passwordHash: hash(password),
      name: name.trim(),
      role: "client",
    });
    return Response.json({ success: true, id: user._id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to create account" }, { status: 500 });
  }
}
