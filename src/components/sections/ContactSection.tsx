"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

type FormState = {
  firstName: string; lastName: string; email: string;
  phone: string; landInterest: string; message: string;
  agreed: boolean;
};

const EMPTY: FormState = {
  firstName: "", lastName: "", email: "",
  phone: "", landInterest: "", message: "",
  agreed: false,
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof FormState, v: string | boolean) =>
    setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.agreed) { setError("Please agree to the Privacy Policy before sending."); return; }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName, lastName: form.lastName,
          email: form.email, phone: form.phone,
          landInterest: form.landInterest, message: form.message,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Submission failed");
      }
      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-green-950 py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="block w-6 h-px bg-gold-400/50" />
            <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">Get in Touch</span>
          </div>
          <h2 className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Start Your Journey
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <div className="flex flex-col gap-6">
            {[
              { icon: Mail, label: "Email", value: "goldenrootssocial@gmail.com", href: "mailto:goldenrootssocial@gmail.com" },
              { icon: Phone, label: "International / WhatsApp", value: "+1 248-210-8333", href: "https://wa.me/12482108333" },
              { icon: Phone, label: "Ghana Line", value: "+233 54-083-9298", href: "tel:+233540839298" },
              { icon: MapPin, label: "Location", value: "Central Region, Ghana", href: undefined },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider font-bold mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                       className="text-white font-semibold hover:text-gold-400 transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-white font-semibold">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Trust signals */}
            <div className="mt-2 border border-white/10 p-5 flex flex-col gap-3">
              {[
                { icon: ShieldCheck, text: "All plots verified by Ghana Lands Commission" },
                { icon: Lock, text: "Your data is never sold or shared with third parties" },
                { icon: CheckCircle2, text: "No commitment required — free consultation included" },
              ].map(t => (
                <div key={t.text} className="flex items-center gap-3">
                  <t.icon className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="text-white/50 text-sm">{t.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-gold-400 p-8">
              <p className="text-green-950 font-bold text-xl mb-2">Book a Free Consultation</p>
              <p className="text-green-800 text-sm mb-6">30-minute call with our team — no commitment required.</p>
              <a
                href="https://calendly.com/goldenrootspropertiesgh/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-900 text-white font-bold text-sm px-3 pr-5 py-2.5 rounded transition-colors"
              >
                <span className="bg-gold-400 w-7 h-7 flex items-center justify-center rounded-sm">
                  <ArrowRight className="w-3.5 h-3.5 text-green-950" />
                </span>
                Book on Calendly
              </a>
            </div>
          </div>

          {/* Right — enquiry form */}
          <div className="bg-white/5 border border-white/10 p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <div className="w-16 h-16 bg-gold-400 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-950" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">Enquiry Sent!</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                  Check your inbox for a confirmation email.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-gold-400 text-sm font-semibold hover:text-gold-300 transition-colors"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <>
                <p className="text-white font-bold text-xl mb-6">Send an Enquiry</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">First Name *</label>
                      <input
                        type="text" required value={form.firstName}
                        onChange={e => set("firstName", e.target.value)}
                        placeholder="John"
                        className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Last Name *</label>
                      <input
                        type="text" required value={form.lastName}
                        onChange={e => set("lastName", e.target.value)}
                        placeholder="Mensah"
                        className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Email *</label>
                    <input
                      type="email" required value={form.email}
                      onChange={e => set("email", e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Phone / WhatsApp</label>
                    <input
                      type="tel" value={form.phone}
                      onChange={e => set("phone", e.target.value)}
                      placeholder="+1 234 567 8900"
                      className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Land Interest</label>
                    <select
                      value={form.landInterest}
                      onChange={e => set("landInterest", e.target.value)}
                      className="w-full bg-green-950 border border-white/10 text-white/70 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50"
                    >
                      <option value="">Select a land type...</option>
                      <option>Residential Land</option>
                      <option>Agro-Industrial Land</option>
                      <option>Beach Land</option>
                      <option>Off-Market Opportunity</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Message *</label>
                    <textarea
                      rows={4} required value={form.message}
                      onChange={e => set("message", e.target.value)}
                      placeholder="Tell us about your goals and requirements..."
                      className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50 resize-none"
                    />
                  </div>

                  {/* Legal consent */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.agreed}
                      onChange={e => set("agreed", e.target.checked)}
                      className="mt-0.5 accent-gold-400 w-4 h-4 shrink-0"
                    />
                    <span className="text-white/40 text-xs leading-relaxed">
                      I agree to Golden Roots Properties contacting me regarding this enquiry, and I have read
                      the{" "}
                      <Link href="/privacy-policy" className="text-gold-400/70 hover:text-gold-400 underline" target="_blank">Privacy Policy</Link>
                      {" "}and{" "}
                      <Link href="/terms" className="text-gold-400/70 hover:text-gold-400 underline" target="_blank">Terms & Conditions</Link>.
                    </span>
                  </label>

                  {error && (
                    <p className="text-red-400 text-xs bg-red-900/20 border border-red-400/20 px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold py-3.5 transition-colors mt-2 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <span className="w-5 h-5 border-2 border-green-950/30 border-t-green-950 rounded-full animate-spin" />
                    ) : (
                      <>
                        <span className="bg-white w-7 h-7 flex items-center justify-center rounded-sm">
                          <ArrowRight className="w-3.5 h-3.5 text-green-900" />
                        </span>
                        Send Enquiry
                      </>
                    )}
                  </button>

                  <p className="text-white/20 text-xs text-center">
                    We respond within 24 hours · SSL encrypted · Your data is never sold
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
