import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";
import { User } from "@/models/User";
import crypto from "crypto";

function hash(p: string) { return crypto.createHash("sha256").update(p).digest("hex"); }

// PUT /api/admin/clients/[id]
// Body can contain: { completedSteps, currentStep } to update journey
//                or { password } to reset password
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    // Journey update (id = enquiry _id)
    if ("completedSteps" in body || "currentStep" in body) {
      const update: Record<string, unknown> = {};
      if (body.completedSteps !== undefined) update.completedSteps = body.completedSteps;
      if (body.currentStep !== undefined) update.currentStep = body.currentStep;
      const enquiry = await Enquiry.findByIdAndUpdate(id, update, { new: true });
      if (!enquiry) return Response.json({ error: "Enquiry not found" }, { status: 404 });
      return Response.json({ success: true, enquiry });
    }

    // Password reset (id = user _id)
    if ("password" in body) {
      if (!body.password || body.password.length < 6) {
        return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      const user = await User.findByIdAndUpdate(id, { passwordHash: hash(body.password) }, { new: true });
      if (!user) return Response.json({ error: "User not found" }, { status: 404 });
      return Response.json({ success: true });
    }

    return Response.json({ error: "No valid fields to update" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE /api/admin/clients/[id] — remove portal account
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const user = await User.findByIdAndDelete(id);
    if (!user) return Response.json({ error: "User not found" }, { status: 404 });
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
