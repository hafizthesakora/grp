"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, Users, MessageSquare, FileText, LogOut,
  Shield, ChevronDown, ChevronUp, X, CheckCircle2, Clock,
  Lock, Menu, RefreshCw, UserPlus, Key, Trash2, Eye, EyeOff,
  ImageIcon, ChevronLeft, ChevronRight as ChevronRightIcon,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = "overview" | "enquiries" | "contacts" | "clients";

type Enquiry = {
  _id: string; plotRef: string; firstName: string; lastName: string;
  email: string; phone: string; country: string; landType: string;
  plots: string; purpose: string; budget: string; timeline: string;
  paymentPlan: string; additionalInfo: string;
  imageUrls: string[];
  completedSteps: number[]; currentStep: number;
  hasPortalAccount: boolean; createdAt: string;
};

type Contact = {
  _id: string; firstName: string; lastName: string; email: string;
  phone: string; landInterest: string; message: string; createdAt: string;
};

type Client = {
  _id: string; name: string; email: string; role: string; createdAt: string;
  enquiry: Enquiry | null;
};

const landTypeLabel: Record<string, string> = {
  residential: "Residential", agro: "Agro-Industrial", beach: "Beach", offmarket: "Off-Market",
};

const journeySteps = [
  "Enquiry & Consultation", "Virtual Site Visit", "Verification & Documentation",
  "Payment & Plot Allocation", "Indenture Preparation", "Site Plan & Barcode",
  "Document Delivery", "After-Sales Support",
];

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function StepBadge({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step - 1) / total) * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-700 to-[#c9a84c] rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 font-medium">{step - 1}/{total}</span>
    </div>
  );
}

