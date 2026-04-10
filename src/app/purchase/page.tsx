"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const steps = ["Your Details", "Land Interest", "Budget & Timeline", "Review & Submit"];

const landTypes = [
  { id: "residential", label: "Residential Land", desc: "80×80 ft · Min. 1 plot · Personal home or investment" },
  { id: "agro", label: "Agro-Industrial Land", desc: "1 acre · Min. 5 acres · Farming & agribusiness" },
  { id: "beach", label: "Beach Land", desc: "80×80 ft · Min. 1 plot · Beachfront investment" },
  { id: "offmarket", label: "Off-Market Opportunity", desc: "Speak to our team about unlisted plots" },
];

const budgetRanges = ["Under $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000 – $100,000", "Above $100,000", "Open / Flexible"];
const timelines = ["As soon as possible", "Within 3 months", "3–6 months", "6–12 months", "Just exploring"];

type FormData = {
  firstName: string; lastName: string; email: string; phone: string; country: string;
  landType: string; plots: string; purpose: string;
  budget: string; timeline: string; paymentPlan: string; additionalInfo: string;
};

export default function PurchasePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", country: "",
    landType: "", plots: "1", purpose: "",
    budget: "", timeline: "", paymentPlan: "", additionalInfo: "",
  });

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-green-950 flex items-center justify-center px-4 pt-36">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-gold-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-950" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Enquiry Submitted!</h1>
            <p className="text-white/60 mb-2">
              Thank you, <strong className="text-white">{form.firstName}</strong>. We&apos;ll be in touch within <strong className="text-gold-400">24 hours</strong>.
            </p>
            <p className="text-white/40 text-sm mb-10">Confirmation sent to <strong className="text-white/60">{form.email}</strong></p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/portal"
                    className="inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold px-6 py-3 rounded transition-colors">
                Access Client Portal
              </Link>
              <Link href="/"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-green-50 pt-52 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="block w-6 h-px bg-gray-400" />
              <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Purchase Process</span>
              <span className="block w-6 h-px bg-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-green-950 mb-2">Start Your Buying Process</h1>
            <p className="text-gray-500">Complete the form below and our team will guide you through the rest.</p>
          </div>

          {/* Step tabs */}
          <div className="flex border border-gray-200 bg-white mb-8 rounded-sm overflow-hidden">
            {steps.map((s, i) => (
              <button
                key={s}
                onClick={() => i < step && setStep(i)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  i === step ? "bg-green-950 text-white" :
                  i < step ? "bg-gold-400 text-green-950 cursor-pointer" :
                  "text-gray-400 cursor-default"
                }`}
              >
                <span className="hidden sm:inline">{s}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm">
            <div className="p-8">

              {/* Step 0 */}
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-green-950 mb-6">Your Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">First Name *</label>
                      <input value={form.firstName} onChange={e => set("firstName", e.target.value)}
                             className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 text-green-950" placeholder="John" />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Last Name *</label>
                      <input value={form.lastName} onChange={e => set("lastName", e.target.value)}
                             className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 text-green-950" placeholder="Mensah" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                           className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 text-green-950" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Phone / WhatsApp *</label>
                    <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                           className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 text-green-950" placeholder="+1 234 567 8900" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Country of Residence *</label>
                    <input value={form.country} onChange={e => set("country", e.target.value)}
                           className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 text-green-950" placeholder="e.g. United States" />
                  </div>
                </div>
              )}

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-green-950 mb-6">Land Interest</h2>
                  <div className="space-y-2">
                    {landTypes.map(lt => (
                      <button key={lt.id} onClick={() => set("landType", lt.id)}
                              className={`w-full text-left p-4 border-2 transition-all flex items-center justify-between ${
                                form.landType === lt.id ? "border-gold-400 bg-gold-50" : "border-gray-100 hover:border-gray-300"
                              }`}>
                        <div>
                          <p className="font-semibold text-green-950 text-sm">{lt.label}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{lt.desc}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 shrink-0 ml-4 ${form.landType === lt.id ? "border-gold-400 bg-gold-400" : "border-gray-200"}`} />
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Number of Plots</label>
                    <input type="number" min="1" value={form.plots} onChange={e => set("plots", e.target.value)}
                           className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 text-green-950" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Purpose of Purchase</label>
                    <select value={form.purpose} onChange={e => set("purpose", e.target.value)}
                            className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 text-green-950 bg-white">
                      <option value="">Select a purpose...</option>
                      <option>Personal Home / Building</option>
                      <option>Investment / Resale</option>
                      <option>Farming / Agribusiness</option>
                      <option>Retirement Home</option>
                      <option>Children&apos;s Future / Legacy</option>
                      <option>Resort / Vacation Development</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-green-950 mb-6">Budget & Timeline</h2>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-3">Approximate Budget (USD)</label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetRanges.map(b => (
                        <button key={b} onClick={() => set("budget", b)}
                                className={`py-3 px-4 text-sm font-semibold border-2 transition-colors text-left ${
                                  form.budget === b ? "border-gold-400 bg-gold-50 text-green-950" : "border-gray-100 text-gray-600 hover:border-gray-300"
                                }`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-3">Purchase Timeline</label>
                    <div className="space-y-2">
                      {timelines.map(t => (
                        <button key={t} onClick={() => set("timeline", t)}
                                className={`w-full py-3 px-4 text-sm font-semibold border-2 transition-colors text-left ${
                                  form.timeline === t ? "border-gold-400 bg-gold-50 text-green-950" : "border-gray-100 text-gray-600 hover:border-gray-300"
                                }`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-3">Payment Preference</label>
                    <div className="flex gap-2">
                      {["Full Payment", "Payment Plan", "Undecided"].map(opt => (
                        <button key={opt} onClick={() => set("paymentPlan", opt)}
                                className={`flex-1 py-3 text-sm font-bold border-2 transition-colors ${
                                  form.paymentPlan === opt ? "border-gold-400 bg-gold-400 text-green-950" : "border-gray-100 text-gray-600 hover:border-gray-300"
                                }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Additional Notes</label>
                    <textarea rows={3} value={form.additionalInfo} onChange={e => set("additionalInfo", e.target.value)}
                              className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gold-400 text-green-950 resize-none"
                              placeholder="Any specific requirements or questions..." />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-green-950 mb-6">Review Your Enquiry</h2>
                  <div className="space-y-4">
                    {[
                      { section: "Personal Details", items: [
                        { label: "Name", value: `${form.firstName} ${form.lastName}` },
                        { label: "Email", value: form.email },
                        { label: "Phone", value: form.phone },
                        { label: "Country", value: form.country },
                      ]},
                      { section: "Land Interest", items: [
                        { label: "Land Type", value: landTypes.find(l => l.id === form.landType)?.label || "—" },
                        { label: "Plots", value: form.plots },
                        { label: "Purpose", value: form.purpose || "—" },
                      ]},
                      { section: "Budget & Timeline", items: [
                        { label: "Budget", value: form.budget || "—" },
                        { label: "Timeline", value: form.timeline || "—" },
                        { label: "Payment", value: form.paymentPlan || "—" },
                      ]},
                    ].map(section => (
                      <div key={section.section} className="border border-gray-100 p-5">
                        <p className="text-green-950 font-bold text-xs uppercase tracking-wider mb-3">{section.section}</p>
                        <div className="space-y-2">
                          {section.items.map(item => (
                            <div key={item.label} className="flex justify-between text-sm">
                              <span className="text-gray-400">{item.label}</span>
                              <span className="text-green-950 font-semibold">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 bg-gold-50 border border-gold-200 p-4">
                    <p className="text-gray-600 text-sm">By submitting you agree to be contacted by Golden Roots Properties. Your information is kept confidential.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Nav buttons */}
            <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
                      className="inline-flex items-center gap-2 text-gray-500 hover:text-green-950 font-semibold text-sm disabled:opacity-30 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep(s => s + 1)}
                        className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold text-sm px-3 pr-5 py-2.5 rounded transition-colors">
                  <span className="bg-gold-400 w-6 h-6 flex items-center justify-center rounded-sm">
                    <ArrowRight className="w-3 h-3 text-green-950" />
                  </span>
                  Continue
                </button>
              ) : (
                <button onClick={() => setSubmitted(true)}
                        className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-5 py-2.5 rounded transition-colors">
                  <span className="bg-white w-6 h-6 flex items-center justify-center rounded-sm">
                    <CheckCircle2 className="w-3 h-3 text-green-900" />
                  </span>
                  Submit Enquiry
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-6">
            No payment required · Free consultation included · We respond within 24 hours
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
