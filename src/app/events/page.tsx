"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { Calendar, Clock, Monitor, Users, ArrowRight, CheckSquare, ChevronRight } from "lucide-react";

const AGENDA = [
  { time: "00:05 – 00:20", title: "The Accra Problem", desc: "A clear-eyed look at what has gone wrong in the capital's land market — pricing, litigation, saturation. Why diaspora buyers are over-exposed." },
  { time: "00:20 – 00:45", title: "The Thesis", desc: "Where the next wave is forming, and why now. The five conditions — geography, commerce, governance, infrastructure, demand. Live map walkthrough." },
  { time: "00:45 – 01:00", title: "The Next Wave", desc: "How Ghanaian land cycles have moved, where they are moving next, and how to read the early signals. Includes the lease-based agro thesis." },
  { time: "01:00 – 01:15", title: "How to Buy Without Losing Sleep", desc: "A practical framework: the six-checkpoint verification standard, what good documentation looks like, how to buy from abroad safely." },
  { time: "01:15 – 01:30", title: "Live Q&A", desc: "Open audience questions, moderated. Recording shared with all registrants within 24 hours." },
];

const AUDIENCE = [
  { label: "Diaspora Ghanaians", detail: "UK, US, Canada, Germany, Netherlands, Gulf — considering a first or second land purchase with a 5–20 year horizon." },
  { label: "Local Ghana Investors", detail: "Accra and Kumasi-based professionals reaching the ceiling of capital-city plot pricing." },
  { label: "Agribusiness Operators", detail: "Small and medium agribusiness looking for verified, transport-accessible acreage." },
  { label: "Coastal Entrepreneurs", detail: "Hospitality developers exploring boutique-resort positioning along the Central Region coastline." },
];

const LAND_INTERESTS = ["Residential Land", "Beach Land", "Agro-Industrial Land", "All / Still Deciding"];

type FormState = "idle" | "submitting" | "success" | "already" | "error";

