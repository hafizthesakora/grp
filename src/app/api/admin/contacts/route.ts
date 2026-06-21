import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { requireRole } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { response } = await requireRole(request, ["admin"]);
  if (response) return response;
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return Response.json(contacts);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
