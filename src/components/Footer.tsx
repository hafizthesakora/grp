import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, FileText, BadgeCheck, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-950">
      {/* ── TRUST BAR ────────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Ghana Lands Commission", sub: "Verified plots only" },
              { icon: FileText, title: "Full Documentation", sub: "Indenture + Site Plan via DHL" },
              { icon: BadgeCheck, title: "100% Litigation-Free", sub: "Zero title disputes guaranteed" },
              { icon: Lock, title: "Data Protected", sub: "Ghana Data Protection Act 2012" },
            ].map(t => (
              <div key={t.title} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-white/5 flex items-center justify-center shrink-0 rounded-sm">
                  <t.icon className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold leading-snug">{t.title}</p>
                  <p className="text-white/35 text-xs mt-0.5">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER ──────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image src="/logo.png" alt="Golden Roots Properties" width={260} height={98} className="h-24 w-auto object-contain" />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Ghanaian-owned real estate company specialising in secure, litigation-free land in Mankessim, Central Region.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</p>
            <ul className="space-y-3">
              {[
                { label: "Browse Properties", href: "/properties" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "About Us", href: "/about" },
                { label: "FAQs", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 hover:text-gold-400 text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Land Types */}
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-wider mb-5">Land Types</p>
            <ul className="space-y-3">
              {["Residential Land", "Agro-Industrial Land", "Beach Land", "Off-Market Deals"].map(item => (
                <li key={item}>
                  <Link href="/properties" className="text-white/40 hover:text-gold-400 text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <a href="mailto:goldenrootssocial@gmail.com" className="text-white/40 hover:text-white text-sm transition-colors">goldenrootssocial@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <div className="text-white/40 text-sm">
                  <div>+1 248-210-8333</div>
                  <div>+233 54-083-9298</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm">Mankessim, Central Region, Ghana</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/20 text-xs leading-relaxed mb-6 max-w-4xl">
            <strong className="text-white/30">Disclaimer:</strong> All land listings on this site are for informational purposes only and do not constitute a binding offer for sale.
            Land values can decrease as well as increase. Golden Roots Properties does not guarantee investment returns or future market performance.
            Buyers are advised to seek independent legal counsel before entering into any land purchase agreement.
            All transactions are governed by the laws of the Republic of Ghana, including the Land Act 2020 (Act 1036).
          </p>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-white/30 text-sm">© {new Date().getFullYear()} Golden Roots Properties. All rights reserved.</p>
              <Link href="/privacy-policy" className="text-white/25 hover:text-white/60 text-xs transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-white/25 hover:text-white/60 text-xs transition-colors">Terms &amp; Conditions</Link>
              <Link href="/portal" className="text-white/20 hover:text-white/50 text-xs transition-colors">Client Portal</Link>
            </div>
            <Link
              href="/purchase"
              className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-5 py-2.5 transition-colors"
            >
              <span className="bg-white w-6 h-6 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-green-900" />
              </span>
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
