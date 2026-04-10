"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let dismissed = false;

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    }

    // Safety fallback — never block the page for more than 12 seconds
    const fallback = setTimeout(dismiss, 12000);

    function waitForVideos() {
      const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("video[data-loader-wait]"));

      if (videos.length === 0) {
        dismiss();
        return;
      }

      let readyCount = 0;

      function onReady() {
        readyCount++;
        if (readyCount >= videos.length) {
          clearTimeout(fallback);
          dismiss();
        }
      }

      videos.forEach((video) => {
        if (video.readyState >= 3) {
          onReady();
        } else {
          video.addEventListener("canplay", onReady, { once: true });
          video.addEventListener("error", onReady, { once: true }); // don't block on broken video
        }
      });
    }

    // Wait for window.onload first (images, fonts, etc.), then check videos
    if (document.readyState === "complete") {
      waitForVideos();
    } else {
      window.addEventListener("load", waitForVideos, { once: true });
    }

    return () => {
      dismissed = true;
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-green-950 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Golden Roots Properties"
          width={200}
          height={75}
          className="h-20 w-auto object-contain"
          priority
        />
      </div>

      {/* Loading bar */}
      <div className="w-48 h-0.5 bg-white/10 overflow-hidden">
        <div className="h-full bg-gold-400 animate-loading-bar" />
      </div>

      <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] mt-5">
        Loading
      </p>

      <style jsx global>{`
        @keyframes loading-bar {
          0%   { width: 0%;   transform: translateX(0); }
          60%  { width: 80%;  transform: translateX(0); }
          100% { width: 100%; transform: translateX(0); }
        }
        .animate-loading-bar {
          animation: loading-bar 2.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
