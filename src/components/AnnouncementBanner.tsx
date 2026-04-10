"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Flame, ArrowRight } from "lucide-react";

// TODO: Replace hardcoded data with backend CMS/API when ready
const announcement = {
  badge: "Now Selling",
  estate: "Ummi Saeeda Village",
  detail: "Limited plots remaining — Central Region, Ghana",
  href: "/properties",
};

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative z-40 bg-green-950 border-b border-gold-400/20">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="inline-flex items-center gap-1.5 bg-gold-400 text-green-950 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider shrink-0">
            <Flame className="w-3 h-3" />
            {announcement.badge}
          </span>
          <p className="text-white text-sm font-semibold truncate">
            {announcement.estate}
          </p>
          <span className="hidden md:block text-white/40 text-xs truncate">
            — {announcement.detail}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            href={announcement.href}
            className="hidden sm:inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            View Plots
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/30 hover:text-white/70 transition-colors p-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
