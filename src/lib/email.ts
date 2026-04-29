import nodemailer from "nodemailer";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "goldenrootssocial@gmail.com",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });
}

const COMPANY = "Golden Roots Properties";
const OFFICIAL_EMAIL = "goldenrootssocial@gmail.com";
const WHATSAPP = "+1 248-210-8333";
const WEBSITE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://goldenrootsproperties.com";

const emailBase = (body: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${COMPANY}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0f2d1a;padding:28px 40px;text-align:center;">
            <p style="margin:0;color:#f4c430;font-size:22px;font-weight:700;letter-spacing:1px;">${COMPANY}</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:2px;text-transform:uppercase;">Secure Land in Ghana</p>
          </td>
        </tr>
        <!-- Body -->
        <tr><td style="padding:40px;">${body}</td></tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;border-top:1px solid #e8e8e8;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:#999;font-size:11px;">Golden Roots Properties · Central Region, Ghana</p>
            <p style="margin:0 0 6px;color:#999;font-size:11px;">${OFFICIAL_EMAIL} · ${WHATSAPP}</p>
            <p style="margin:0;color:#bbb;font-size:10px;">
              This email was sent in connection with your enquiry on goldenrootsproperties.com.<br/>
              Your data is handled in accordance with our <a href="${WEBSITE}/privacy-policy" style="color:#bbb;">Privacy Policy</a>.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

// ── INTERNAL NOTIFICATION — new contact form submission ──────────────────────
export function buildContactNotification(data: {
  firstName: string; lastName: string; email: string;
  phone?: string; landInterest?: string; message: string;
}) {
  const subject = `New Enquiry: ${data.firstName} ${data.lastName} — ${COMPANY}`;
  const html = emailBase(`
    <h2 style="margin:0 0 24px;color:#0f2d1a;font-size:20px;">New Website Enquiry</h2>
    <table cellpadding="0" cellspacing="0" style="width:100%;">
      ${row("Name", `${data.firstName} ${data.lastName}`)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#2d6a4f;">${data.email}</a>`)}
      ${data.phone ? row("Phone / WhatsApp", data.phone) : ""}
      ${data.landInterest ? row("Land Interest", data.landInterest) : ""}
    </table>
    <div style="margin-top:24px;background:#f4f9f6;border-left:4px solid #f4c430;padding:16px 20px;border-radius:2px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;">Message</p>
      <p style="margin:0;color:#333;font-size:15px;line-height:1.6;">${data.message.replace(/\n/g, "<br/>")}</p>
    </div>
    <p style="margin:24px 0 0;font-size:13px;color:#999;">Reply directly to this email to respond to the enquiry.</p>
  `);
  return { subject, html, replyTo: data.email };
}

// ── CUSTOMER CONFIRMATION — contact form ────────────────────────────────────
export function buildContactConfirmation(firstName: string, email: string) {
  const subject = `We've received your enquiry — ${COMPANY}`;
  const html = emailBase(`
    <h2 style="margin:0 0 8px;color:#0f2d1a;font-size:22px;">Thank you, ${firstName}.</h2>
    <p style="margin:0 0 28px;color:#555;font-size:15px;line-height:1.7;">
      We've received your enquiry and a member of our team will be in touch within <strong>24 hours</strong>.
    </p>
    <div style="background:#0f2d1a;border-radius:4px;padding:28px 32px;margin:0 0 28px;">
      <p style="margin:0 0 16px;color:#f4c430;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1px;">What Happens Next</p>
      ${step("1", "Our team reviews your enquiry and contacts you by phone or WhatsApp within 24 hours.")}
      ${step("2", "We arrange a free virtual site tour so you can see your potential plot.")}
      ${step("3", "Once you're ready, we guide you through every step of payment and documentation.")}
      ${step("4", "Your title documents — Indenture & Site Plan — are delivered worldwide via DHL.")}
    </div>
    <p style="margin:0 0 8px;color:#555;font-size:14px;">Need to reach us sooner?</p>
    <p style="margin:0;font-size:14px;">
      <a href="https://wa.me/12482108333" style="color:#2d6a4f;font-weight:700;">WhatsApp: +1 248-210-8333</a> &nbsp;|&nbsp;
      <a href="mailto:${OFFICIAL_EMAIL}" style="color:#2d6a4f;font-weight:700;">${OFFICIAL_EMAIL}</a>
    </p>
  `);
  return { subject, html };
}

