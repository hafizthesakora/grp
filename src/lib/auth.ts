import { SignJWT, jwtVerify } from "jose";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE = "grp_session";
const ALG = "HS256";

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export type Role = "admin" | "client";

export interface SessionPayload {
  sub: string;
  email: string;
  name: string;
  role: Role;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: [ALG] });
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") return null;
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSessionFromRequest(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// Authoritative server-side check used inside Route Handlers. Returns a 401/403
// Response when access should be denied, or null when the caller may proceed.
export async function requireRole(
  request: NextRequest,
  roles: Role[]
): Promise<{ response: Response; session: null } | { response: null; session: SessionPayload }> {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return { response: Response.json({ error: "Unauthorized" }, { status: 401 }), session: null };
  }
  if (!roles.includes(session.role)) {
    return { response: Response.json({ error: "Forbidden" }, { status: 403 }), session: null };
  }
  return { response: null, session };
}
