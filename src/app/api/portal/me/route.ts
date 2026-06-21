import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Enquiry } from "@/models/Enquiry";
import { requireRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { response, session } = await requireRole(request, ["admin", "client"]);
  if (response) return response;

  try {
    await connectDB();

    const user = await User.findOne({ email: session.email })
      .select("-passwordHash")
      .lean();

    if (!user) return Response.json({ error: "User not found" }, { status: 404 });

    const enquiry = await Enquiry.findOne({ email: session.email })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ user, enquiry: enquiry ?? null });
  } catch (err) {
    console.error("GET /api/portal/me error:", err);
    return Response.json({ error: "Failed to load profile" }, { status: 500 });
  }
}