export default function EventsPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    country: "", investorType: "", landInterest: "", heardFrom: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function set(key: keyof typeof form, val: string) {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  }

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.country.trim()) e.country = "Required";
    if (!form.investorType) e.investorType = "Please select one";
    return e;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setState("submitting");
    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.status === 409) { setState("already"); return; }
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  const inputBase = "w-full border px-4 py-3 text-sm text-green-950 focus:outline-none transition-colors bg-white";
  const inputStyle = (field: keyof typeof form) =>
    `${inputBase} ${errors[field] ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-gold-500"}`;

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section className="bg-green-950 pt-52 pb-0 relative overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.03]"
               style={{ backgroundImage: "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)" }} />

          <div className="relative max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — event info */}
              <div className="pb-16 lg:pb-24">
                <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 px-3 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-gold-400 font-bold text-xs tracking-widest uppercase">Free Webinar · Registration Open</span>
                </div>

                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                  Golden Roots Properties · 2026
                </p>

                <h1 className="font-bold text-white leading-[1.05] mb-4"
                    style={{ fontSize: "clamp(44px, 6vw, 84px)" }}>
                  Beyond<br />Accra
                </h1>
                <p className="text-gold-400 font-medium mb-8"
                   style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                  Where the next wave of Ghanaian land is forming.
                </p>
                <p className="text-white/55 text-base leading-relaxed mb-10 max-w-lg">
                  A 90-minute thesis-led webinar for diaspora and local investors weighing where to put their next land cedi. Not a sales pitch — a structured case for rethinking the Ghanaian land map.
                </p>

                {/* Event meta pills */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { icon: Calendar, text: "Sat 25 July 2026" },
                    { icon: Clock, text: "90 minutes" },
                    { icon: Monitor, text: "Virtual · Zoom" },
                    { icon: Users, text: "Diaspora + Local" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2">
                      <Icon className="w-3.5 h-3.5 text-gold-400" />
                      <span className="text-white/70 text-sm font-semibold">{text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-6 py-3 transition-all hover:shadow-lg hover:shadow-gold-400/30"
                >
                  <span className="bg-white w-8 h-8 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-green-900" />
                  </span>
                  Reserve My Spot — Free
                </button>

                <p className="text-white/25 text-xs mt-4">
                  Recording shared with all registrants · No payment required
                </p>
              </div>

              {/* Right — registration form (desktop: overlaps into next section) */}
              <div ref={formRef} className="lg:sticky lg:top-28 pb-0 lg:-mb-16">
                <div className="bg-white shadow-2xl shadow-black/30">
                  {/* Form header */}
                  <div className="bg-[#0a2112] px-7 py-6 border-b-4 border-gold-400">
                    <p className="text-gold-400 font-bold text-xs tracking-[0.15em] uppercase mb-1">Register Now</p>
                    <p className="text-white font-bold text-xl leading-tight">Beyond Accra · 25 July 2026</p>
                    <p className="text-white/40 text-sm mt-1">Free · Seats are limited</p>
                  </div>

                  <div className="px-7 py-6">
                    {state === "success" ? (
                      <div className="text-center py-6">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckSquare className="w-7 h-7 text-green-700" />
                        </div>
                        <p className="text-green-950 font-bold text-xl mb-2">You&apos;re registered!</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          A confirmation email is on its way to <strong>{form.email}</strong>. We&apos;ll send your Zoom link closer to the date.
                        </p>
                      </div>
                    ) : state === "already" ? (
                      <div className="text-center py-6">
                        <div className="w-14 h-14 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckSquare className="w-7 h-7 text-gold-600" />
                        </div>
                        <p className="text-green-950 font-bold text-xl mb-2">Already registered!</p>
                        <p className="text-gray-500 text-sm">
                          <strong>{form.email}</strong> is already on the list. Check your inbox for the confirmation email.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={submit} noValidate className="space-y-4">
                        {/* Name row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">First Name *</label>
                            <input value={form.firstName} onChange={e => set("firstName", e.target.value)}
                                   placeholder="Kofi" className={inputStyle("firstName")} />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                          </div>
                          <div>
                            <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Last Name *</label>
                            <input value={form.lastName} onChange={e => set("lastName", e.target.value)}
                                   placeholder="Mensah" className={inputStyle("lastName")} />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Email Address *</label>
                          <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                                 placeholder="you@example.com" className={inputStyle("email")} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">WhatsApp / Phone <span className="normal-case font-normal text-gray-400">(optional)</span></label>
                          <input value={form.phone} onChange={e => set("phone", e.target.value)}
                                 placeholder="+1 234 567 8900" className={inputStyle("phone")} />
                        </div>

                        {/* Country */}
                        <div>
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Country / Where are you based? *</label>
                          <input value={form.country} onChange={e => set("country", e.target.value)}
                                 placeholder="e.g. United Kingdom, USA, Ghana" className={inputStyle("country")} />
                          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                        </div>

                        {/* Investor type */}
                        <div>
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-2">Investor Profile *</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { val: "diaspora", label: "Diaspora", sub: "Outside Ghana" },
                              { val: "local", label: "Ghana-based", sub: "Local investor" },
                            ].map(opt => (
                              <button key={opt.val} type="button"
                                      onClick={() => set("investorType", opt.val)}
                                      className={`text-left p-3 border transition-colors ${form.investorType === opt.val ? "border-gold-500 bg-gold-50" : "border-gray-200 hover:border-gray-300"}`}>
                                <p className={`font-bold text-sm ${form.investorType === opt.val ? "text-green-950" : "text-gray-700"}`}>{opt.label}</p>
                                <p className="text-gray-400 text-xs">{opt.sub}</p>
                              </button>
                            ))}
                          </div>
                          {errors.investorType && <p className="text-red-500 text-xs mt-1">{errors.investorType}</p>}
                        </div>

                        {/* Land interest */}
                        <div>
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">Primary Land Interest <span className="normal-case font-normal text-gray-400">(optional)</span></label>
                          <select value={form.landInterest} onChange={e => set("landInterest", e.target.value)}
                                  className={`${inputStyle("landInterest")} cursor-pointer`}>
                            <option value="">Select one…</option>
                            {LAND_INTERESTS.map(l => <option key={l} value={l}>{l}</option>)}
                          </select>
                        </div>

                        {/* Heard from */}
                        <div>
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5">How did you hear about this? <span className="normal-case font-normal text-gray-400">(optional)</span></label>
                          <input value={form.heardFrom} onChange={e => set("heardFrom", e.target.value)}
                                 placeholder="e.g. Instagram, WhatsApp, a friend…" className={inputStyle("heardFrom")} />
                        </div>

                        {state === "error" && (
                          <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
                            Something went wrong. Please try again or email us at goldenrootssocial@gmail.com.
                          </p>
                        )}

                        <button type="submit" disabled={state === "submitting"}
                                className="w-full bg-gold-400 hover:bg-gold-300 text-green-950 font-bold py-3.5 text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                          {state === "submitting" ? (
                            <><span className="w-4 h-4 border-2 border-green-900/30 border-t-green-900 rounded-full animate-spin" /> Registering…</>
                          ) : (
                            <><ArrowRight className="w-4 h-4" /> Reserve My Free Spot</>
                          )}
                        </button>

                        <p className="text-gray-400 text-xs text-center">
                          Free to attend · No credit card required · Zoom link sent before the event
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU'LL LEAVE WITH ── */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <AnimateIn>
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-6 h-px bg-gray-300" />
                <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Why Attend</span>
              </div>
              <h2 className="font-bold text-green-950 mb-4" style={{ fontSize: "clamp(26px, 3vw, 42px)" }}>
                What You&apos;ll Leave With
              </h2>
              <p className="text-gray-500 text-base max-w-xl mb-12 leading-relaxed">
                This is not a sales presentation. It&apos;s a thesis-led conversation about geography, governance, and timing — the three things that determine whether land in Ghana appreciates or disappears into a dispute.
              </p>
            </AnimateIn>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: "01", title: "A clear framework for evaluating Ghanaian land", body: "Understand what makes a land market defensible — and what the red flags look like before you sign." },
                { num: "02", title: "A structured view of why Accra has peaked for new entrants", body: "Pricing, litigation patterns, and saturation explained plainly with evidence, not opinion." },
                { num: "03", title: "A working map of where the next wave is forming", body: "The specific corridor where five rare conditions converge today — its strengths, risks, and 5–10 year trajectory." },
              ].map(c => (
                <AnimateIn key={c.num} delay={0.05}>
                  <div className="border border-gray-100 p-8 hover:shadow-xl hover:shadow-black/5 transition-shadow">
                    <p className="text-gold-400 font-extrabold text-3xl mb-4 leading-none">{c.num}</p>
                    <h3 className="text-green-950 font-bold text-base mb-3 leading-snug">{c.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{c.body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── AGENDA ── */}
        <section className="bg-green-950 py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <AnimateIn>
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-6 h-px bg-white/20" />
                <span className="text-white/40 font-bold text-sm tracking-widest uppercase">Programme</span>
              </div>
              <h2 className="font-bold text-white mb-12" style={{ fontSize: "clamp(26px, 3vw, 42px)" }}>
                90 Minutes, Five Segments
              </h2>
            </AnimateIn>

            <div className="max-w-3xl space-y-0">
              {AGENDA.map((item, i) => (
                <AnimateIn key={item.title} delay={i * 0.07}>
                  <div className={`flex gap-6 py-7 ${i < AGENDA.length - 1 ? "border-b border-white/8" : ""}`}>
                    <div className="shrink-0 w-28 pt-0.5">
                      <p className="text-gold-400/70 text-xs font-bold font-mono">{item.time}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-gold-400 flex items-center justify-center shrink-0">
                          <ChevronRight className="w-3 h-3 text-green-950" />
                        </div>
                        <h3 className="text-white font-bold text-base">{item.title}</h3>
                      </div>
                      <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO THIS IS FOR ── */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <AnimateIn>
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-6 h-px bg-gray-300" />
                <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Audience</span>
              </div>
              <h2 className="font-bold text-green-950 mb-12" style={{ fontSize: "clamp(26px, 3vw, 42px)" }}>
                Who This Is For
              </h2>
            </AnimateIn>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {AUDIENCE.map((a, i) => (
                <AnimateIn key={a.label} delay={i * 0.05}>
                  <div className="flex gap-4 p-6 border border-gray-100">
                    <CheckSquare className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-950 font-bold text-sm mb-1">{a.label}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{a.detail}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── THESIS QUOTE / CTA ── */}
        <section className="bg-gold-400 py-16">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <AnimateIn>
              <div className="max-w-3xl">
                <p className="text-green-950/40 font-bold text-xs uppercase tracking-widest mb-4">The Conclusion We Walk You To</p>
                <blockquote className="text-green-950 font-bold leading-tight mb-6"
                            style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}>
                  Right corridor.<br />Right moment.<br />Right paperwork.
                </blockquote>
                <p className="text-green-900/70 text-base leading-relaxed mb-8 max-w-2xl">
                  This corridor offers what Accra used to: defensible title, reasonable entry prices, real end-user demand, and a runway of infrastructure improvements. That combination does not last.
                  It is the window we are inviting attendees to look through.
                </p>
                <button
                  onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-900 text-white font-bold text-sm px-3 pr-6 py-3 transition-colors"
                >
                  <span className="bg-gold-400 w-8 h-8 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-green-950" />
                  </span>
                  Join the Webinar — Free
                </button>
              </div>
            </AnimateIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
