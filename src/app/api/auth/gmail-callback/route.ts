import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "No authorisation code returned" }, { status: 400 });
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const redirectUri = `${base}/api/auth/gmail-callback`;

  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const tokens = await res.json();

  if (!res.ok || !tokens.refresh_token) {
    return NextResponse.json({
      error: "Token exchange failed",
      details: tokens,
    }, { status: 500 });
  }

  // Display the refresh token — copy it into GMAIL_REFRESH_TOKEN in .env.local
  // and in your Vercel environment variables.
  return new NextResponse(`
    <!DOCTYPE html>
    <html>
    <head><title>Gmail OAuth2 Setup — Golden Roots</title>
    <style>
      body { font-family: monospace; background: #0f2d1a; color: #fff; display: flex;
             align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
      .box { background: #1a4028; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px;
             padding: 40px; max-width: 640px; width: 100%; }
      h1 { color: #f4c430; margin: 0 0 8px; font-size: 20px; }
      p { color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 24px; }
      label { display: block; color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase;
              letter-spacing: 1px; margin-bottom: 8px; }
      code { display: block; background: #0f2d1a; color: #f4c430; padding: 14px 18px;
             border-radius: 4px; word-break: break-all; font-size: 13px; user-select: all; }
      .step { background: rgba(244,196,48,0.08); border-left: 3px solid #f4c430; padding: 12px 16px;
              margin-bottom: 10px; font-size: 13px; color: rgba(255,255,255,0.7); }
    </style>
    </head>
    <body>
    <div class="box">
      <h1>✓ Gmail Authorised</h1>
      <p>Copy the refresh token below and add it to your environment variables.</p>
      <label>GMAIL_REFRESH_TOKEN</label>
      <code>${tokens.refresh_token}</code>
      <br/>
      <div class="step">1. Add to <strong>.env.local</strong>:<br/>
        <code style="margin-top:8px;display:block;">GMAIL_REFRESH_TOKEN="${tokens.refresh_token}"</code>
      </div>
      <div class="step">2. Add to <strong>Vercel → Settings → Environment Variables</strong> as well.</div>
      <div class="step">3. Restart your dev server.</div>
    </div>
    </body>
    </html>
  `, { status: 200, headers: { "Content-Type": "text/html" } });
}
