"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Flame, ArrowRight } from "lucide-react";

const ESTATE_BANNER = {
  badge: "Now Selling",
  estate: "Ummi Saeeda Village",
  detail: "Limited plots remaining · Central Region, Ghana",
  href: "/properties",
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");

  const isTransparent = !scrolled && !isPortal && pathname === "/";
  const showBanner = !bannerDismissed && !isPortal;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">

      {/* ── Announcement banner ── */}
      {showBanner && (
        <div className="bg-green-950 border-b border-gold-400/20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="inline-flex items-center gap-1 bg-gold-400 text-green-950 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider shrink-0">
                <Flame className="w-3 h-3" />
                <span className="hidden xs:inline">{ESTATE_BANNER.badge}</span>
              </span>
              <span className="text-white text-xs sm:text-sm font-semibold truncate">{ESTATE_BANNER.estate}</span>
              <span className="hidden md:block text-white/40 text-xs truncate">— {ESTATE_BANNER.detail}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href={ESTATE_BANNER.href}
                    className="hidden sm:inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 text-xs font-bold uppercase tracking-wider transition-colors">
                View Plots <ArrowRight className="w-3 h-3" />
              </Link>
              <button onClick={() => setBannerDismissed(true)}
                      className="text-white/30 hover:text-white/70 transition-colors p-0.5" aria-label="Dismiss">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main header ── */}
      <header className={`transition-all duration-500 ${isTransparent ? "bg-transparent" : "bg-green-950 shadow-xl shadow-black/20"}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 flex items-center justify-between h-16 sm:h-20 lg:h-[88px]">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {isTransparent ? (
              <div className="flex flex-col leading-none select-none">
                <span className="text-gold-400 font-extrabold tracking-tight text-lg sm:text-xl lg:text-[26px]">
                  GOLDEN ROOTS
                </span>
                <span className="text-white/65 font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px] lg:text-[12px]">
                  Properties
                </span>
              </div>
            ) : (
              <Image
                src="/logo.png"
                alt="Golden Roots Properties"
                width={220}
                height={83}
                className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
                priority
              />
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                className={`font-semibold text-[14px] tracking-wide transition-all relative ${
                  pathname === l.href ? "text-gold-400" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/purchase"
              className="inline-flex items-center gap-2.5 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-2.5 pr-5 py-2 transition-all hover:shadow-lg hover:shadow-gold-400/30 hover:-translate-y-0.5">
              <span className="bg-white w-7 h-7 flex items-center justify-center shrink-0 text-green-900 font-bold text-base">→</span>
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)}
                  className="lg:hidden text-white p-2 -mr-2 shrink-0"
                  aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-green-950 border-t border-white/10 px-4 sm:px-8 pb-6 pt-2">
            <nav className="space-y-0.5">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className={`flex items-center py-3.5 text-sm font-semibold border-b border-white/5 transition-colors ${
                    pathname === l.href ? "text-gold-400" : "text-white/80 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="pt-5">
              <Link href="/purchase" onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 py-3.5 bg-gold-400 text-green-950 font-bold text-sm">
                Get Started
              </Link>
              <Link href="/portal" onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 mt-2 border border-white/20 text-white/70 font-semibold text-sm">
                Client Portal
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
