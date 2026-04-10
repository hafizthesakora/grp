"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── VIDEO BACKGROUND ─────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — matches Figma: lighter top-right, dark bottom-left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(210deg, rgba(0,0,0,0.30) 0%, rgba(3,55,42,0.60) 45%, rgba(3,55,42,0.96) 100%)",
        }}
      />

      {/* Fallback bg when no video */}
      <div className="absolute inset-0 bg-green-950 -z-10" />

      {/* ── MAIN CONTENT ─────────────────────────────── */}
      <div className="relative flex-1 flex flex-col justify-center max-w-[1440px] mx-auto w-full px-8 lg:px-20 pt-40 pb-8">
        <div className="max-w-[860px]">

          {/* Headline — large, bold, Figma-style */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold text-white leading-[1.0] tracking-tight mb-6"
            style={{ fontSize: "clamp(48px, 6.5vw, 90px)" }}
          >
            Own Land in Ghana.<br />
            <span className="text-gold-400">With Confidence.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/70 leading-relaxed mb-10 max-w-[540px]"
            style={{ fontSize: "clamp(16px, 1.5vw, 22px)" }}
          >
            Verified, litigation-free land for those building a life — or a legacy — in Ghana.
          </motion.p>

          {/* CTA — matches Figma button style: coloured bg, white arrow box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold px-2 pr-6 py-2 transition-all hover:shadow-2xl hover:shadow-gold-400/40 hover:-translate-y-0.5 active:translate-y-0"
              style={{ fontSize: "clamp(15px, 1.1vw, 18px)" }}
            >
              <span className="bg-white w-10 h-10 flex items-center justify-center shrink-0 rounded-sm">
                <ArrowRight className="w-5 h-5 text-green-900" />
              </span>
              View Properties
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-white font-semibold px-6 py-2 border border-white/25 hover:border-white/60 hover:bg-white/5 transition-all"
              style={{ fontSize: "clamp(15px, 1.1vw, 18px)" }}
            >
              See How It Works
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM STATS BAR — Figma glassmorphism panel ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="relative w-full"
      >
        <div
          className="mx-8 lg:mx-20 mb-10 max-w-[calc(1440px-160px)] xl:mx-auto"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

            {/* Left — video thumbnail + caption */}
            <div className="flex items-center gap-5 p-6">
              <div className="relative w-24 h-16 rounded-2xl overflow-hidden shrink-0 bg-green-900/60">
                <Image
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200&q=70"
                  alt="Land plot"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-white font-bold text-[15px] leading-snug">Our Land. Verified &amp; Ready.</p>
                <p className="text-white/45 text-sm mt-0.5">Every plot surveyed &amp; litigation-free</p>
              </div>
            </div>

            {/* Middle — buyer count + avatars */}
            <div className="flex flex-col items-center justify-center gap-3 p-6">
              {/* Stacked avatar circles */}
              <div className="flex -space-x-2.5">
                {[
                  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&q=70",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=70",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=70",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=70",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=70",
                ].map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden relative shrink-0">
                    <Image src={src} alt="Buyer" fill className="object-cover" sizes="40px" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-gold-400 flex items-center justify-center text-green-950 font-bold text-[10px] shrink-0">
                  +50
                </div>
              </div>
              <p className="text-white/60 text-sm text-center">
                <span className="text-white font-bold">Diaspora &amp; local buyers</span> securing land
              </p>
            </div>

            {/* Right — big stat */}
            <div className="flex flex-col items-center justify-center p-6">
              <p className="font-extrabold leading-none" style={{ fontSize: "clamp(52px, 5vw, 80px)" }}>
                <span className="text-white">100</span>
                <span className="text-gold-400">%</span>
              </p>
              <p className="text-white/60 text-sm text-center mt-1">Litigation-Free Guarantee</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-white/25 text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
