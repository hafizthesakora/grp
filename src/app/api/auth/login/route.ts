import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: "Email and password required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase().trim() }).lean();

    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const hash = hashPassword(password);
    if (hash !== user.passwordHash) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return Response.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("POST /api/auth/login error:", err);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
