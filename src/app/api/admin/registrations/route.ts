import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { EventRegistration } from "@/models/EventRegistration";
import { requireRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { response } = await requireRole(request, ["admin"]);
  if (response) return response;

  await connectDB();
  const registrations = await EventRegistration.find().sort({ createdAt: -1 }).lean();
  return Response.json(registrations);
}
