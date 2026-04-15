import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Enquiry } from "@/models/Enquiry";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    if (!email) return Response.json({ error: "Email required" }, { status: 400 });

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase().trim() })
      .select("-passwordHash")
      .lean();

    if (!user) return Response.json({ error: "User not found" }, { status: 404 });

    const enquiry = await Enquiry.findOne({ email: email.toLowerCase().trim() })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ user, enquiry: enquiry ?? null });
  } catch (err) {
    console.error("GET /api/portal/me error:", err);
    return Response.json({ error: "Failed to load profile" }, { status: 500 });
  }
}
