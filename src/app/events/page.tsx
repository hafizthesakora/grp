"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import {
  Calendar, Clock, MapPin, Ticket, ArrowRight, CheckSquare,
  Store, Music, Users, Phone, Minus, Plus,
} from "lucide-react";

const EVENT_SLUG = "roots-festival-2026";
const EVENT_DATE = new Date("2026-08-30T11:00:00+00:00"); // Ghana runs on UTC year-round
const RSVP_PHONE = "+233 54-083-9298";
const RSVP_WHATSAPP = "233540839298";

const HIGHLIGHTS = [
  {
    icon: Store,
    title: "Meet Vendors",
    body: "Local businesses, agriculture, crafts and real estate exhibitors under one roof — with the people behind them.",
  },
  {
    icon: Music,
    title: "Share Culture",
    body: "Music, food and the traditions of the Central Region, hosted in the heart of Mankessim.",
  },
  {
    icon: Users,
    title: "Connect With Community",
    body: "Meet the Golden Roots team, fellow landowners, and neighbours building their future on the same soil.",
  },
];

const ATTENDING_OPTIONS = [
  { val: "guest", label: "Guest", sub: "Coming to attend" },
  { val: "vendor", label: "Vendor", sub: "Selling on the day" },
  { val: "exhibitor", label: "Exhibitor", sub: "Showcasing a business" },
];

type FormState = "idle" | "submitting" | "success" | "already" | "error";

