import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ShieldCheck, Globe, BadgeDollarSign, FileCheck, MapPin, HeartHandshake } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Fareeda Anderson",
    role: "Founder & CEO",
    initials: "FA",
    bio: "Visionary leader behind Golden Roots Properties. Fareeda drives the mission to provide accessible, transparent, and secure land ownership for the African diaspora — eliminating the risk and opacity that has long plagued diaspora property purchases.",
    color: "bg-gold-400",
    textColor: "text-green-950",
  },
  {
    name: "Mercy Buabeng",
    role: "Director of Operations",
    initials: "MB",
    bio: "Mercy oversees all operational processes at Golden Roots, ensuring every transaction meets the highest standards of due diligence and client service. She coordinates verification, documentation, and the end-to-end purchase journey.",
    color: "bg-green-700",
    textColor: "text-white",
  },
  {
    name: "Prudence Borbin",
    role: "Head of Diaspora Relations",
    initials: "PB",
    bio: "Prudence is dedicated to building lasting relationships with diaspora clients across North America, Europe, and beyond. She is the primary point of contact for international buyers and ensures a seamless remote buying experience.",
    color: "bg-green-800",
    textColor: "text-white",
  },
];

const values = [
  { icon: ShieldCheck, title: "Trust & Transparency", desc: "We deal only in verified, litigation-free land with clear documentation at every stage. No surprises." },
  { icon: BadgeDollarSign, title: "Integrity First", desc: "No hidden fees, no inflated prices. We do what we say and treat every client like family." },
  { icon: Globe, title: "Accessibility", desc: "Land ownership made possible from anywhere in the world, with full diaspora support built in." },
  { icon: FileCheck, title: "Litigation-Free Guarantee", desc: "100% commitment — only plots with clean title records, zero disputes, and no multiple sales." },
  { icon: MapPin, title: "Ghana-Rooted", desc: "Ghanaian-owned and Ghana-based. Deep local knowledge and relationships underpin everything we do." },
  { icon: HeartHandshake, title: "Long-Term Partnership", desc: "We stay with you after the sale — fencing, ground rent, encroachment protection, and more." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-green-950 pt-52 pb-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">About Us</span>
            </div>
            <h1 className="font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              Who We Are
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              Golden Roots Properties is a Ghanaian-owned real estate company specialising in secure,
              litigation-free land investment for the African diaspora.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-6 h-px bg-gray-400" />
                  <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Our Mission</span>
                </div>
                <h2 className="font-bold text-green-950 leading-tight mb-6"
                    style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}>
                  Built to Bridge<br />the Gap
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  To bridge the gap between global ambition and local ownership — ensuring a seamless,
                  transparent, and secure path to land ownership in Ghana for the African diaspora.
                  We manage every detail, from documentation to logistics.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  For diaspora members across North America, Europe, and beyond, land ownership in Ghana
                  has historically been fraught with risk — disputes, fraudulent sellers, and opaque processes.
                  Golden Roots was built to solve that problem entirely.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every plot we sell has been pre-vetted, Lands Commission-searched, and is supported by a
                  full documentation package including a barcoded site plan and a signed Indenture.
                </p>
              </div>

              {/* Stats panel */}
              <div className="bg-green-950 p-10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                     style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
                <div className="relative grid grid-cols-2 gap-6">
                  {[
                    { value: "100%", label: "Litigation-Free Guarantee" },
                    { value: "3+", label: "Land Categories" },
                    { value: "6", label: "Verification Steps" },
                    { value: "DHL", label: "Document Delivery" },
                    { value: "5", label: "Step Buying Process" },
                    { value: "24h", label: "Response Time" },
                  ].map(s => (
                    <div key={s.label} className="border border-white/10 p-5">
                      <p className="font-extrabold text-gold-400 text-3xl mb-1">{s.value}</p>
                      <p className="text-white/40 text-xs font-bold uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="bg-green-50 py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gray-400" />
              <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Core Values</span>
            </div>
            <h2 className="font-bold text-green-950 mb-12"
                style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}>
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map((v) => (
                <div key={v.title} className="bg-white border border-gray-100 p-7 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-green-950 flex items-center justify-center mb-5">
                    <v.icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <h3 className="text-green-950 font-bold text-lg mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gray-400" />
              <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Leadership</span>
            </div>
            <h2 className="font-bold text-green-950 mb-4"
                style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}>
              Meet the Team
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mb-12">
              Based in Ghana with deep expertise in real estate, operations, and diaspora relations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.name} className="border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className={`${member.color} h-52 flex items-center justify-center relative`}>
                    <span className={`font-extrabold text-8xl ${member.textColor} opacity-20`}>{member.initials}</span>
                    <div className="absolute bottom-5 right-5 w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center">
                      <span className={`font-bold ${member.textColor} text-base`}>{member.initials}</span>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-green-950 font-bold text-xl mb-1">{member.name}</p>
                    <p className="text-gold-500 font-bold text-xs uppercase tracking-wider mb-4">{member.role}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold-400 py-16">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-green-950 font-bold text-2xl lg:text-3xl">Ready to own land in Ghana?</h2>
              <p className="text-green-800 mt-1">Start with a free consultation — our team is ready to guide you.</p>
            </div>
            <Link href="/purchase"
                  className="shrink-0 inline-flex items-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold text-sm px-3 pr-5 py-3 transition-colors">
              <span className="bg-gold-400 w-7 h-7 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-green-950" />
              </span>
              Start Buying Process
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
