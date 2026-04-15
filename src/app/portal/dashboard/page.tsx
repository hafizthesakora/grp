"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Bell, LogOut, ChevronRight,
  Lock, CheckCircle2, Clock, MapPin, Download, MessageSquare,
  Menu, TrendingUp, Shield, Home,
} from "lucide-react";

// ── Welcome docs — always available regardless of journey stage ──────────────
const welcomeDocs = [
  { name: "Terms & Conditions", href: "/docs/terms-and-conditions.pdf" },
  { name: "All-Inclusive Land Ownership Guide", href: "/docs/land-ownership-guide.pdf" },
];

// ── Types ──────────────────────────────────────────────────────────────────
type Status = "completed" | "in_progress" | "locked";

type SessionUser = { name: string; email: string; role: string };

type Enquiry = {
  _id: string;
  plotRef: string;
  firstName: string;
  lastName: string;
  landType: string;
  plots: string;
  purpose: string;
  budget: string;
  timeline: string;
  paymentPlan: string;
  completedSteps: number[];
  currentStep: number;
  createdAt: string;
};

type Tab = "overview" | "tracker" | "documents" | "updates";

// ── Journey steps (template — admin progresses via completedSteps/currentStep) ──
const journeySteps = [
  { id: 1, title: "Enquiry & Consultation", description: "Your enquiry has been received and a consultation has been initiated with our team.", documents: ["Enquiry Confirmation"] },
  { id: 2, title: "Virtual Site Visit", description: "Live video tour of your selected plot. Boundary markers reviewed and confirmed.", documents: ["Site Tour Recording", "Plot Photos"] },
  { id: 3, title: "Verification & Documentation", description: "Lands Commission search completed. Title confirmed litigation-free with no disputes.", documents: ["Lands Commission Report", "Family Consent Letter"] },
  { id: 4, title: "Payment & Plot Allocation", description: "Payment confirmed. Your specific plot has been allocated and documented in your name.", documents: ["Payment Receipt"] },
  { id: 5, title: "Indenture Preparation", description: "Legal deed of assignment being drafted and reviewed by our legal team.", documents: ["Signed Indenture"] },
  { id: 6, title: "Site Plan & Barcode", description: "Official geometric survey and barcoded site plan being generated.", documents: ["Barcoded Site Plan"] },
  { id: 7, title: "Document Delivery", description: "Complete documentation package dispatched via DHL to your address.", documents: ["DHL Tracking"] },
  { id: 8, title: "After-Sales Support", description: "Fencing assistance, encroachment protection, and post-purchase support activated.", documents: ["Support Agreement"] },
];

const notifications = [
  { id: 1, text: "Your enquiry has been received. Our team will be in touch within 24 hours.", time: "Just now", read: false },
  { id: 2, text: "Your Welcome Package is ready — download your Terms & Conditions and Land Ownership Guide from the Documents tab.", time: "Just now", read: false },
];

