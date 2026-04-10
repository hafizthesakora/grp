import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="bg-gold-400 py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateIn direction="left">
            <p className="text-green-800 font-bold text-sm tracking-widest uppercase mb-4">Take the First Step</p>
            <h2 className="font-bold text-green-950 leading-tight mb-5"
                style={{ fontSize: "clamp(32px, 4vw, 54px)" }}>
              Build Your Legacy<br />in Ghana.
            </h2>
            <p className="text-green-800 text-lg leading-relaxed">
              Whether you&apos;re relocating, investing, or planting roots — Golden Roots Properties handles every step so you can own with total confidence.
            </p>
          </AnimateIn>
          <AnimateIn direction="right" delay={0.1}>
            <div className="flex flex-col gap-4">
              <Link href="/purchase"
                    className="flex items-center gap-4 bg-green-950 hover:bg-green-800 text-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-green-950/40 group">
                <span className="w-12 h-12 bg-gold-400 group-hover:bg-gold-300 flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-5 h-5 text-green-950" />
                </span>
                <div>
                  <p className="font-bold text-base">Start Buying Process</p>
                  <p className="text-white/50 text-xs mt-0.5">4-step guided process · No commitment yet</p>
                </div>
              </Link>
              <a href="https://calendly.com/goldenrootspropertiesgh/30min" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-4 bg-white hover:bg-green-50 text-green-950 p-5 transition-all hover:-translate-y-0.5 hover:shadow-xl group">
                <span className="w-12 h-12 bg-green-950 group-hover:bg-green-800 flex items-center justify-center shrink-0 transition-colors">
                  <Phone className="w-5 h-5 text-gold-400" />
                </span>
                <div>
                  <p className="font-bold text-base">Book a Free Consultation</p>
                  <p className="text-gray-400 text-xs mt-0.5">30 minutes · No obligation</p>
                </div>
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
