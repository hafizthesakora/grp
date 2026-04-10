import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import { ArrowRight, MapPin, Waves, Home, Sprout } from "lucide-react";

const highlights = [
  { icon: Home, title: "Residential Plots", desc: "80×80 ft plots in secure, planned communities — ideal for building your home." },
  { icon: Sprout, title: "Agro-Industrial Land", desc: "Minimum 5 acres for farming, agribusiness, and large-scale development." },
  { icon: Waves, title: "Beach Land", desc: "Beachfront plots with exceptional appreciation potential along the coast." },
];

export default function LocationSection() {
  return (
    <section className="bg-green-950 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <AnimateIn direction="left">
            <div className="flex items-center gap-2 mb-5">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-xs tracking-[0.2em] uppercase">Our Location</span>
            </div>
            <h2 className="font-bold text-white leading-tight mb-6"
                style={{ fontSize: "clamp(32px, 4vw, 54px)" }}>
              Mankessim,<br />Central Region
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-6">
              Mankessim is one of Ghana&apos;s fastest-growing towns — strategically located in the Central Region with excellent road access, proximity to Cape Coast, and rapid infrastructure development.
            </p>
            <p className="text-white/55 leading-relaxed mb-10">
              Whether you are part of the African diaspora returning home, relocating to Ghana for the first time, or simply investing in one of West Africa&apos;s most promising locations — Mankessim offers the ideal foundation.
            </p>

            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-gold-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-green-950" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Mankessim, Central Region</p>
                <p className="text-white/40 text-xs">~2 hours from Accra · Coastal access</p>
              </div>
            </div>

            <Link href="/properties"
                  className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-6 py-3 transition-all hover:shadow-xl hover:shadow-gold-400/30 hover:-translate-y-0.5">
              <span className="bg-white w-8 h-8 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-green-900" />
              </span>
              View Available Plots
            </Link>
          </AnimateIn>

          {/* RIGHT — plot type cards */}
          <AnimateIn direction="right" delay={0.15}>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <AnimateIn key={h.title} delay={0.1 * i} direction="up">
                  <div className="group flex items-start gap-5 bg-white/5 border border-white/10 p-6 hover:border-gold-400/30 hover:bg-white/8 transition-all duration-300">
                    <div className="w-12 h-12 bg-gold-400/20 border border-gold-400/30 group-hover:bg-gold-400 flex items-center justify-center shrink-0 transition-colors duration-300">
                      <h.icon className="w-5 h-5 text-gold-400 group-hover:text-green-950 transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">{h.title}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}

              {/* Google Maps embed */}
              <div className="border border-white/10 mt-4 overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Mankessim,+Central+Region,+Ghana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full aspect-video"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mankessim, Central Region, Ghana"
                />
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
