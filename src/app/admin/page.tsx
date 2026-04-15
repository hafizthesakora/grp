"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Shield } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user.role !== "admin") {
          setError("Access denied. Admin credentials required.");
          setLoading(false);
          return;
        }
        localStorage.setItem("grp_admin_session", JSON.stringify(data.user));
        window.location.href = "/admin/dashboard";
      } else {
        const data = await res.json();
        setError(data.error ?? "Invalid credentials.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c1f0f] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#c9a84c] flex items-center justify-center mb-4">
            <Shield className="w-7 h-7 text-[#0c1f0f]" />
          </div>
          <p className="text-white font-extrabold text-xl tracking-tight">Golden Roots</p>
          <p className="text-[#c9a84c] text-xs font-bold tracking-[0.2em] uppercase mt-0.5">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider font-bold block mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                   className="w-full bg-white/8 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]"
                   placeholder="admin@goldenroots.com" />
          </div>
          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider font-bold block mb-2">Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                     className="w-full bg-white/8 border border-white/10 text-white placeholder-white/20 px-4 py-3 pr-10 text-sm focus:outline-none focus:border-[#c9a84c]"
                     placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-4 py-3">{error}</div>}

          <button type="submit" disabled={loading}
                  className="inline-flex items-center justify-center gap-3 bg-[#c9a84c] hover:bg-amber-400 text-[#0c1f0f] font-bold py-3.5 transition-colors disabled:opacity-60 mt-1">
            {loading
              ? <span className="w-4 h-4 border-2 border-[#0c1f0f]/30 border-t-[#0c1f0f] rounded-full animate-spin" />
              : <><span className="bg-white w-7 h-7 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-[#0c1f0f]" /></span> Sign In</>
            }
          </button>
        </form>
      </div>
    </div>
  );
}
