"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, FileText, Bell, LogOut, ChevronRight,
  Lock, CheckCircle2, Clock, MapPin, Download, MessageSquare, Menu, ArrowRight,
} from "lucide-react";

const demoUser = {
  name: "Samuel Owusu",
  email: "demo@goldenroots.com",
  plotId: "GRP-2024-0083",
  landType: "Residential Land",
  location: "Central Region, Ghana",
  plotSize: "80×80 ft",
  agent: "Mercy Buabeng",
};

type Status = "completed" | "in_progress" | "locked";
type Step = { id: number; title: string; description: string; status: Status; date?: string; note?: string; documents?: string[] };

const steps: Step[] = [
  { id: 1, title: "Enquiry & Consultation", description: "Initial consultation call completed. Land type, budget, and goals discussed with our team.", status: "completed", date: "March 5, 2024", note: "You expressed interest in a residential plot for a future family home.", documents: ["Consultation Notes"] },
  { id: 2, title: "Virtual Site Visit", description: "Live video tour of the plot conducted. Boundary markers reviewed and confirmed.", status: "completed", date: "March 8, 2024", note: "Tour conducted via WhatsApp video call. Plot GRP-0083 selected.", documents: ["Site Tour Recording", "Plot Photos"] },
  { id: 3, title: "Verification & Documentation", description: "All documentation reviewed. Lands Commission search confirmed. No disputes found.", status: "completed", date: "March 11, 2024", note: "Lands Commission search report provided. Title is clean with no encumbrances.", documents: ["Lands Commission Report", "Family Consent Letter"] },
  { id: 4, title: "Payment & Plot Allocation", description: "Payment confirmed. Your specific plot has been allocated and documented in your name.", status: "in_progress", date: "In progress — March 2024", note: "Payment received. Indenture is currently being prepared.", documents: ["Payment Receipt"] },
  { id: 5, title: "Indenture Preparation", description: "Legal deed of assignment being drafted and reviewed by our legal team.", status: "locked" },
  { id: 6, title: "Site Plan & Barcode", description: "Official geometric survey and barcoded site plan being generated.", status: "locked" },
  { id: 7, title: "Document Delivery", description: "Complete documentation package dispatched via DHL to your address.", status: "locked" },
  { id: 8, title: "After-Sales Support", description: "Fencing assistance, encroachment protection, and post-purchase support activated.", status: "locked" },
];

const notifications = [
  { id: 1, text: "Payment confirmed. Indenture preparation has begun.", time: "2 days ago", read: false },
  { id: 2, text: "Lands Commission search completed — your plot is litigation-free.", time: "5 days ago", read: true },
  { id: 3, text: "Site visit completed. Plot GRP-0083 has been reserved for you.", time: "1 week ago", read: true },
];

const documents = [
  { name: "Consultation Notes", status: "available", date: "Mar 5" },
  { name: "Site Tour Recording", status: "available", date: "Mar 8" },
  { name: "Plot Photos", status: "available", date: "Mar 8" },
  { name: "Lands Commission Report", status: "available", date: "Mar 11" },
  { name: "Family Consent Letter", status: "available", date: "Mar 11" },
  { name: "Payment Receipt", status: "available", date: "Mar 12" },
  { name: "Signed Indenture", status: "pending", date: "—" },
  { name: "Barcoded Site Plan", status: "pending", date: "—" },
  { name: "Allocation Notes", status: "pending", date: "—" },
];

type Tab = "overview" | "tracker" | "documents" | "updates";

function StatusBadge({ status }: { status: Status }) {
  if (status === "completed") return <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
  if (status === "in_progress") return <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-600 bg-gold-100 px-2.5 py-1"><Clock className="w-3 h-3" /> In Progress</span>;
  return <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1"><Lock className="w-3 h-3" /> Locked</span>;
}

