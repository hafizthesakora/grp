"use client";

import { useState, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, CheckCircle2, Upload, X, ImageIcon, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = ["Your Details", "Land Interest", "Budget & Timeline", "Documents", "Review & Submit"];

const landTypes = [
  { id: "residential", label: "Residential Land", desc: "80×80 ft · Min. 1 plot · Personal home or investment" },
  { id: "agro", label: "Agro-Industrial Land", desc: "1 acre · Min. 5 acres · Farming & agribusiness" },
  { id: "beach", label: "Beach Land", desc: "80×80 ft · Min. 1 plot · Beachfront investment" },
  { id: "offmarket", label: "Off-Market Opportunity", desc: "Speak to our team about unlisted plots" },
];

const budgetRanges = ["Under $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000 – $100,000", "Above $100,000", "Open / Flexible"];
const timelines = ["As soon as possible", "Within 3 months", "3–6 months", "6–12 months", "Just exploring"];

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

type FormData = {
  firstName: string; lastName: string; email: string; phone: string; country: string;
  landType: string; plots: string; purpose: string;
  budget: string; timeline: string; paymentPlan: string; additionalInfo: string;
};

type ImageEntry = {
  file: File;
  preview: string;
};

function validateStep(step: number, form: FormData): string | null {
  if (step === 0) {
    if (!form.firstName.trim()) return "First name is required.";
    if (!form.lastName.trim()) return "Last name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "A valid email address is required.";
    if (!form.phone.trim()) return "Phone / WhatsApp number is required.";
    if (!form.country.trim()) return "Country of residence is required.";
  }
  if (step === 1) {
    if (!form.landType) return "Please select a land type.";
  }
  if (step === 2) {
    if (!form.budget) return "Please select a budget range.";
    if (!form.timeline) return "Please select a purchase timeline.";
  }
  // step 3 (documents) is optional
  return null;
}

export default function PurchasePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stepError, setStepError] = useState("");
  const [plotRef, setPlotRef] = useState("");
  const [uploadedCount, setUploadedCount] = useState(0);

  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", country: "",
    landType: "", plots: "1", purpose: "",
    budget: "", timeline: "", paymentPlan: "", additionalInfo: "",
  });

  const [images, setImages] = useState<ImageEntry[]>([]);
  const [imageError, setImageError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  // ── Image handling ───────────────────────────────────────────────────────────
  const addFiles = useCallback((files: FileList | File[]) => {
    setImageError("");
    const incoming = Array.from(files);
    const available = MAX_IMAGES - images.length;
    if (available <= 0) { setImageError(`Maximum ${MAX_IMAGES} images allowed.`); return; }

    const toAdd: ImageEntry[] = [];
    for (const file of incoming.slice(0, available)) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setImageError("Only JPEG, PNG and WebP images are accepted."); continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setImageError("Each image must be under 5 MB."); continue;
      }
      const preview = URL.createObjectURL(file);
      toAdd.push({ file, preview });
    }
    if (toAdd.length) setImages(prev => [...prev, ...toAdd]);
    if (incoming.length > available) setImageError(`Only ${available} more image${available === 1 ? "" : "s"} can be added.`);
  }, [images.length]);

  function removeImage(index: number) {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
    setImageError("");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");

    try {
      // 1. Upload images sequentially
      const imageUrls: string[] = [];
      for (let i = 0; i < images.length; i++) {
        setUploadedCount(i);
        const fd = new FormData();
        fd.append("file", images[i].file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error ?? "Image upload failed");
        }
        const { url } = await res.json();
        imageUrls.push(url);
      }
      setUploadedCount(images.length);

      // 2. Submit enquiry
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrls }),
      });

      if (!res.ok) {
        const data = await res.json();
        setSubmitError(data.error ?? "Submission failed. Please try again.");
      } else {
        const data = await res.json();
        setPlotRef(data.plotRef ?? "");
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Network error. Please check your connection.");
    } finally {
      setSubmitting(false);
      setUploadedCount(0);
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-green-950 flex items-center justify-center px-4 pt-36 pb-20">
          <div className="max-w-lg w-full">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gold-400 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-950" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Enquiry Submitted!</h1>
              <p className="text-white/60 mb-1">
                Thank you, <strong className="text-white">{form.firstName}</strong>. Your reference number is{" "}
                <strong className="text-gold-400">{plotRef}</strong>.
              </p>
              <p className="text-white/40 text-sm">Our team will contact you at <strong className="text-white/60">{form.email}</strong> within 24 hours.</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 mb-6">
              <p className="text-gold-400 font-bold text-xs uppercase tracking-widest mb-4">What Happens Next</p>
              <div className="space-y-4">
                {[
                  { n: "1", text: "Our team reviews your enquiry and will call or WhatsApp you within 24 hours." },
                  { n: "2", text: "We schedule a free virtual site tour so you can see the exact plot." },
                  { n: "3", text: "Once you're ready to proceed, we guide you through payment and documentation." },
                  { n: "4", text: "You receive your full documentation package (Site Plan + Indenture) via DHL." },
                ].map(s => (
                  <div key={s.n} className="flex items-start gap-4">
                    <span className="w-6 h-6 bg-gold-400 text-green-950 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">{s.n}</span>
                    <p className="text-white/60 text-sm leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
                 className="flex-1 inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold px-6 py-3 transition-colors">
                <ArrowRight className="w-4 h-4" /> WhatsApp Us Now
              </a>
              <Link href="/"
                    className="flex-1 inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-green-50 pt-36 sm:pt-44 lg:pt-52 pb-20">
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
                className={`flex-1 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors leading-tight ${
                  i === step ? "bg-green-950 text-white" :
                  i < step ? "bg-gold-400 text-green-950 cursor-pointer" :
                  "text-gray-400 cursor-default"
                }`}
              >
                <span className="hidden md:inline">{s}</span>
                <span className="md:hidden">{i + 1}</span>
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm">
            <div className="p-5 sm:p-8">

              {/* Step 0 — Your Details */}
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

              {/* Step 1 — Land Interest */}
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

              {/* Step 2 — Budget & Timeline */}
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

              {/* Step 3 — Supporting Documents */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-green-950 mb-1">Supporting Documents</h2>
                    <p className="text-gray-400 text-sm">
                      Optional — upload up to {MAX_IMAGES} images such as a government-issued ID, proof of funds,
                      or any reference photos. Accepted formats: JPEG, PNG, WebP · Max 5 MB each.
                    </p>
                  </div>

                  {/* Drop zone */}
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => images.length < MAX_IMAGES && fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-sm transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 py-10 px-6 text-center select-none ${
                      dragOver
                        ? "border-gold-400 bg-gold-50"
                        : images.length >= MAX_IMAGES
                        ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                        : "border-gray-200 hover:border-gold-400 hover:bg-gold-50/30"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${dragOver ? "bg-gold-400" : "bg-gray-100"}`}>
                      <Upload className={`w-5 h-5 ${dragOver ? "text-green-950" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <p className="text-green-950 font-semibold text-sm">
                        {images.length >= MAX_IMAGES ? "Maximum images reached" : "Drag & drop images here"}
                      </p>
                      {images.length < MAX_IMAGES && (
                        <p className="text-gray-400 text-xs mt-1">or <span className="text-gold-600 font-semibold underline underline-offset-2">browse files</span></p>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={e => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }}
                    />
                  </div>

                  {/* Image error */}
                  {imageError && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-100 px-4 py-2.5 rounded-sm">{imageError}</p>
                  )}

                  {/* Counter */}
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400 text-xs font-medium">{images.length} / {MAX_IMAGES} images selected</p>
                    {images.length > 0 && (
                      <button onClick={() => { images.forEach(img => URL.revokeObjectURL(img.preview)); setImages([]); setImageError(""); }}
                              className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">
                        Remove all
                      </button>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {images.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-sm overflow-hidden border border-gray-200 group bg-gray-50">
                          <Image
                            src={img.preview}
                            alt={`Upload ${i + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                          <button
                            onClick={e => { e.stopPropagation(); removeImage(i); }}
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <span className="absolute bottom-1 left-1 text-[10px] font-bold text-white bg-black/50 px-1.5 py-0.5 rounded-sm leading-none">{i + 1}</span>
                        </div>
                      ))}
                      {/* Empty slots */}
                      {Array.from({ length: MAX_IMAGES - images.length }).map((_, i) => (
                        <div key={`empty-${i}`}
                             onClick={() => fileInputRef.current?.click()}
                             className="aspect-square rounded-sm border-2 border-dashed border-gray-100 flex items-center justify-center cursor-pointer hover:border-gold-300 transition-colors">
                          <ImageIcon className="w-4 h-4 text-gray-200" />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-300 text-xs">
                    This step is optional. You can proceed without uploading any images.
                  </p>
                </div>
              )}

              {/* Step 4 — Review & Submit */}
              {step === 4 && (
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

                    {/* Images summary */}
                    <div className="border border-gray-100 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-green-950 font-bold text-xs uppercase tracking-wider">Supporting Documents</p>
                        <span className="text-gray-400 text-xs">{images.length} image{images.length !== 1 ? "s" : ""}</span>
                      </div>
                      {images.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                          {images.map((img, i) => (
                            <div key={i} className="relative w-14 h-14 rounded-sm overflow-hidden border border-gray-200">
                              <Image src={img.preview} alt={`Doc ${i + 1}`} fill className="object-cover" unoptimized />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-300 text-sm">No documents uploaded.</p>
                      )}
                    </div>
                  </div>

                  {/* Trust signals */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { icon: ShieldCheck, text: "Lands Commission Verified" },
                      { icon: Lock, text: "Data Protected" },
                      { icon: BadgeCheck, text: "No Upfront Commitment" },
                    ].map(t => (
                      <div key={t.text} className="flex flex-col items-center gap-1.5 bg-green-50 border border-green-100 p-3 text-center">
                        <t.icon className="w-4 h-4 text-green-700" />
                        <span className="text-green-800 text-xs font-semibold leading-snug">{t.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-gold-50 border border-gold-200 p-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      By submitting this enquiry you agree to be contacted by Golden Roots Properties regarding
                      your land interest and confirm that you have read and accept our{" "}
                      <Link href="/privacy-policy" target="_blank" className="text-green-700 hover:text-green-900 font-semibold underline underline-offset-2">Privacy Policy</Link>
                      {" "}and{" "}
                      <Link href="/terms" target="_blank" className="text-green-700 hover:text-green-900 font-semibold underline underline-offset-2">Terms &amp; Conditions</Link>.
                      Submitting this form does not constitute a binding purchase agreement.
                      Your information is kept strictly confidential and is never sold to third parties.
                    </p>
                  </div>

                  {/* Upload progress */}
                  {submitting && images.length > 0 && (
                    <div className="mt-4 bg-green-50 border border-green-100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-green-950 font-semibold text-sm">Uploading documents…</p>
                        <p className="text-gray-400 text-xs">{uploadedCount}/{images.length}</p>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-400 rounded-full transition-all duration-300"
                          style={{ width: images.length > 0 ? `${(uploadedCount / images.length) * 100}%` : "0%" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Nav buttons */}
            {(stepError || submitError) && (
              <div className="mx-5 sm:mx-8 mb-0 mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{stepError || submitError}</div>
            )}
            <div className="px-5 sm:px-8 py-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <button onClick={() => { setStep(s => Math.max(0, s - 1)); setStepError(""); }} disabled={step === 0}
                      className="inline-flex items-center gap-2 text-gray-500 hover:text-green-950 font-semibold text-sm disabled:opacity-30 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={() => {
                    const err = validateStep(step, form);
                    if (err) { setStepError(err); return; }
                    setStepError("");
                    setStep(s => s + 1);
                  }}
                  className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold text-sm px-3 pr-5 py-2.5 rounded transition-colors">
                  <span className="bg-gold-400 w-6 h-6 flex items-center justify-center rounded-sm">
                    <ArrowRight className="w-3 h-3 text-green-950" />
                  </span>
                  Continue
                </button>
              ) : (
                <button
                  disabled={submitting}
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-5 py-2.5 rounded transition-colors disabled:opacity-60">
                  {submitting
                    ? <span className="w-4 h-4 border-2 border-green-950/30 border-t-green-950 rounded-full animate-spin" />
                    : <><span className="bg-white w-6 h-6 flex items-center justify-center rounded-sm">
                        <CheckCircle2 className="w-3 h-3 text-green-900" />
                      </span>
                      Submit Enquiry</>
                  }
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