// ── INTERNAL NOTIFICATION — new purchase enquiry ─────────────────────────────
export function buildEnquiryNotification(data: {
  firstName: string; lastName: string; email: string; phone: string; country: string;
  landType: string; plots: string; purpose?: string;
  budget: string; timeline: string; paymentPlan?: string; additionalInfo?: string;
  plotRef: string;
}) {
  const subject = `[${data.plotRef}] Purchase Enquiry: ${data.firstName} ${data.lastName}`;
  const html = emailBase(`
    <div style="display:inline-block;background:#f4c430;padding:6px 14px;border-radius:2px;margin-bottom:20px;">
      <span style="color:#0f2d1a;font-weight:700;font-size:13px;letter-spacing:1px;">REF: ${data.plotRef}</span>
    </div>
    <h2 style="margin:0 0 24px;color:#0f2d1a;font-size:20px;">New Purchase Enquiry</h2>
    <p style="margin:0 0 16px;color:#555;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Personal Details</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:24px;">
      ${row("Name", `${data.firstName} ${data.lastName}`)}
      ${row("Email", `<a href="mailto:${data.email}" style="color:#2d6a4f;">${data.email}</a>`)}
      ${row("Phone / WhatsApp", data.phone)}
      ${row("Country", data.country)}
    </table>
    <p style="margin:0 0 16px;color:#555;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Land Interest</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:24px;">
      ${row("Land Type", data.landType)}
      ${row("Number of Plots", data.plots)}
      ${data.purpose ? row("Purpose", data.purpose) : ""}
    </table>
    <p style="margin:0 0 16px;color:#555;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Budget & Timeline</p>
    <table cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:24px;">
      ${row("Budget", data.budget)}
      ${row("Timeline", data.timeline)}
      ${data.paymentPlan ? row("Payment Preference", data.paymentPlan) : ""}
    </table>
    ${data.additionalInfo ? `
    <div style="background:#f4f9f6;border-left:4px solid #f4c430;padding:16px 20px;border-radius:2px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#888;">Additional Notes</p>
      <p style="margin:0;color:#333;font-size:14px;line-height:1.6;">${data.additionalInfo.replace(/\n/g, "<br/>")}</p>
    </div>` : ""}
    <p style="margin:0;font-size:13px;color:#999;">Reply directly to this email to respond to the enquiry.</p>
  `);
  return { subject, html, replyTo: data.email };
}

// ── CUSTOMER CONFIRMATION — purchase enquiry ────────────────────────────────
export function buildEnquiryConfirmation(firstName: string, plotRef: string) {
  const subject = `Your enquiry is confirmed [${plotRef}] — ${COMPANY}`;
  const html = emailBase(`
    <h2 style="margin:0 0 8px;color:#0f2d1a;font-size:22px;">Enquiry Confirmed, ${firstName}.</h2>
    <p style="margin:0 0 4px;color:#555;font-size:15px;">Your reference number:</p>
    <p style="margin:0 0 28px;font-size:28px;font-weight:700;color:#f4c430;letter-spacing:2px;">${plotRef}</p>
    <p style="margin:0 0 28px;color:#555;font-size:15px;line-height:1.7;">
      Our team will review your purchase enquiry and contact you within <strong>24 hours</strong> by phone or WhatsApp.
      Please keep your reference number handy.
    </p>
    <div style="background:#0f2d1a;border-radius:4px;padding:28px 32px;margin:0 0 28px;">
      <p style="margin:0 0 16px;color:#f4c430;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Your Next Steps</p>
      ${step("1", "Team review & call/WhatsApp within 24 hours.")}
      ${step("2", "Free virtual site tour of your chosen plot.")}
      ${step("3", "Guided payment and full documentation process.")}
      ${step("4", "Indenture + Site Plan delivered worldwide via DHL.")}
    </div>
    <p style="margin:0 0 8px;color:#555;font-size:14px;">Questions? We're here:</p>
    <p style="margin:0;font-size:14px;">
      <a href="https://wa.me/12482108333" style="color:#2d6a4f;font-weight:700;">WhatsApp: +1 248-210-8333</a> &nbsp;|&nbsp;
      <a href="mailto:${OFFICIAL_EMAIL}" style="color:#2d6a4f;font-weight:700;">${OFFICIAL_EMAIL}</a>
    </p>
  `);
  return { subject, html };
}

// ── SEND HELPER ──────────────────────────────────────────────────────────────
export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"${COMPANY}" <${OFFICIAL_EMAIL}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });
}

// ── TEMPLATE HELPERS ─────────────────────────────────────────────────────────
function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:6px 0;color:#888;font-size:13px;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;color:#222;font-size:13px;font-weight:600;">${value}</td>
    </tr>`;
}

function step(num: string, text: string) {
  return `
    <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
      <div style="min-width:24px;height:24px;background:#f4c430;color:#0f2d1a;font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;">${num}</div>
      <p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;line-height:1.6;">${text}</p>
    </div>`;
}
