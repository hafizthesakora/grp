"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, MapPin } from "lucide-react";
import Link from "next/link";

export default function MontageSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);

  // Auto-play video + pause when out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          audioRef.current?.play().catch(() => {});
        } else {
          video.pause();
          audioRef.current?.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(sectionRef.current!);
    return () => observer.disconnect();
  }, []);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black" style={{ height: "85vh", minHeight: 480 }}>

      {/* Background video */}
      <video
        ref={videoRef}
        src="/videos/ummi-saeeda.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Audio track */}
      <audio ref={audioRef} src="/audio/theme.mp3" loop preload="none" muted />

      {/* Cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Top-left badge */}
      <div className="absolute top-6 left-4 sm:left-8 flex items-center gap-2 z-10">
        <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
        <span className="text-white/70 font-bold text-xs tracking-[0.2em] uppercase">Live Footage</span>
      </div>

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-5 right-4 sm:right-8 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)" }}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted
          ? <VolumeX className="w-4 h-4 text-white/60" />
          : <Volume2 className="w-4 h-4 text-white" />
        }
      </button>

      {/* Centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="block w-8 h-px bg-[#c9a84c]/60" />
          <span className="text-[#c9a84c] font-bold text-xs tracking-[0.25em] uppercase">Golden Roots Properties</span>
          <span className="block w-8 h-px bg-[#c9a84c]/60" />
        </div>

        <h2
          className="font-extrabold text-white leading-tight mb-4"
          style={{ fontSize: "clamp(30px, 5.5vw, 72px)" }}
        >
          Ummi Saeeda Village.<br />
          <span className="text-[#c9a84c]">Our Land. Our Story.</span>
        </h2>

        <p
          className="text-white/60 leading-relaxed max-w-xl mb-8"
          style={{ fontSize: "clamp(14px, 1.4vw, 18px)" }}
        >
          Walk through the streets, see the plots, feel the community.
          Mankessim&apos;s fastest-growing estate — built for the diaspora, rooted in Ghana.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/purchase"
            className="inline-flex items-center gap-2.5 bg-[#c9a84c] hover:bg-amber-400 text-green-950 font-bold text-sm px-6 py-3 transition-all hover:shadow-lg hover:shadow-[#c9a84c]/30"
          >
            Secure Your Plot
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold text-sm px-6 py-3 transition-all"
          >
            View All Properties
          </Link>
        </div>
      </div>

      {/* Bottom-left location pill */}
      <div className="absolute bottom-6 left-4 sm:left-8 z-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white/80"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
        >
          <MapPin className="w-3 h-3 text-[#c9a84c] shrink-0" />
          Mankessim, Central Region, Ghana
        </div>
      </div>

      {/* Bottom-right brand */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-10 text-right">
        <p className="text-white/50 font-extrabold text-xs leading-none">Golden Roots</p>
        <p className="text-[#c9a84c] text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">Properties</p>
      </div>
    </section>
  );
}
