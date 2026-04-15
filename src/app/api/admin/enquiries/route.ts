import { connectDB } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
    // Attach portal account status to each enquiry
    const emails = enquiries.map(e => e.email);
    const users = await User.find({ email: { $in: emails } }).select("email").lean();
    const userEmails = new Set(users.map(u => u.email));
    const result = enquiries.map(e => ({ ...e, hasPortalAccount: userEmails.has(e.email) }));
    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