export default function PortalDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(4);

  const completed = steps.filter(s => s.status === "completed").length;
  const progress = Math.round((completed / steps.length) * 100);
  const unread = notifications.filter(n => !n.read).length;

  const navItems: { icon: typeof LayoutDashboard; label: string; tab: Tab }[] = [
    { icon: LayoutDashboard, label: "Overview", tab: "overview" },
    { icon: Clock, label: "Purchase Tracker", tab: "tracker" },
    { icon: FileText, label: "Documents", tab: "documents" },
    { icon: Bell, label: "Updates", tab: "updates" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-60 bg-green-950 z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="p-5 border-b border-white/10">
          <Link href="/">
            <p className="text-white font-extrabold text-lg">Golden Roots</p>
            <p className="text-gold-400 text-[10px] font-bold tracking-widest uppercase">Client Portal</p>
          </Link>
        </div>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold-400 flex items-center justify-center shrink-0">
              <span className="text-green-950 font-bold text-sm">SO</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{demoUser.name}</p>
              <p className="text-white/40 text-xs truncate">{demoUser.plotId}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3">
          <p className="text-white/30 text-xs font-bold uppercase tracking-wider mb-2 px-3">Menu</p>
          {navItems.map(item => (
            <button key={item.tab} onClick={() => { setTab(item.tab); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-colors mb-0.5 ${
                      tab === item.tab ? "bg-gold-400 text-green-950" : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}>
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.tab === "updates" && unread > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{unread}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-sm font-semibold transition-colors">
            <MessageSquare className="w-4 h-4" /> Contact Agent
          </a>
          <Link href="/portal" className="flex items-center gap-2 px-3 py-2 text-white/30 hover:text-white text-sm font-semibold transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-800">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <p className="text-green-950 font-bold capitalize">
                {tab === "overview" ? "Dashboard" : tab === "tracker" ? "Purchase Tracker" : tab === "documents" ? "Documents" : "Updates"}
              </p>
              <p className="text-gray-400 text-xs">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <button onClick={() => setTab("updates")} className="relative p-2 text-gray-400 hover:text-gray-700">
            <Bell className="w-5 h-5" />
            {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
          </button>
        </header>

        <div className="flex-1 p-6">
          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="max-w-4xl space-y-5">
              {/* Welcome banner */}
              <div className="bg-green-950 p-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-white/40 text-sm mb-1">Welcome back,</p>
                  <h2 className="text-white font-bold text-2xl">{demoUser.name}</h2>
                  <p className="text-white/40 text-sm mt-1">{demoUser.plotId} · {demoUser.landType}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-gold-400 font-extrabold text-4xl">{progress}%</p>
                  <p className="text-white/40 text-xs">Purchase Complete</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="bg-white border border-gray-100 p-6">
                <div className="flex justify-between mb-3">
                  <span className="text-green-950 font-bold text-sm">Overall Progress</span>
                  <button onClick={() => setTab("tracker")} className="text-gold-500 text-sm font-bold flex items-center gap-1 hover:text-gold-600">
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="w-full bg-gray-100 h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-700 to-gold-400 transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-gray-400 text-xs mt-2">{completed} of {steps.length} steps completed</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Steps Done", value: `${completed}/${steps.length}`, color: "text-green-700" },
                  { label: "Documents Ready", value: `${documents.filter(d => d.status === "available").length}/${documents.length}`, color: "text-gold-500" },
                  { label: "Unread Updates", value: unread, color: "text-green-600" },
                ].map(s => (
                  <div key={s.label} className="bg-white border border-gray-100 p-5">
                    <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
                    <p className="text-gray-400 text-sm">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Current step */}
              <div className="bg-white border-l-4 border-gold-400 pl-6 pr-6 py-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gold-500" />
                  <p className="text-green-950 font-bold text-sm">Current Step: Payment & Plot Allocation</p>
                </div>
                <p className="text-gray-500 text-sm">Payment received. Indenture is currently being prepared and signed by all parties.</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-gold-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" /> In Progress
                </div>
              </div>

              {/* Contact agent */}
              <div className="bg-white border border-gray-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-green-950 font-bold mb-1">Questions about your purchase?</p>
                  <p className="text-gray-500 text-sm">Your agent <strong>{demoUser.agent}</strong> is available via WhatsApp.</p>
                </div>
                <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold text-sm px-3 pr-5 py-2.5 transition-colors">
                  <span className="bg-gold-400 w-6 h-6 flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-green-950" />
                  </span>
                  WhatsApp Agent
                </a>
              </div>
            </div>
          )}

          {/* TRACKER */}
          {tab === "tracker" && (
            <div className="max-w-2xl">
              <div className="mb-6">
                <h2 className="text-green-950 font-bold text-xl mb-1">Purchase Journey</h2>
                <p className="text-gray-400 text-sm">Track every step of your land purchase in real-time.</p>
              </div>
              <div className="bg-white border border-gray-100 p-5 mb-5">
                <div className="flex justify-between mb-2">
                  <span className="text-green-950 font-bold text-sm">Overall Progress</span>
                  <span className="text-gold-500 font-bold">{progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div className="h-full bg-gradient-to-r from-green-700 to-gold-400" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="space-y-2">
                {steps.map((s, i) => {
                  const expanded = expandedStep === s.id;
                  const locked = s.status === "locked";
                  return (
                    <div key={s.id} className={`border overflow-hidden ${s.status === "in_progress" ? "border-gold-300" : s.status === "completed" ? "border-gray-200" : "border-gray-100"} bg-white`}>
                      <button onClick={() => !locked && setExpandedStep(expanded ? null : s.id)} disabled={locked}
                              className="w-full flex items-center gap-4 p-5 text-left disabled:cursor-default hover:bg-gray-50 transition-colors">
                        <div className={`w-10 h-10 flex items-center justify-center shrink-0 ${
                          s.status === "completed" ? "bg-green-100" : s.status === "in_progress" ? "bg-gold-100" : "bg-gray-50"
                        }`}>
                          {s.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                           s.status === "in_progress" ? <Clock className="w-5 h-5 text-gold-500" /> :
                           <Lock className="w-4 h-4 text-gray-300" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-semibold text-sm ${locked ? "text-gray-400" : "text-green-950"}`}>
                              Step {i + 1}: {s.title}
                            </span>
                            <StatusBadge status={s.status} />
                          </div>
                          {s.date && <p className={`text-xs mt-0.5 ${locked ? "text-gray-300" : "text-gray-400"}`}>{s.date}</p>}
                        </div>
                        {!locked && <ChevronRight className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`} />}
                      </button>
                      {expanded && !locked && (
                        <div className="px-5 pb-5 border-t border-gray-50">
                          <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-3">{s.description}</p>
                          {s.note && <div className="bg-green-50 border-l-2 border-gold-400 pl-4 py-3 mb-3">
                            <p className="text-gray-600 text-xs leading-relaxed"><strong>Note: </strong>{s.note}</p>
                          </div>}
                          {s.documents && s.documents.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {s.documents.map(doc => (
                                <button key={doc} className="inline-flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1.5 transition-colors">
                                  <Download className="w-3 h-3" /> {doc}
                                </button>
                              ))}
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

          {/* DOCUMENTS */}
          {tab === "documents" && (
            <div className="max-w-3xl">
              <div className="mb-6">
                <h2 className="text-green-950 font-bold text-xl mb-1">Your Documents</h2>
                <p className="text-gray-400 text-sm">Documents unlock as each step completes. Final package delivered via DHL.</p>
              </div>
              <div className="bg-white border border-gray-100 overflow-hidden">
                {documents.map((doc, i) => (
                  <div key={doc.name} className={`flex items-center justify-between px-6 py-4 ${i < documents.length - 1 ? "border-b border-gray-50" : ""} ${doc.status === "pending" ? "opacity-40" : ""}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 flex items-center justify-center ${doc.status === "available" ? "bg-green-100" : "bg-gray-100"}`}>
                        <FileText className={`w-4 h-4 ${doc.status === "available" ? "text-green-600" : "text-gray-300"}`} />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${doc.status === "available" ? "text-green-950" : "text-gray-400"}`}>{doc.name}</p>
                        <p className="text-gray-400 text-xs">{doc.date}</p>
                      </div>
                    </div>
                    {doc.status === "available"
                      ? <button className="inline-flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1.5 transition-colors"><Download className="w-3 h-3" /> Download</button>
                      : <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-bold"><Lock className="w-3 h-3" /> Pending</span>
                    }
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-gold-50 border border-gold-200 p-4">
                <p className="text-gray-700 text-sm"><strong>International clients:</strong> Final documentation package (Indenture + Site Plan) will be dispatched via DHL once all steps complete.</p>
              </div>
            </div>
          )}

          {/* UPDATES */}
          {tab === "updates" && (
            <div className="max-w-2xl">
              <div className="mb-6">
                <h2 className="text-green-950 font-bold text-xl mb-1">Updates & Notifications</h2>
                <p className="text-gray-400 text-sm">Real-time updates from the Golden Roots team.</p>
              </div>
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n.id} className={`bg-white border p-5 flex items-start gap-4 ${!n.read ? "border-gold-300" : "border-gray-100"}`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-2 ${!n.read ? "bg-gold-400" : "bg-gray-200"}`} />
                    <div className="flex-1">
                      <p className={`text-sm leading-relaxed ${!n.read ? "text-green-950 font-semibold" : "text-gray-600"}`}>{n.text}</p>
                      <p className="text-gray-400 text-xs mt-2">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-white border border-gray-100 p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  <div>
                    <p className="text-green-950 font-bold text-sm">{demoUser.location}</p>
                    <p className="text-gray-400 text-xs">Plot ID: {demoUser.plotId}</p>
                  </div>
                </div>
                <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
                   className="text-xs text-gold-600 font-bold hover:text-gold-700 underline">
                  Request Video Tour
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
