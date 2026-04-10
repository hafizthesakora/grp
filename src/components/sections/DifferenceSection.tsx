import AnimateIn from "@/components/AnimateIn";
import { ShieldCheck, FileText, Globe2, BadgeCheck, MapPin, HeartHandshake } from "lucide-react";

const pillars = [
  { icon: ShieldCheck, title: "100% Litigation-Free", desc: "Every plot undergoes a full Lands Commission search. Zero disputes, zero stress." },
  { icon: FileText, title: "Full Documentation", desc: "Signed Indenture, barcoded site plan, receipts — delivered via DHL worldwide." },
  { icon: Globe2, title: "Buy From Anywhere", desc: "Remote-friendly process. Virtual site tours, online payments, digital updates." },
  { icon: BadgeCheck, title: "No Hidden Fees", desc: "Transparent pricing. You know the full cost before you commit to anything." },
  { icon: MapPin, title: "Local Expertise", desc: "Ghanaian-owned and Ghana-based. Deep roots in Mankessim, Central Region." },
  { icon: HeartHandshake, title: "After-Sales Support", desc: "Fencing, encroachment protection, ground rent — we stay with you long-term." },
];

export default function DifferenceSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

        {/* ── HEADER ─────────────── */}
        <AnimateIn>
          <div className="flex items-center gap-2 mb-4">
            <span className="block w-6 h-px bg-gray-300" />
            <span className="text-gray-400 font-bold text-xs tracking-[0.2em] uppercase">Why Golden Roots</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <h2 className="font-bold text-green-950 leading-tight"
                style={{ fontSize: "clamp(32px, 4vw, 54px)" }}>
              The Golden Roots<br />Difference
            </h2>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed">
              Land fraud and title disputes have made diaspora property purchases in Ghana unnecessarily difficult. We built the system to fix that.
            </p>
          </div>
        </AnimateIn>

        {/* ── TWO COLUMN LAYOUT ─── */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">

          {/* LEFT — dark panel with floating stat */}
          <AnimateIn direction="left" className="relative">
            <div className="bg-green-950 h-full min-h-[500px] p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between">
              {/* dot grid bg */}
              <div className="absolute inset-0 opacity-[0.08]"
                   style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
              {/* Gold glow */}
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-gold-400/10 blur-3xl" />

              {/* Floating gold stat — same Figma "20+" pattern */}
              <div className="relative self-start bg-gold-400 px-8 py-6 mb-10">
                <p className="font-extrabold text-green-950 leading-none" style={{ fontSize: "clamp(56px, 7vw, 88px)" }}>
                  6
                </p>
                <p className="text-green-800 font-bold text-sm uppercase tracking-widest mt-1">
                  Verification<br />Checkpoints
                </p>
              </div>

              {/* List */}
              <div className="relative space-y-4">
                {[
                  "Lands Commission Search",
                  "Family & Stool Consent Verification",
                  "Physical Boundary Check",
                  "Gazetted Site Plan",
                  "Indenture Preparation",
                  "Barcode Registration",
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-4">
                    <span className="w-6 h-6 bg-gold-400 flex items-center justify-center shrink-0 text-green-950 font-extrabold text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/70 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* RIGHT — pillars grid */}
          <AnimateIn direction="right" delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {pillars.map((p, i) => (
              <AnimateIn key={p.title} delay={0.05 * i} direction="up">
                <div className="group border border-gray-100 p-6 hover:border-gold-300 hover:shadow-lg hover:shadow-gold-100/50 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-10 h-10 bg-green-950 group-hover:bg-gold-400 flex items-center justify-center mb-4 transition-colors duration-300">
                    <p.icon className="w-5 h-5 text-gold-400 group-hover:text-green-950 transition-colors duration-300" />
                  </div>
                  <h3 className="text-green-950 font-bold text-sm mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
