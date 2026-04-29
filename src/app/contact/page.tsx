"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, ExternalLink, MessageCircle, CheckCircle2, ShieldCheck, Lock, BadgeCheck } from "lucide-react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  landInterest: string;
  message: string;
  agreed: boolean;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", phone: "", landInterest: "", message: "", agreed: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormState, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) { setError("Please confirm you have read and agree to the Privacy Policy."); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Submission failed. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-green-950 pt-52 pb-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">Get in Touch</span>
            </div>
            <h1 className="font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              Start Your Journey
            </h1>
            <p className="text-white/60 text-lg max-w-xl">
              We welcome enquiries from individuals and institutional investors.
              Our team responds within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="grid lg:grid-cols-5 gap-10">

              {/* Left — info */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {[
                  { icon: Mail, label: "Email", value: "goldenrootssocial@gmail.com", href: "mailto:goldenrootssocial@gmail.com" },
                  { icon: Phone, label: "International / WhatsApp", value: "+1 248-210-8333", href: "https://wa.me/12482108333" },
                  { icon: Phone, label: "Ghana Line", value: "+233 54-083-9298", href: "tel:+233540839298" },
                  { icon: MapPin, label: "Location", value: "Central Region, Ghana", href: undefined },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-5 border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                    <div className="w-12 h-12 bg-green-950 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                           rel="noopener noreferrer"
                           className="text-green-950 font-semibold hover:text-gold-500 transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-green-950 font-semibold">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Calendly block */}
                <div className="bg-gold-400 p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <ExternalLink className="w-4 h-4 text-green-950" />
                    <p className="text-green-950 font-bold">Book a Free Consultation</p>
                  </div>
                  <p className="text-green-800 text-sm mb-5">
                    30-minute call with our team. Discuss your goals, land options, and any questions — no commitment required.
                  </p>
                  <a href="https://calendly.com/goldenrootspropertiesgh/30min" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold text-sm px-3 pr-5 py-2.5 transition-colors">
                    <span className="bg-gold-400 w-7 h-7 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-green-950" />
                    </span>
                    Book on Calendly
                  </a>
                </div>

                {/* WhatsApp block */}
                <div className="bg-green-950 p-7 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-bold mb-1">Chat on WhatsApp</p>
                    <p className="text-white/40 text-sm">Our fastest response channel</p>
                  </div>
                  <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-4 py-2.5 transition-colors shrink-0">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-3 border border-gray-100 p-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="block w-6 h-px bg-gray-400" />
                  <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Send an Enquiry</span>
                </div>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-gold-400 flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-8 h-8 text-green-950" />
                    </div>
                    <h3 className="text-green-950 font-bold text-xl mb-2">Message Received!</h3>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Thank you, <strong>{form.firstName}</strong>. We&apos;ll respond to <strong>{form.email}</strong> within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">First Name *</label>
                        <input type="text" required value={form.firstName} onChange={e => set("firstName", e.target.value)}
                               placeholder="John"
                               className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors" />
                      </div>
                      <div>
                        <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Last Name *</label>
                        <input type="text" required value={form.lastName} onChange={e => set("lastName", e.target.value)}
                               placeholder="Mensah"
                               className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Email Address *</label>
                      <input type="email" required value={form.email} onChange={e => set("email", e.target.value)}
                             placeholder="your@email.com"
                             className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors" />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Phone / WhatsApp</label>
                      <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                             placeholder="+1 234 567 8900"
                             className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors" />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Land Interest</label>
                      <select value={form.landInterest} onChange={e => set("landInterest", e.target.value)}
                              className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors bg-white">
                        <option value="">Select a land type...</option>
                        <option>Residential Land</option>
                        <option>Agro-Industrial Land</option>
                        <option>Beach Land</option>
                        <option>Off-Market Opportunity</option>
                        <option>General Enquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Message *</label>
                      <textarea rows={5} required value={form.message} onChange={e => set("message", e.target.value)}
                                placeholder="Tell us about your goals, budget, and any specific requirements..."
                                className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors resize-none" />
                    </div>
                    {/* Legal consent */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.agreed}
                        onChange={e => set("agreed", e.target.checked)}
                        className="mt-0.5 accent-gold-400 w-4 h-4 shrink-0"
                      />
                      <span className="text-gray-500 text-xs leading-relaxed">
                        I agree to Golden Roots Properties contacting me regarding this enquiry and confirm that I have read the{" "}
                        <Link href="/privacy-policy" target="_blank" className="text-green-700 hover:text-green-900 underline underline-offset-2">Privacy Policy</Link>
                        {" "}and{" "}
                        <Link href="/terms" target="_blank" className="text-green-700 hover:text-green-900 underline underline-offset-2">Terms &amp; Conditions</Link>.
                      </span>
                    </label>

                    {/* Trust signals */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: ShieldCheck, text: "Lands Commission Verified" },
                        { icon: Lock, text: "SSL Encrypted" },
                        { icon: BadgeCheck, text: "Data Never Sold" },
                      ].map(t => (
                        <div key={t.text} className="flex flex-col items-center gap-1.5 bg-green-50 border border-green-100 p-3 text-center">
                          <t.icon className="w-4 h-4 text-green-700" />
                          <span className="text-green-800 text-xs font-semibold leading-snug">{t.text}</span>
                        </div>
                      ))}
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
                    )}
                    <button type="submit" disabled={submitting}
                            className="inline-flex items-center justify-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold py-4 transition-colors disabled:opacity-60">
                      {submitting
                        ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        : <><span className="bg-gold-400 w-7 h-7 flex items-center justify-center">
                            <ArrowRight className="w-3.5 h-3.5 text-green-950" />
                          </span>
                          Send Enquiry</>
                      }
                    </button>
                    <p className="text-gray-400 text-xs text-center">
                      We respond within 24 hours · SSL encrypted · Your data is never sold to third parties
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
