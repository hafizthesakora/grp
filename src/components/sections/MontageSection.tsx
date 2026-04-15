"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const clips = [
  { src: "/videos/hero.mp4", label: "Ummi Saeeda Village" },
  { src: "/videos/mankessim.mp4", label: "Mankessim, Central Region" },
];

export default function MontageSection() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [activeClip, setActiveClip] = useState(0);
  const [started, setStarted] = useState(false);
  const clipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Rotate clips every 8 s while playing
  const scheduleNext = useCallback(() => {
    if (clipTimerRef.current) clearTimeout(clipTimerRef.current);
    clipTimerRef.current = setTimeout(() => {
      setActiveClip(c => (c + 1) % clips.length);
    }, 8000);
  }, []);

  useEffect(() => {
    if (playing) scheduleNext();
    return () => { if (clipTimerRef.current) clearTimeout(clipTimerRef.current); };
  }, [playing, activeClip, scheduleNext]);

  // Play the active clip video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeClip) {
        v.currentTime = 0;
        if (playing) v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [activeClip, playing]);

  // Pause all when not playing
  useEffect(() => {
    if (!playing) {
      videoRefs.current.forEach(v => v?.pause());
      audioRef.current?.pause();
    } else {
      videoRefs.current[activeClip]?.play().catch(() => {});
      audioRef.current?.play().catch(() => {});
    }
  }, [playing, activeClip]);

  // Sync audio mute
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  // Pause when scrolled out of view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting && playing) setPlaying(false); },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [playing]);

  function handlePlay() {
    setStarted(true);
    setPlaying(p => !p);
  }

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden" style={{ height: "90vh", minHeight: 520 }}>

      {/* ── VIDEO CLIPS ── */}
      {clips.map((clip, i) => (
        <video
          key={clip.src}
          ref={el => { videoRefs.current[i] = el; }}
          src={clip.src}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: activeClip === i && playing ? 1 : 0 }}
        />
      ))}

      {/* ── AUDIO ── */}
      {/* Drop your song at public/audio/theme.mp3 */}
      <audio ref={audioRef} src="/audio/theme.mp3" loop preload="auto" />

      {/* ── OVERLAY ── */}
      <div
        className="absolute inset-0"
        style={{
          background: playing
            ? "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.50) 100%)"
            : "rgba(0,0,0,0.80)",
          transition: "background 1.2s ease",
        }}
      />

      {/* ── CENTRE CONTENT ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

        {!started ? (
          /* Pre-play state */
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="block w-8 h-px bg-[#c9a84c]/60" />
              <span className="text-[#c9a84c]/80 font-bold text-xs tracking-[0.25em] uppercase">Golden Roots Properties</span>
              <span className="block w-8 h-px bg-[#c9a84c]/60" />
            </div>
            <h2
              className="font-extrabold text-white leading-tight"
              style={{ fontSize: "clamp(34px, 5vw, 72px)" }}
            >
              Our Land.<br />
              <span className="text-[#c9a84c]">Our Story.</span>
            </h2>
            <p className="text-white/50 text-base max-w-sm leading-relaxed">
              Experience the land that generations will call home — in sound and vision.
            </p>
            <button
              onClick={handlePlay}
              className="group mt-2 w-20 h-20 rounded-full border-2 border-white/30 hover:border-[#c9a84c] flex items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <Play className="w-7 h-7 text-white fill-white translate-x-0.5 group-hover:text-[#c9a84c] group-hover:fill-[#c9a84c] transition-colors" />
            </button>
            <p className="text-white/25 text-xs tracking-widest uppercase">Tap to play</p>
          </div>
        ) : (
          /* Playing / paused state */
          <div className="flex flex-col items-center gap-4">
            {/* Clip label */}
            <span
              className="text-[#c9a84c] font-bold text-xs tracking-[0.2em] uppercase transition-opacity duration-500"
              style={{ opacity: playing ? 1 : 0 }}
            >
              {clips[activeClip].label}
            </span>

            {/* Big play/pause */}
            <button
              onClick={handlePlay}
              className="group w-16 h-16 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center transition-all"
              style={{ background: "rgba(0,0,0,0.40)", backdropFilter: "blur(10px)" }}
            >
              {playing
                ? <Pause className="w-6 h-6 text-white group-hover:text-[#c9a84c] transition-colors" />
                : <Play className="w-6 h-6 text-white fill-white translate-x-0.5 group-hover:text-[#c9a84c] group-hover:fill-[#c9a84c] transition-colors" />
              }
            </button>
          </div>
        )}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 py-6 flex items-end justify-between">

        {/* Clip dots */}
        <div className="flex items-center gap-2">
          {clips.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveClip(i); if (!playing && started) setPlaying(true); scheduleNext(); }}
              className="transition-all duration-300"
              style={{
                width: activeClip === i && playing ? 28 : 6,
                height: 6,
                borderRadius: 3,
                background: activeClip === i && playing ? "#c9a84c" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Mute toggle — only visible once started */}
          {started && (
            <button
              onClick={() => setMuted(m => !m)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ background: "rgba(0,0,0,0.30)", backdropFilter: "blur(8px)" }}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted
                ? <VolumeX className="w-4 h-4 text-white/60" />
                : <Volume2 className="w-4 h-4 text-white" />
              }
            </button>
          )}

          {/* Brand watermark */}
          <div className="text-right">
            <p className="text-white/60 font-extrabold text-sm leading-none">Golden Roots</p>
            <p className="text-[#c9a84c] text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">Properties</p>
          </div>
        </div>
      </div>
    </section>
  );
}