export default function EventsPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [daysToGo, setDaysToGo] = useState<number | null>(null);

  // Computed after mount — a server-rendered countdown would mismatch on hydration.
  useEffect(() => {
    const ms = EVENT_DATE.getTime() - Date.now();
    setDaysToGo(Math.max(Math.ceil(ms / 86_400_000), 0));
  }, []);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    comingFrom: "", attendingAs: "", guests: 1, heardFrom: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(key: keyof typeof form, val: string | number) {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required — we confirm by WhatsApp";
    if (!form.comingFrom.trim()) e.comingFrom = "Required";
    if (!form.attendingAs) e.attendingAs = "Please select one";
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
        body: JSON.stringify({ ...form, eventSlug: EVENT_SLUG }),
      });
      if (res.status === 409) { setState("already"); return; }
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const inputBase = "w-full border px-4 py-3 text-sm text-green-950 focus:outline-none transition-colors bg-white";
  const inputStyle = (field: string) =>
    `${inputBase} ${errors[field] ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-gold-500"}`;
  const labelStyle = "text-gray-500 text-xs font-bold uppercase tracking-wider block mb-1.5";

  return (
    <>
      <Navbar />
      <main className="bg-[#fbf6e9]">

        {/* ── HERO ── */}
        <section className="bg-green-950 pt-40 pb-0 relative overflow-hidden">
          {/* Flyer-inspired corner triangles */}
          <div className="absolute top-0 left-0 w-40 h-40 opacity-90 pointer-events-none hidden lg:block"
               style={{ background: "linear-gradient(135deg,#f4c430 0%,#f4c430 50%,transparent 50%)" }} />

          <div className="relative max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — event info */}
              <div className="pb-16 lg:pb-24">
                {/* Festival lockup — on a cream plate, since the mark is drawn for light surfaces */}
                <div className="mb-8 inline-block bg-[#fbf6e9] px-8 py-6">
                  <Image
                    src="/events/roots-festival-logo.png"
                    alt="Roots Festival 2026"
                    width={1200}
                    height={491}
                    priority
                    sizes="(max-width: 1024px) 70vw, 320px"
                    className="w-56 sm:w-64 lg:w-80 h-auto"
                  />
                </div>

                <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 px-3 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-gold-400 font-bold text-xs tracking-widest uppercase">
                    Free Entry · Registration Open
                    {daysToGo !== null && daysToGo > 0 && ` · ${daysToGo} ${daysToGo === 1 ? "Day" : "Days"} To Go`}
                  </span>
                </div>

                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em] mb-3">
                  Golden Roots Properties Presents
                </p>

                <h1 className="font-bold text-white leading-[1.05] mb-4"
                    style={{ fontSize: "clamp(44px, 6vw, 84px)" }}>
                  The Roots<br />Festival
                </h1>
                <p className="text-gold-400 font-medium mb-8"
                   style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
                  Where Community Takes Root.
                </p>
                <p className="text-white/55 text-base leading-relaxed mb-10 max-w-lg">
                  A day in Mankessim for everyone with roots in this region — at home or abroad. Meet the vendors and
                  businesses growing here, share food and culture, and see for yourself the community your land sits in.
                </p>

                {/* Event meta pills */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { icon: Calendar, text: "Sunday 30 August 2026" },
                    { icon: Clock, text: "From 11:00 AM" },
                    { icon: MapPin, text: "Farra Event Center, Mankessim" },
                    { icon: Ticket, text: "Free · All are welcome" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2">
                      <Icon className="w-3.5 h-3.5 text-gold-400" />
                      <span className="text-white/70 text-sm font-semibold">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-6 py-3 transition-all hover:shadow-lg hover:shadow-gold-400/30"
                  >
                    <span className="bg-white w-8 h-8 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-4 h-4 text-green-900" />
                    </span>
                    Register — Free
                  </button>
                  <a href={`https://wa.me/${RSVP_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-bold transition-colors">
                    <Phone className="w-4 h-4 text-gold-400" />
                    Or RSVP by phone · {RSVP_PHONE}
                  </a>
                </div>
              </div>

              {/* Right — registration form (desktop: overlaps into next section).
                  The ref sits on the static wrapper, not the sticky child — scrollIntoView
                  on a stuck element resolves to its pinned position and goes nowhere. */}
              <div ref={formRef} className="scroll-mt-32">
                <div className="lg:sticky lg:top-28 pb-0 lg:-mb-16">
                <div className="bg-white shadow-2xl shadow-black/30">
                  {/* Form header */}
                  <div className="bg-[#0a2112] px-7 py-6 border-b-4 border-gold-400">
                    <p className="text-gold-400 font-bold text-xs tracking-[0.15em] uppercase mb-1">Register to Attend</p>
                    <p className="text-white font-bold text-xl leading-tight">Roots Festival · 30 August 2026</p>
                    <p className="text-white/40 text-sm mt-1">Free entry · Register your whole group</p>
                  </div>

                  <div className="px-7 py-6">
                    {state === "success" ? (
                      <div className="text-center py-6">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckSquare className="w-7 h-7 text-green-700" />
                        </div>
                        <p className="text-green-950 font-bold text-xl mb-2">You&apos;re on the list!</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          We&apos;ve saved {form.guests === 1 ? "a spot" : `${form.guests} spots`} for you.
                          A confirmation is on its way to <strong>{form.email}</strong> — just give your name at the
                          gate on the day.
                        </p>
                      </div>
                    ) : state === "already" ? (
                      <div className="text-center py-6">
                        <div className="w-14 h-14 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckSquare className="w-7 h-7 text-gold-600" />
                        </div>
                        <p className="text-green-950 font-bold text-xl mb-2">Already registered!</p>
                        <p className="text-gray-500 text-sm">
                          <strong>{form.email}</strong> is already on the list. Need to change your numbers?
                          WhatsApp us on {RSVP_PHONE}.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={submit} noValidate className="space-y-4">
                        {/* Name row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelStyle}>First Name *</label>
                            <input value={form.firstName} onChange={e => set("firstName", e.target.value)}
                                   placeholder="Kofi" className={inputStyle("firstName")} />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                          </div>
                          <div>
                            <label className={labelStyle}>Last Name *</label>
                            <input value={form.lastName} onChange={e => set("lastName", e.target.value)}
                                   placeholder="Mensah" className={inputStyle("lastName")} />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className={labelStyle}>Email Address *</label>
                          <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                                 placeholder="you@example.com" className={inputStyle("email")} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className={labelStyle}>WhatsApp / Phone *</label>
                          <input value={form.phone} onChange={e => set("phone", e.target.value)}
                                 placeholder="+233 54 000 0000" className={inputStyle("phone")} />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* Coming from */}
                        <div>
                          <label className={labelStyle}>Where are you coming from? *</label>
                          <input value={form.comingFrom} onChange={e => set("comingFrom", e.target.value)}
                                 placeholder="e.g. Mankessim, Accra, London" className={inputStyle("comingFrom")} />
                          {errors.comingFrom && <p className="text-red-500 text-xs mt-1">{errors.comingFrom}</p>}
                        </div>

                        {/* Attending as */}
                        <div>
                          <label className="text-gray-500 text-xs font-bold uppercase tracking-wider block mb-2">Attending As *</label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {ATTENDING_OPTIONS.map(opt => (
                              <button key={opt.val} type="button"
                                      onClick={() => set("attendingAs", opt.val)}
                                      className={`text-left p-3 border transition-colors ${form.attendingAs === opt.val ? "border-gold-500 bg-gold-50" : "border-gray-200 hover:border-gray-300"}`}>
                                <p className={`font-bold text-sm ${form.attendingAs === opt.val ? "text-green-950" : "text-gray-700"}`}>{opt.label}</p>
                                <p className="text-gray-400 text-[11px] leading-tight mt-0.5">{opt.sub}</p>
                              </button>
                            ))}
                          </div>
                          {errors.attendingAs && <p className="text-red-500 text-xs mt-1">{errors.attendingAs}</p>}
                        </div>

                        {/* Guests */}
                        <div>
                          <label className={labelStyle}>How many of you are coming? *</label>
                          <div className="flex items-center gap-3">
                            <button type="button" aria-label="Fewer guests"
                                    onClick={() => set("guests", Math.max(form.guests - 1, 1))}
                                    className="w-11 h-11 border border-gray-200 flex items-center justify-center text-green-950 hover:border-gold-500 transition-colors disabled:opacity-40"
                                    disabled={form.guests <= 1}>
                              <Minus className="w-4 h-4" />
                            </button>
                            <p className="flex-1 text-center text-green-950 font-bold text-lg">
                              {form.guests} <span className="text-gray-400 font-medium text-sm">{form.guests === 1 ? "person" : "people"}</span>
                            </p>
                            <button type="button" aria-label="More guests"
                                    onClick={() => set("guests", Math.min(form.guests + 1, 20))}
                                    className="w-11 h-11 border border-gray-200 flex items-center justify-center text-green-950 hover:border-gold-500 transition-colors disabled:opacity-40"
                                    disabled={form.guests >= 20}>
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-gray-400 text-xs mt-1.5">Bringing more than 20? WhatsApp us and we&apos;ll plan for your group.</p>
                        </div>

                        {/* Heard from */}
                        <div>
                          <label className={labelStyle}>How did you hear about this? <span className="normal-case font-normal text-gray-400">(optional)</span></label>
                          <input value={form.heardFrom} onChange={e => set("heardFrom", e.target.value)}
                                 placeholder="e.g. Instagram, WhatsApp, a friend…" className={inputStyle("heardFrom")} />
                        </div>

                        {state === "error" && (
                          <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
                            Something went wrong. Please try again, or RSVP on {RSVP_PHONE}.
                          </p>
                        )}

                        <button type="submit" disabled={state === "submitting"}
                                className="w-full bg-gold-400 hover:bg-gold-300 text-green-950 font-bold py-3.5 text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                          {state === "submitting" ? (
                            <><span className="w-4 h-4 border-2 border-green-900/30 border-t-green-900 rounded-full animate-spin" /> Registering…</>
                          ) : (
                            <><ArrowRight className="w-4 h-4" /> Count Me In — Free</>
                          )}
                        </button>

                        <p className="text-gray-400 text-xs text-center">
                          Free entry · No payment required · Just give your name at the gate
                        </p>
                      </form>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT'S HAPPENING ── */}
        <section className="py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <AnimateIn>
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-6 h-px bg-green-950/30" />
                <span className="text-green-950/50 font-bold text-sm tracking-widest uppercase">On the Day</span>
              </div>
              <h2 className="font-bold text-green-950 mb-4" style={{ fontSize: "clamp(26px, 3vw, 42px)" }}>
                Meet vendors · Share culture · Connect with community
              </h2>
              <p className="text-green-950/60 text-base max-w-xl mb-12 leading-relaxed">
                The Roots Festival is our open invitation to Mankessim and everyone connected to it. No ticket, no pitch —
                a day to stand on the ground, meet the people, and see what is being built here.
              </p>
            </AnimateIn>

            <div className="grid md:grid-cols-3 gap-6">
              {HIGHLIGHTS.map(({ icon: Icon, title, body }, i) => (
                <AnimateIn key={title} delay={i * 0.06}>
                  <div className="bg-white border border-green-950/10 p-8 h-full hover:shadow-xl hover:shadow-black/5 transition-shadow">
                    <div className="w-11 h-11 bg-gold-400 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-green-950" />
                    </div>
                    <h3 className="text-green-950 font-bold text-lg mb-3 leading-snug">{title}</h3>
                    <p className="text-green-950/60 text-sm leading-relaxed">{body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── FLYER + LOGISTICS ── */}
        <section className="bg-green-950 py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

              <AnimateIn>
                <div className="relative shadow-2xl shadow-black/40 max-w-md mx-auto lg:mx-0">
                  <Image
                    src="/events/roots-festival-flyer.png"
                    alt="The Roots Festival flyer — Sunday 30 August 2026, 11:00 AM, Farra Event Center, Mankessim"
                    width={1588}
                    height={2246}
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="w-full h-auto"
                  />
                </div>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="block w-6 h-px bg-white/20" />
                    <span className="text-white/40 font-bold text-sm tracking-widest uppercase">Getting There</span>
                  </div>
                  <h2 className="font-bold text-white mb-8" style={{ fontSize: "clamp(26px, 3vw, 42px)" }}>
                    Sunday, 30 August
                  </h2>

                  <div className="space-y-0 mb-10">
                    {[
                      { icon: Calendar, label: "Date", value: "Sunday, 30 August 2026" },
                      { icon: Clock, label: "Time", value: "From 11:00 AM — come any time after" },
                      { icon: MapPin, label: "Venue", value: "Farra Event Center, Mankessim, Central Region" },
                      { icon: Ticket, label: "Entry", value: "Free — registration simply helps us plan" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex gap-5 py-5 border-b border-white/10">
                        <Icon className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                          <p className="text-white font-semibold text-sm">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={scrollToForm}
                      className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-6 py-3 transition-colors"
                    >
                      <span className="bg-white w-8 h-8 flex items-center justify-center shrink-0">
                        <ArrowRight className="w-4 h-4 text-green-900" />
                      </span>
                      Register to Attend
                    </button>
                    <a href={`https://wa.me/${RSVP_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 border border-white/20 hover:border-gold-400 text-white text-sm font-bold px-5 py-3 transition-colors">
                      <Phone className="w-4 h-4 text-gold-400" />
                      RSVP · {RSVP_PHONE}
                    </a>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ── VENDORS ── */}
        <section className="py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <AnimateIn>
              <div className="bg-white border border-green-950/10 p-10 lg:p-14 max-w-4xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-6 h-px bg-green-950/30" />
                  <span className="text-green-950/50 font-bold text-sm tracking-widest uppercase">Vendors & Exhibitors</span>
                </div>
                <h2 className="font-bold text-green-950 mb-4" style={{ fontSize: "clamp(24px, 2.6vw, 36px)" }}>
                  Selling or showcasing on the day?
                </h2>
                <p className="text-green-950/60 text-base leading-relaxed mb-8 max-w-2xl">
                  Traders, farmers, artisans and businesses are welcome to set up at the festival. Register using the
                  form above and select <strong className="text-green-950">Vendor</strong> or <strong className="text-green-950">Exhibitor</strong> —
                  our team will call you to arrange your space before the day.
                </p>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-900 text-white font-bold text-sm px-3 pr-6 py-3 transition-colors"
                >
                  <span className="bg-gold-400 w-8 h-8 flex items-center justify-center shrink-0">
                    <Store className="w-4 h-4 text-green-950" />
                  </span>
                  Register as a Vendor
                </button>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ── CLOSING CTA ── */}
        <section className="bg-gold-400 py-16">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <AnimateIn>
              <div className="max-w-3xl">
                <p className="text-green-950/40 font-bold text-xs uppercase tracking-widest mb-4">30 August · Mankessim</p>
                <blockquote className="text-green-950 font-bold leading-tight mb-6"
                            style={{ fontSize: "clamp(24px, 3.5vw, 48px)" }}>
                  Reconnect.<br />Rebuild.<br />Return.
                </blockquote>
                <p className="text-green-900/70 text-base leading-relaxed mb-8 max-w-2xl">
                  Whether you are ten minutes away or a flight away, this is the day the community opens its doors.
                  Register your name — and anyone you are bringing — and we will be expecting you.
                </p>
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-900 text-white font-bold text-sm px-3 pr-6 py-3 transition-colors"
                >
                  <span className="bg-gold-400 w-8 h-8 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-green-950" />
                  </span>
                  Register — Free Entry
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