// ── Journey update modal ────────────────────────────────────────────────────
function JourneyModal({ enquiry, onClose, onSave }: { enquiry: Enquiry; onClose: () => void; onSave: () => void }) {
  const [completed, setCompleted] = useState<number[]>(enquiry.completedSteps);
  const [current, setCurrent] = useState(enquiry.currentStep);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function toggle(id: number) {
    setCompleted(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id].sort((a, b) => a - b));
  }

  async function save() {
    setSaving(true); setError("");
    const res = await fetch(`/api/admin/clients/${enquiry._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completedSteps: completed, currentStep: current }),
    });
    if (res.ok) { onSave(); onClose(); }
    else { const d = await res.json(); setError(d.error ?? "Save failed."); setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="bg-[#0c1f0f] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white font-bold">{enquiry.firstName} {enquiry.lastName}</p>
            <p className="text-white/40 text-xs mt-0.5">{enquiry.plotRef} · Update Journey</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {journeySteps.map((title, i) => {
            const id = i + 1;
            const isCompleted = completed.includes(id);
            const isCurrent = current === id;
            return (
              <div key={id} className={`flex items-center gap-4 p-3 rounded-xl border transition-colors ${isCompleted ? "border-emerald-200 bg-emerald-50" : isCurrent ? "border-amber-200 bg-amber-50" : "border-gray-100 bg-gray-50"}`}>
                <button onClick={() => toggle(id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${isCompleted ? "bg-emerald-500" : "border-2 border-gray-300 bg-white"}`}>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${isCompleted ? "text-emerald-800" : "text-gray-700"}`}>
                    Step {id}: {title}
                  </p>
                </div>
                <button
                  onClick={() => setCurrent(id)}
                  className={`text-xs font-bold px-3 py-1 rounded-full border transition-colors shrink-0 ${isCurrent ? "bg-amber-400 border-amber-400 text-[#0c1f0f]" : "border-gray-200 text-gray-400 hover:border-amber-300 hover:text-amber-700"}`}
                >
                  {isCurrent ? "Current" : "Set current"}
                </button>
              </div>
            );
          })}
        </div>
        {error && <p className="px-6 text-red-600 text-sm">{error}</p>}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm">Cancel</button>
          <button onClick={save} disabled={saving}
                  className="flex-1 bg-[#0c1f0f] hover:bg-green-900 text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-60">
            {saving ? "Saving…" : "Save Journey"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Create account modal ────────────────────────────────────────────────────
function CreateAccountModal({ enquiry, onClose, onSave }: { enquiry: Enquiry; onClose: () => void; onSave: () => void }) {
  const [name, setName] = useState(`${enquiry.firstName} ${enquiry.lastName}`);
  const [email, setEmail] = useState(enquiry.email);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!password || password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setSaving(true); setError("");
    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) { onSave(); onClose(); }
    else { const d = await res.json(); setError(d.error ?? "Failed."); setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-[#0c1f0f] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white font-bold">Create Portal Account</p>
            <p className="text-white/40 text-xs mt-0.5">{enquiry.plotRef}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-1.5">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)}
                   className="w-full border border-gray-200 px-4 py-2.5 text-sm text-green-950 focus:outline-none focus:border-[#c9a84c] rounded-lg" />
          </div>
          <div>
            <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-1.5">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)}
                   className="w-full border border-gray-200 px-4 py-2.5 text-sm text-green-950 focus:outline-none focus:border-[#c9a84c] rounded-lg" />
          </div>
          <div>
            <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-1.5">Set Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                     placeholder="Min. 6 characters"
                     className="w-full border border-gray-200 px-4 py-2.5 pr-10 text-sm text-green-950 focus:outline-none focus:border-[#c9a84c] rounded-lg" />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-1.5">Share this password with the client via WhatsApp or email.</p>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm">Cancel</button>
          <button onClick={save} disabled={saving}
                  className="flex-1 bg-[#c9a84c] hover:bg-amber-400 text-[#0c1f0f] font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-60">
            {saving ? "Creating…" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Reset password modal ─────────────────────────────────────────────────────
function ResetPasswordModal({ client, onClose, onSave }: { client: Client; onClose: () => void; onSave: () => void }) {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    if (!password || password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setSaving(true); setError("");
    const res = await fetch(`/api/admin/clients/${client._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { onSave(); onClose(); }
    else { const d = await res.json(); setError(d.error ?? "Failed."); setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className="bg-[#0c1f0f] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white font-bold">Reset Password</p>
            <p className="text-white/40 text-xs mt-0.5">{client.name}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-1.5">New Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                     placeholder="Min. 6 characters"
                     className="w-full border border-gray-200 px-4 py-2.5 pr-10 text-sm text-green-950 focus:outline-none focus:border-[#c9a84c] rounded-lg" />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm">Cancel</button>
          <button onClick={save} disabled={saving}
                  className="flex-1 bg-[#0c1f0f] text-white font-bold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-60">
            {saving ? "Saving…" : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Image lightbox ───────────────────────────────────────────────────────────
function ImageLightbox({ urls, startIndex, onClose }: { urls: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx(i => (i - 1 + urls.length) % urls.length);
  const next = () => setIdx(i => (i + 1) % urls.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.9)" }}
         onClick={onClose}>
      <button onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 p-3 text-white/60 hover:text-white transition-colors z-10 disabled:opacity-20"
              disabled={urls.length <= 1}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div className="relative max-w-3xl w-full mx-16" onClick={e => e.stopPropagation()}>
        <div className="relative aspect-video w-full bg-black/50 rounded-xl overflow-hidden">
          <Image src={urls[idx]} alt={`Document ${idx + 1}`} fill className="object-contain" />
        </div>
        <p className="text-white/40 text-xs text-center mt-3">{idx + 1} / {urls.length}</p>
      </div>
      <button onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 p-3 text-white/60 hover:text-white transition-colors z-10 disabled:opacity-20"
              disabled={urls.length <= 1}>
        <ChevronRightIcon className="w-6 h-6" />
      </button>
      <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors z-10">
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}

// ── Main dashboard ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [journeyTarget, setJourneyTarget] = useState<Enquiry | null>(null);
  const [createTarget, setCreateTarget] = useState<Enquiry | null>(null);
  const [resetTarget, setResetTarget] = useState<Client | null>(null);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ urls: string[]; index: number } | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [eq, co, cl] = await Promise.all([
      fetch("/api/admin/enquiries").then(r => r.json()),
      fetch("/api/admin/contacts").then(r => r.json()),
      fetch("/api/admin/clients").then(r => r.json()),
    ]);
    setEnquiries(Array.isArray(eq) ? eq : []);
    setContacts(Array.isArray(co) ? co : []);
    setClients(Array.isArray(cl) ? cl : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem("grp_admin_session");
    if (!raw) { router.replace("/admin"); return; }
    try {
      const s = JSON.parse(raw);
      if (s.role !== "admin") { router.replace("/admin"); return; }
      setAdminName(s.name);
    } catch { router.replace("/admin"); return; }
    fetchAll();
  }, [router, fetchAll]);

  function signOut() {
    localStorage.removeItem("grp_admin_session");
    router.push("/admin");
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", tab: "overview" as Tab },
    { icon: FileText, label: "Enquiries", tab: "enquiries" as Tab, count: enquiries.length },
    { icon: MessageSquare, label: "Contacts", tab: "contacts" as Tab, count: contacts.length },
    { icon: Users, label: "Portal Clients", tab: "clients" as Tab, count: clients.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {journeyTarget && <JourneyModal enquiry={journeyTarget} onClose={() => setJourneyTarget(null)} onSave={fetchAll} />}
      {createTarget && <CreateAccountModal enquiry={createTarget} onClose={() => setCreateTarget(null)} onSave={fetchAll} />}
      {resetTarget && <ResetPasswordModal client={resetTarget} onClose={() => setResetTarget(null)} onSave={fetchAll} />}
      {lightbox && <ImageLightbox urls={lightbox.urls} startIndex={lightbox.index} onClose={() => setLightbox(null)} />}

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-[#0c1f0f] z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="px-5 py-6 border-b border-white/8 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c9a84c] flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-[#0c1f0f]" />
          </div>
          <div>
            <p className="text-white font-extrabold text-sm leading-none">Golden Roots</p>
            <p className="text-[#c9a84c] text-[10px] font-bold tracking-[0.18em] uppercase mt-0.5">Admin Panel</p>
          </div>
        </div>
        <div className="px-4 py-3 border-b border-white/8">
          <div className="bg-white/5 rounded-lg px-3 py-2.5">
            <p className="text-white text-xs font-semibold truncate">{adminName}</p>
            <p className="text-white/30 text-[10px] mt-0.5">Administrator</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(item => {
            const active = tab === item.tab;
            return (
              <button key={item.tab} onClick={() => { setTab(item.tab); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${active ? "bg-[#c9a84c] text-[#0c1f0f]" : "text-white/50 hover:text-white hover:bg-white/6"}`}>
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {"count" in item && item.count !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-[#0c1f0f] text-[#c9a84c]" : "bg-white/10 text-white/50"}`}>{item.count}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/8">
          <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/6 text-sm font-semibold transition-all">
            <LogOut className="w-4 h-4 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-green-950 font-bold text-base leading-tight capitalize">
                {tab === "overview" ? "Dashboard Overview" : tab === "enquiries" ? "Purchase Enquiries" : tab === "contacts" ? "Contact Messages" : "Portal Clients"}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <button onClick={fetchAll} className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
        </header>

        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="w-8 h-8 border-2 border-green-950/20 border-t-green-950 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* ── OVERVIEW ── */}
              {tab === "overview" && (
                <div className="max-w-5xl space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Enquiries", value: enquiries.length, color: "text-green-950", bg: "bg-white", icon: FileText },
                      { label: "Contact Messages", value: contacts.length, color: "text-blue-600", bg: "bg-white", icon: MessageSquare },
                      { label: "Portal Clients", value: clients.length, color: "text-[#c9a84c]", bg: "bg-white", icon: Users },
                      { label: "Pending Accounts", value: enquiries.filter(e => !e.hasPortalAccount).length, color: "text-red-500", bg: "bg-white", icon: UserPlus },
                    ].map(s => (
                      <div key={s.label} className={`${s.bg} rounded-xl border border-gray-100 p-5`}>
                        <div className="flex items-center justify-between mb-3">
                          <s.icon className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className={`font-extrabold text-3xl ${s.color}`}>{s.value}</p>
                        <p className="text-gray-400 text-xs font-medium mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent enquiries */}
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                      <p className="text-green-950 font-bold text-sm">Recent Enquiries</p>
                      <button onClick={() => setTab("enquiries")} className="text-xs text-[#c9a84c] font-bold hover:text-amber-600">View all →</button>
                    </div>
                    {enquiries.slice(0, 5).map((e, i) => (
                      <div key={e._id} className={`flex items-center gap-4 px-6 py-4 ${i < Math.min(enquiries.length, 5) - 1 ? "border-b border-gray-50" : ""}`}>
                        <div className="w-9 h-9 bg-[#0c1f0f] rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-[#c9a84c] font-bold text-xs">{e.firstName[0]}{e.lastName[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-green-950 font-semibold text-sm truncate">{e.firstName} {e.lastName}</p>
                          <p className="text-gray-400 text-xs">{e.plotRef} · {landTypeLabel[e.landType] ?? e.landType}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-gray-400 text-xs">{fmt(e.createdAt)}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.hasPortalAccount ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                            {e.hasPortalAccount ? "Portal active" : "No account"}
                          </span>
                        </div>
                      </div>
                    ))}
                    {enquiries.length === 0 && <p className="px-6 py-8 text-gray-400 text-sm text-center">No enquiries yet.</p>}
                  </div>

                  {/* Recent contacts */}
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                      <p className="text-green-950 font-bold text-sm">Recent Contact Messages</p>
                      <button onClick={() => setTab("contacts")} className="text-xs text-[#c9a84c] font-bold hover:text-amber-600">View all →</button>
                    </div>
                    {contacts.slice(0, 3).map((c, i) => (
                      <div key={c._id} className={`px-6 py-4 ${i < Math.min(contacts.length, 3) - 1 ? "border-b border-gray-50" : ""}`}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-green-950 font-semibold text-sm">{c.firstName} {c.lastName}</p>
                          <p className="text-gray-400 text-xs">{fmt(c.createdAt)}</p>
                        </div>
                        <p className="text-gray-500 text-sm line-clamp-1">{c.message}</p>
                      </div>
                    ))}
                    {contacts.length === 0 && <p className="px-6 py-8 text-gray-400 text-sm text-center">No contact messages yet.</p>}
                  </div>
                </div>
              )}

              {/* ── ENQUIRIES ── */}
              {tab === "enquiries" && (
                <div className="max-w-6xl space-y-4">
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-4">
                      {["Client", "Contact", "Land Type", "Budget", "Date", "Actions"].map(h => (
                        <p key={h} className="text-gray-400 text-xs font-bold uppercase tracking-wider">{h}</p>
                      ))}
                    </div>
                    {enquiries.length === 0 && <p className="px-6 py-12 text-gray-400 text-sm text-center">No enquiries yet.</p>}
                    {enquiries.map((e, i) => (
                      <div key={e._id} className={`${i < enquiries.length - 1 ? "border-b border-gray-50" : ""}`}>
                        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 hover:bg-gray-50/50 transition-colors">
                          <div className="min-w-0">
                            <p className="text-green-950 font-semibold text-sm truncate">{e.firstName} {e.lastName}</p>
                            <p className="text-gray-400 text-xs font-mono">{e.plotRef}</p>
                          </div>
                          <div className="min-w-0">
                            <p className="text-gray-600 text-xs truncate">{e.email}</p>
                            <p className="text-gray-400 text-xs">{e.phone}</p>
                          </div>
                          <p className="text-gray-600 text-xs">{landTypeLabel[e.landType] ?? e.landType}</p>
                          <p className="text-gray-600 text-xs">{e.budget || "—"}</p>
                          <p className="text-gray-400 text-xs">{fmt(e.createdAt)}</p>
                          <div className="flex items-center gap-2 shrink-0">
                            {!e.hasPortalAccount ? (
                              <button onClick={() => setCreateTarget(e)}
                                      className="inline-flex items-center gap-1 text-xs font-bold text-[#c9a84c] bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-lg transition-colors">
                                <UserPlus className="w-3 h-3" /> Create Account
                              </button>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">Portal Active</span>
                            )}
                            <button onClick={() => setJourneyTarget(e)}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-green-950 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors">
                              <Clock className="w-3 h-3" /> Journey
                            </button>
                          </div>
                        </div>
                        {/* Image thumbnails row */}
                        {Array.isArray(e.imageUrls) && e.imageUrls.length > 0 && (
                          <div className="px-6 pb-4 flex items-center gap-2">
                            <ImageIcon className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                            <div className="flex gap-1.5 flex-wrap">
                              {e.imageUrls.map((url, j) => (
                                <button key={j} onClick={() => setLightbox({ urls: e.imageUrls, index: j })}
                                        className="relative w-9 h-9 rounded overflow-hidden border border-gray-200 hover:border-[#c9a84c] transition-colors shrink-0">
                                  <Image src={url} alt={`Doc ${j + 1}`} fill className="object-cover" />
                                </button>
                              ))}
                              <span className="text-gray-300 text-[10px] self-center ml-1">{e.imageUrls.length} doc{e.imageUrls.length !== 1 ? "s" : ""}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── CONTACTS ── */}
              {tab === "contacts" && (
                <div className="max-w-4xl space-y-3">
                  {contacts.length === 0 && (
                    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                      <p className="text-gray-400 text-sm">No contact messages yet.</p>
                    </div>
                  )}
                  {contacts.map(c => (
                    <div key={c._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                      <button onClick={() => setExpandedContact(expandedContact === c._id ? null : c._id)}
                              className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50/50 transition-colors">
                        <div className="w-9 h-9 bg-[#0c1f0f] rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-[#c9a84c] font-bold text-xs">{c.firstName[0]}{c.lastName[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-green-950 font-semibold text-sm">{c.firstName} {c.lastName}</p>
                          <p className="text-gray-400 text-xs">{c.email} {c.phone ? `· ${c.phone}` : ""} {c.landInterest ? `· ${c.landInterest}` : ""}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <p className="text-gray-400 text-xs">{fmt(c.createdAt)}</p>
                          {expandedContact === c._id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </div>
                      </button>
                      {expandedContact === c._id && (
                        <div className="px-6 pb-5 border-t border-gray-50">
                          <p className="text-gray-600 text-sm leading-relaxed mt-4 whitespace-pre-wrap">{c.message}</p>
                          <div className="mt-4 flex gap-2">
                            <a href={`mailto:${c.email}`} className="text-xs font-bold text-[#0c1f0f] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                              Reply via Email
                            </a>
                            {c.phone && (
                              <a href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                                 className="text-xs font-bold text-[#c9a84c] bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-lg transition-colors">
                                WhatsApp
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ── CLIENTS ── */}
              {tab === "clients" && (
                <div className="max-w-5xl space-y-4">
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 grid grid-cols-[2fr_2fr_2fr_1fr_auto] gap-4">
                      {["Client", "Email", "Journey", "Since", "Actions"].map(h => (
                        <p key={h} className="text-gray-400 text-xs font-bold uppercase tracking-wider">{h}</p>
                      ))}
                    </div>
                    {clients.length === 0 && <p className="px-6 py-12 text-gray-400 text-sm text-center">No portal clients yet. Create an account from the Enquiries tab.</p>}
                    {clients.map((c, i) => (
                      <div key={c._id} className={`grid grid-cols-[2fr_2fr_2fr_1fr_auto] gap-4 items-center px-6 py-4 ${i < clients.length - 1 ? "border-b border-gray-50" : ""} hover:bg-gray-50/50 transition-colors`}>
                        <div className="min-w-0">
                          <p className="text-green-950 font-semibold text-sm truncate">{c.name}</p>
                          {c.enquiry && <p className="text-gray-400 text-xs font-mono">{c.enquiry.plotRef}</p>}
                        </div>
                        <p className="text-gray-500 text-xs truncate">{c.email}</p>
                        <div>
                          {c.enquiry
                            ? <StepBadge step={c.enquiry.currentStep} total={journeySteps.length} />
                            : <span className="text-gray-300 text-xs">No enquiry linked</span>
                          }
                        </div>
                        <p className="text-gray-400 text-xs">{fmt(c.createdAt)}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          {c.enquiry && (
                            <button onClick={() => setJourneyTarget(c.enquiry!)}
                                    title="Update journey"
                                    className="p-1.5 text-gray-400 hover:text-green-950 hover:bg-gray-100 rounded-lg transition-colors">
                              <Clock className="w-4 h-4" />
                            </button>
                          )}
                          <button onClick={() => setResetTarget(c)}
                                  title="Reset password"
                                  className="p-1.5 text-gray-400 hover:text-[#c9a84c] hover:bg-amber-50 rounded-lg transition-colors">
                            <Key className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm(`Remove portal access for ${c.name}?`)) return;
                              await fetch(`/api/admin/clients/${c._id}`, { method: "DELETE" });
                              fetchAll();
                            }}
                            title="Remove account"
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
