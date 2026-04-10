"use client";

import { useEffect, useRef, useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { GraduationCap, Hospital, ShoppingBag, Car, Waves, Zap, Volume2, VolumeX } from "lucide-react";

const amenities = [
  {
    icon: Car,
    title: "Road Connectivity",
    desc: "Direct access to the Cape Coast–Accra highway. ~2 hrs to Accra, ~30 min to Cape Coast.",
  },
  {
    icon: GraduationCap,
    title: "Schools & Education",
    desc: "Home to Mankessim Senior High School and several primary institutions serving the region.",
  },
  {
    icon: Hospital,
    title: "Healthcare",
    desc: "St. Francis Xavier Hospital and local clinics provide accessible healthcare to residents.",
  },
  {
    icon: ShoppingBag,
    title: "Markets & Commerce",
    desc: "Mankessim Market is one of the largest in the Central Region — a major trading hub.",
  },
  {
    icon: Waves,
    title: "Coastal Access",
    desc: "Minutes from pristine Atlantic beaches and Ghana's growing coastal tourism belt.",
  },
  {
    icon: Zap,
    title: "Growing Infrastructure",
    desc: "Electricity, water supply, and road networks are actively expanding throughout the area.",
  },
];

const highlights = [
  { stat: "~2 hrs", label: "from Accra" },
  { stat: "~30 min", label: "to Cape Coast" },
  { stat: "Fast", label: "growing town" },
];

export default function MankessimSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [userToggled, setUserToggled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused) video.play().catch(() => {});
          if (!userToggled) { video.muted = false; setMuted(false); }
        } else {
          if (!userToggled) { video.muted = true; setMuted(true); }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [userToggled]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    setUserToggled(true);
  }

  return (
    <section className="bg-white py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

        {/* Section header */}
        <AnimateIn>
          <div className="flex items-center gap-2 mb-4">
            <span className="block w-6 h-px bg-gray-400" />
            <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">The Location</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <h2
              className="font-bold text-green-950 leading-tight max-w-xl"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              Life in Mankessim,<br />Central Region
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              One of Ghana&apos;s fastest-growing towns — strategically positioned with strong
              infrastructure, coastal access, and a thriving local economy.
            </p>
          </div>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — video */}
          <AnimateIn direction="left">
            <div className="relative">
              <div className="relative overflow-hidden bg-green-950" style={{ aspectRatio: "16/10" }}>
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  playsInline
                  muted
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/mankessim.mp4" type="video/mp4" />
                </video>

                {/* Mute / unmute button */}
                <button
                  onClick={toggleMute}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted
                    ? <VolumeX className="w-4 h-4 text-white" />
                    : <Volume2 className="w-4 h-4 text-white" />
                  }
                </button>

                {/* Floating label */}
                <div className="absolute top-4 left-4 bg-gold-400 px-3 py-1.5">
                  <p className="text-green-950 font-extrabold text-xs uppercase tracking-wider">Mankessim, Ghana</p>
                </div>
              </div>

              {/* Stats strip below video */}
              <div className="bg-green-950 flex items-center divide-x divide-white/10">
                {highlights.map((h) => (
                  <div key={h.label} className="flex-1 text-center px-4 py-4">
                    <p className="text-gold-400 font-extrabold text-xl leading-none">{h.stat}</p>
                    <p className="text-white/50 text-xs mt-1">{h.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* RIGHT — amenities grid */}
          <AnimateIn direction="right" delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gray-100">
              {amenities.map((a, i) => (
                <div
                  key={a.title}
                  className={`group p-6 border-gray-100 hover:bg-green-950 transition-colors duration-300
                    ${i % 2 === 0 ? "sm:border-r" : ""}
                    ${i < amenities.length - 2 ? "border-b" : ""}
                  `}
                >
                  <div className="w-10 h-10 bg-green-50 group-hover:bg-gold-400/20 flex items-center justify-center mb-4 transition-colors">
                    <a.icon className="w-5 h-5 text-green-700 group-hover:text-gold-400 transition-colors" />
                  </div>
                  <p className="text-green-950 group-hover:text-white font-bold text-sm mb-1.5 transition-colors">{a.title}</p>
                  <p className="text-gray-500 group-hover:text-white/55 text-sm leading-relaxed transition-colors">{a.desc}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

      </div>
    </section>
  );
}
