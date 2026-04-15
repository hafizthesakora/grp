import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// GET /api/auth/seed — run once to create the demo user
// Remove or protect this route before going to production
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    await connectDB();

    const existing = await User.findOne({ email: "demo@goldenroots.com" });
    if (existing) {
      return Response.json({ message: "Demo user already exists" });
    }

    await User.create({
      email: "demo@goldenroots.com",
      passwordHash: hashPassword("demo123"),
      name: "Samuel Owusu",
      role: "client",
    });

    return Response.json({ success: true, message: "Demo user created" });
  } catch (err) {
    console.error("Seed error:", err);
    return Response.json({ error: "Seed failed" }, { status: 500 });
  }
}
