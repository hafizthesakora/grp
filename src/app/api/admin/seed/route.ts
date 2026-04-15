import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import crypto from "crypto";

function hash(p: string) { return crypto.createHash("sha256").update(p).digest("hex"); }

// GET /api/admin/seed  — run once to create the admin account (dev only)
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not available in production" }, { status: 403 });
  }
  const adminPassword = process.env.ADMIN_PASSWORD ?? "GRP-Admin-2024";
  try {
    await connectDB();
    const existing = await User.findOne({ email: "admin@goldenroots.com" });
    if (existing) return Response.json({ message: "Admin already exists" });
    await User.create({
      email: "admin@goldenroots.com",
      passwordHash: hash(adminPassword),
      name: "Golden Roots Admin",
      role: "admin",
    });
    return Response.json({ success: true, message: `Admin created — password: ${adminPassword}` });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Seed failed" }, { status: 500 });
  }
}
