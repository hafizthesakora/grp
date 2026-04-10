"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function PortalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === "demo@goldenroots.com" && password === "demo123") {
        window.location.href = "/portal/dashboard";
      } else {
        setError("Invalid credentials. Use the demo credentials below.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-green-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-900 flex-col justify-between p-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-400/10 blur-[80px]" />
        <div className="relative">
          <Link href="/">
            <p className="text-white font-extrabold text-2xl">Golden Roots</p>
            <p className="text-gold-400 text-xs font-bold tracking-widest uppercase">Properties</p>
          </Link>
        </div>
        <div className="relative">
          <p className="text-gold-400 font-bold text-sm uppercase tracking-widest mb-4">Client Portal</p>
          <h1 className="font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
            Track Your<br />Land Purchase
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Monitor every step of your journey from enquiry to full documentation delivery.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {["Real-time purchase tracker", "Document downloads", "Agent communication", "Update notifications"].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gold-400 flex items-center justify-center shrink-0">
                  <span className="text-green-950 text-xs font-bold">✓</span>
                </div>
                <span className="text-white/70 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-white/20 text-sm">© {new Date().getFullYear()} Golden Roots Properties</p>
      </div>

      {/* Right panel — login */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <p className="text-white font-extrabold text-2xl">Golden Roots</p>
            <p className="text-gold-400 text-xs font-bold tracking-widest uppercase">Properties · Client Portal</p>
          </div>

          <p className="text-white/50 text-sm font-bold uppercase tracking-wider mb-2">Sign In</p>
          <h2 className="text-white font-bold text-2xl mb-8">Welcome back</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider font-bold block mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                     className="w-full bg-white/10 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-gold-400"
                     placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider font-bold block mb-2">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                       className="w-full bg-white/10 border border-white/10 text-white placeholder-white/20 px-4 py-3 pr-10 text-sm focus:outline-none focus:border-gold-400"
                       placeholder="••••••••" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-4 py-3">{error}</div>}

            <button type="submit" disabled={loading}
                    className="inline-flex items-center justify-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold py-3.5 transition-colors disabled:opacity-60 mt-1">
              {loading
                ? <span className="w-4 h-4 border-2 border-green-950/30 border-t-green-950 rounded-full animate-spin" />
                : <><span className="bg-white w-7 h-7 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-green-900" /></span> Sign In</>
              }
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 bg-white/5 border border-white/10 p-5">
            <p className="text-white/70 font-bold text-sm mb-2">Demo Credentials</p>
            <p className="text-white/40 text-xs mb-1">Email: <span className="text-white/70">demo@goldenroots.com</span></p>
            <p className="text-white/40 text-xs mb-3">Password: <span className="text-white/70">demo123</span></p>
            <button onClick={() => { setEmail("demo@goldenroots.com"); setPassword("demo123"); }}
                    className="text-gold-400 hover:text-gold-300 text-xs font-bold underline">
              Auto-fill →
            </button>
          </div>

          <p className="text-white/30 text-xs text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/purchase" className="text-gold-400 font-semibold hover:text-gold-300">Start your purchase</Link>
          </p>
          <div className="mt-4 text-center">
            <Link href="/" className="text-white/20 hover:text-white/50 text-xs transition-colors">← Back to website</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