const navItems: { icon: typeof LayoutDashboard; label: string; tab: Tab }[] = [
  { icon: LayoutDashboard, label: "Overview", tab: "overview" },
  { icon: Clock, label: "Purchase Tracker", tab: "tracker" },
  { icon: FileText, label: "Documents", tab: "documents" },
  { icon: Bell, label: "Updates", tab: "updates" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function getStatus(stepId: number, completedSteps: number[], currentStep: number): Status {
  if (completedSteps.includes(stepId)) return "completed";
  if (stepId === currentStep) return "in_progress";
  return "locked";
}

function allDocuments(completedSteps: number[], currentStep: number) {
  return journeySteps.flatMap(s => {
    const status = getStatus(s.id, completedSteps, currentStep);
    return s.documents.map(name => ({
      name,
      stepId: s.id,
      available: status === "completed",
    }));
  });
}

function StatusPill({ status }: { status: Status }) {
  if (status === "completed")
    return <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
  if (status === "in_progress")
    return <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" /> In Progress</span>;
  return <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full"><Lock className="w-2.5 h-2.5" /> Pending</span>;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function PortalDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [session, setSession] = useState<SessionUser | null>(null);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("grp_session");
    if (!raw) { router.replace("/portal"); return; }
    let parsed: SessionUser;
    try { parsed = JSON.parse(raw); } catch { router.replace("/portal"); return; }
    setSession(parsed);

    fetch(`/api/portal/me?email=${encodeURIComponent(parsed.email)}`)
      .then(r => r.json())
      .then(data => {
        if (data.enquiry) setEnquiry(data.enquiry);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  function handleSignOut() {
    localStorage.removeItem("grp_session");
    localStorage.removeItem("grp_welcome");
    router.push("/portal");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f6f3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-8 h-8 border-2 border-green-950/20 border-t-green-950 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const completedSteps = enquiry?.completedSteps ?? [1];
  const currentStep = enquiry?.currentStep ?? 2;
  const completedCount = completedSteps.length;
  const progress = Math.round((completedCount / journeySteps.length) * 100);
  const currentStepData = journeySteps.find(s => s.id === currentStep) ?? journeySteps[0];
  const docs = allDocuments(completedSteps, currentStep);
  const docsAvailable = docs.filter(d => d.available).length;
  const unread = notifications.filter(n => !n.read).length;
  const plotRef = enquiry?.plotRef ?? "—";
  const initials = session.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const landTypeLabel: Record<string, string> = {
    residential: "Residential Land",
    agro: "Agro-Industrial Land",
    beach: "Beach Land",
    offmarket: "Off-Market Opportunity",
  };

  return (
    <div className="min-h-screen bg-[#f4f6f3] flex font-sans">

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── SIDEBAR ── */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#0c1f0f] z-40 flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="px-6 py-6 border-b border-white/8">
          <Link href="/" className="block">
            <p className="text-white font-extrabold text-lg tracking-tight leading-none">Golden Roots</p>
            <p className="text-[#c9a84c] text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">Client Portal</p>
          </Link>
        </div>
        <div className="px-4 py-4 border-b border-white/8">
          <div className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-3">
            <div className="w-10 h-10 rounded-lg bg-[#c9a84c] flex items-center justify-center shrink-0">
              <span className="text-[#0c1f0f] font-extrabold text-sm">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate leading-tight">{session.name}</p>
              <p className="text-white/40 text-xs font-medium mt-0.5">{plotRef}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-white/25 text-[10px] font-bold uppercase tracking-[0.15em] px-3 mb-3">Navigation</p>
          {navItems.map(item => {
            const active = tab === item.tab;
            return (
              <button key={item.tab} onClick={() => { setTab(item.tab); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${active ? "bg-[#c9a84c] text-[#0c1f0f]" : "text-white/50 hover:text-white hover:bg-white/6"}`}>
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.tab === "updates" && unread > 0 && (
                  <span className={`text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${active ? "bg-[#0c1f0f] text-[#c9a84c]" : "bg-red-500 text-white"}`}>{unread}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/8 space-y-0.5">
          <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/6 text-sm font-semibold transition-all">
            <MessageSquare className="w-4 h-4 shrink-0" /> Contact Agent
          </a>
          <button onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/6 text-sm font-semibold transition-all">
            <LogOut className="w-4 h-4 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-green-950 font-bold text-base leading-tight">
                {tab === "overview" ? "Dashboard" : tab === "tracker" ? "Purchase Tracker" : tab === "documents" ? "Documents" : "Updates & Notifications"}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <button onClick={() => setTab("updates")} className="relative p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Bell className="w-5 h-5" />
            {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />}
          </button>
        </header>

        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">

          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <div className="max-w-5xl space-y-6">
              {/* Hero banner */}
              <div className="relative bg-[#0c1f0f] rounded-2xl overflow-hidden p-8">
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
                <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full bg-[#c9a84c]/10 blur-2xl" />
                <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-white/40 text-sm font-medium mb-1">Welcome back</p>
                    <h1 className="text-white font-bold text-3xl leading-tight">{session.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[#c9a84c] text-xs font-bold bg-[#c9a84c]/10 px-2.5 py-1 rounded-full">{plotRef}</span>
                      {enquiry && <><span className="text-white/30 text-xs">·</span><span className="text-white/40 text-xs">{landTypeLabel[enquiry.landType] ?? enquiry.landType}</span></>}
                    </div>
                  </div>
                  <div className="shrink-0 text-center sm:text-right">
                    <p className="text-[#c9a84c] font-extrabold text-5xl leading-none">{progress}%</p>
                    <p className="text-white/30 text-xs font-medium mt-1">Purchase Complete</p>
                    <div className="mt-3 w-48 bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #2d6a4f, #c9a84c)" }} />
                    </div>
                    <p className="text-white/30 text-[10px] mt-1.5">{completedCount} of {journeySteps.length} steps completed</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: TrendingUp, label: "Steps Completed", value: `${completedCount}/${journeySteps.length}`, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { icon: FileText, label: "Documents Ready", value: `${docsAvailable}/${docs.length}`, color: "text-[#c9a84c]", bg: "bg-amber-50" },
                  { icon: Bell, label: "New Updates", value: String(unread), color: "text-blue-600", bg: "bg-blue-50" },
                  { icon: Home, label: "Plot Size", value: "80×80", color: "text-purple-600", bg: "bg-purple-50" },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                      <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} style={{ width: 18, height: 18 }} />
                    </div>
                    <p className="text-green-950 font-extrabold text-2xl leading-none">{stat.value}</p>
                    <p className="text-gray-400 text-xs font-medium mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Two-col: current step + plot details */}
              <div className="grid lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-green-950 font-bold text-sm">Current Step</p>
                    <button onClick={() => setTab("tracker")} className="text-xs font-bold text-[#c9a84c] hover:text-amber-600 flex items-center gap-1 transition-colors">
                      View all <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-green-950 font-bold text-sm mb-1">Step {currentStep}: {currentStepData.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{currentStepData.description}</p>
                      <div className="flex items-center gap-1.5 mt-3">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-amber-700 text-xs font-bold">In Progress</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 space-y-2">
                    {journeySteps.slice(0, 5).map((s, i) => {
                      const st = getStatus(s.id, completedSteps, currentStep);
                      return (
                        <div key={s.id} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${st === "completed" ? "bg-emerald-500" : st === "in_progress" ? "bg-amber-400" : "bg-gray-100"}`}>
                            {st === "completed" ? <CheckCircle2 className="w-3 h-3 text-white" /> : st === "in_progress" ? <span className="w-2 h-2 rounded-full bg-white" /> : <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                          </div>
                          <p className={`text-xs font-semibold ${st === "locked" ? "text-gray-300" : "text-gray-600"}`}>{i + 1}. {s.title}</p>
                        </div>
                      );
                    })}
                    <button onClick={() => setTab("tracker")} className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 pl-8 pt-1 transition-colors">
                      +{journeySteps.length - 5} more steps <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="bg-white rounded-xl border border-gray-100 p-6 flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-4 h-4 text-[#c9a84c]" />
                      <p className="text-green-950 font-bold text-sm">Your Enquiry</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Reference", value: plotRef },
                        { label: "Land Type", value: enquiry ? (landTypeLabel[enquiry.landType] ?? enquiry.landType) : "—" },
                        { label: "Plots", value: enquiry?.plots ?? "—" },
                        { label: "Purpose", value: enquiry?.purpose || "—" },
                        { label: "Budget", value: enquiry?.budget || "—" },
                        { label: "Submitted", value: enquiry ? new Date(enquiry.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—" },
                      ].map(item => (
                        <div key={item.label} className="flex items-start justify-between gap-3">
                          <span className="text-gray-400 text-xs font-medium shrink-0">{item.label}</span>
                          <span className="text-green-950 text-xs font-semibold text-right leading-tight">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3 text-[#c9a84c] shrink-0" />
                      Mankessim, Central Region
                    </div>
                  </div>
                  <div className="bg-[#0c1f0f] rounded-xl p-5">
                    <p className="text-white font-bold text-sm mb-1">Need help?</p>
                    <p className="text-white/40 text-xs mb-4">Our team is ready to assist you on WhatsApp.</p>
                    <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-amber-400 text-[#0c1f0f] font-bold text-xs px-4 py-2.5 rounded-lg transition-colors w-full justify-center">
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Agent
                    </a>
                  </div>
                </div>
              </div>

              {/* Recent updates */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-green-950 font-bold text-sm">Recent Updates</p>
                  <button onClick={() => setTab("updates")} className="text-xs font-bold text-[#c9a84c] hover:text-amber-600 flex items-center gap-1 transition-colors">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="divide-y divide-gray-50">
                  {notifications.map(n => (
                    <div key={n.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 mt-2 ${!n.read ? "bg-[#c9a84c]" : "bg-gray-200"}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-relaxed ${!n.read ? "text-green-950 font-semibold" : "text-gray-500"}`}>{n.text}</p>
                        <p className="text-gray-300 text-xs mt-0.5">{n.time}</p>
                      </div>
                      {!n.read && <span className="text-[10px] font-bold text-[#c9a84c] bg-amber-50 px-2 py-0.5 rounded-full shrink-0">New</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TRACKER ── */}
          {tab === "tracker" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-green-950 font-bold text-xl">Purchase Journey</h2>
                <p className="text-gray-400 text-sm mt-1">Track every step of your land purchase in real time.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-green-950 font-bold text-sm">Overall Progress</p>
                    <p className="text-gray-400 text-xs mt-0.5">{completedCount} of {journeySteps.length} steps completed</p>
                  </div>
                  <span className="text-[#c9a84c] font-extrabold text-2xl">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #2d6a4f, #c9a84c)" }} />
                </div>
              </div>
              <div className="space-y-2">
                {journeySteps.map((s, i) => {
                  const status = getStatus(s.id, completedSteps, currentStep);
                  const locked = status === "locked";
                  const expanded = expandedStep === s.id;
                  return (
                    <div key={s.id} className={`bg-white rounded-xl border overflow-hidden transition-shadow ${status === "in_progress" ? "border-amber-200 shadow-sm shadow-amber-100" : "border-gray-100"}`}>
                      <button onClick={() => !locked && setExpandedStep(expanded ? null : s.id)} disabled={locked}
                              className="w-full flex items-center gap-4 p-5 text-left disabled:cursor-default hover:bg-gray-50/50 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${status === "completed" ? "bg-emerald-50" : status === "in_progress" ? "bg-amber-50" : "bg-gray-50"}`}>
                          {status === "completed" ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : status === "in_progress" ? <Clock className="w-5 h-5 text-amber-500" /> : <Lock className="w-4 h-4 text-gray-300" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-semibold text-sm ${locked ? "text-gray-300" : "text-green-950"}`}>Step {i + 1}: {s.title}</span>
                            <StatusPill status={status} />
                          </div>
                        </div>
                        {!locked && <ChevronRight className={`w-4 h-4 text-gray-300 shrink-0 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} />}
                      </button>
                      {expanded && !locked && (
                        <div className="px-5 pb-5 border-t border-gray-50">
                          <p className="text-gray-500 text-sm leading-relaxed mt-4">{s.description}</p>
                          {s.documents.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {s.documents.map(doc => {
                                const available = status === "completed";
                                return (
                                  <button key={doc} disabled={!available}
                                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${available ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100" : "text-gray-300 bg-gray-50 border border-gray-100 cursor-not-allowed"}`}>
                                    <Download className="w-3 h-3" /> {doc}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── DOCUMENTS ── */}
          {tab === "documents" && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-green-950 font-bold text-xl">Your Documents</h2>
                <p className="text-gray-400 text-sm mt-1">Documents unlock as each step completes. Final package delivered via DHL.</p>
              </div>

              {/* Welcome package — always available */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-[#0c1f0f] flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#c9a84c] rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#0c1f0f]" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Welcome Package</p>
                    <p className="text-white/40 text-xs">Available immediately — read before proceeding</p>
                  </div>
                </div>
                {welcomeDocs.map((doc, i) => (
                  <div key={doc.name} className={`flex items-center justify-between px-6 py-4 ${i < welcomeDocs.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-sm font-semibold text-green-950 truncate">{doc.name}</p>
                    </div>
                    <a href={doc.href} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3 py-1.5 rounded-lg transition-colors shrink-0">
                      <Download className="w-3 h-3" /> Download
                    </a>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Available", value: docsAvailable, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Pending", value: docs.length - docsAvailable, color: "text-gray-400", bg: "bg-gray-50" },
                  { label: "Total", value: docs.length, color: "text-green-950", bg: "bg-white" },
                ].map(s => (
                  <div key={s.label} className={`${s.bg} rounded-xl border border-gray-100 px-5 py-4`}>
                    <p className={`font-extrabold text-2xl ${s.color}`}>{s.value}</p>
                    <p className="text-gray-400 text-xs font-medium mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-[1fr_auto] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Document</p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Action</p>
                </div>
                {docs.map((doc, i) => (
                  <div key={doc.name} className={`grid grid-cols-[1fr_auto] gap-4 items-center px-6 py-4 ${i < docs.length - 1 ? "border-b border-gray-50" : ""} ${!doc.available ? "opacity-45" : ""}`}>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${doc.available ? "bg-emerald-50" : "bg-gray-50"}`}>
                        <FileText className={`w-4 h-4 ${doc.available ? "text-emerald-500" : "text-gray-300"}`} />
                      </div>
                      <p className={`text-sm font-semibold truncate ${doc.available ? "text-green-950" : "text-gray-300"}`}>{doc.name}</p>
                    </div>
                    <div className="flex justify-end">
                      {doc.available
                        ? <button className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 px-3 py-1.5 rounded-lg transition-colors"><Download className="w-3 h-3" /> Download</button>
                        : <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-300 px-3 py-1.5"><Lock className="w-3 h-3" /> Locked</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex items-start gap-3">
                <span className="text-amber-500 text-lg shrink-0">📦</span>
                <div>
                  <p className="text-green-950 font-bold text-sm mb-1">International Delivery</p>
                  <p className="text-gray-500 text-sm">Final documentation package (Indenture + Site Plan) will be dispatched via DHL once all steps are complete.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── UPDATES ── */}
          {tab === "updates" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-green-950 font-bold text-xl">Updates &amp; Notifications</h2>
                <p className="text-gray-400 text-sm mt-1">Real-time updates from the Golden Roots team.</p>
              </div>
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n.id} className={`bg-white rounded-xl border p-5 flex items-start gap-4 ${!n.read ? "border-amber-200" : "border-gray-100"}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!n.read ? "bg-amber-50" : "bg-gray-50"}`}>
                      <Bell className={`w-4 h-4 ${!n.read ? "text-amber-500" : "text-gray-300"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-relaxed ${!n.read ? "text-green-950 font-semibold" : "text-gray-500"}`}>{n.text}</p>
                      <p className="text-gray-300 text-xs mt-1.5">{n.time}</p>
                    </div>
                    {!n.read && <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full shrink-0">New</span>}
                  </div>
                ))}
              </div>
              <div className="bg-[#0c1f0f] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <p className="text-white font-bold mb-1">Have a question?</p>
                  <p className="text-white/40 text-sm">Reach your agent directly on WhatsApp for the fastest response.</p>
                </div>
                <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-amber-400 text-[#0c1f0f] font-bold text-sm px-5 py-2.5 rounded-lg transition-colors shrink-0">
                  <MessageSquare className="w-4 h-4" /> WhatsApp Agent
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
