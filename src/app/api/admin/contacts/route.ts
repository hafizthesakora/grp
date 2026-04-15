import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    return Response.json(contacts);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
