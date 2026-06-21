import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { verifyPassword, hashPassword, isLegacyHash } from "@/lib/password";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: "Email and password required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (isLegacyHash(user.passwordHash)) {
      user.passwordHash = await hashPassword(password);
      await user.save();
    }

    const token = await createSessionToken({
      sub: String(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { name: user.name, email: user.email, role: user.role },
    });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("POST /api/auth/login error:", err);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}
