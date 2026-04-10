import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enquiry & Consultation",
    description: "Book a call to discuss your goals, budget, and preferred land type. Our team guides you through all available options.",
  },
  {
    number: "02",
    title: "Virtual or Physical Site Visit",
    description: "See the land via a live video call or in-person tour. We provide honest, unedited views of every plot.",
  },
  {
    number: "03",
    title: "Verification & Review",
    description: "All documentation is provided for your independent review. We encourage buyers to verify before paying.",
  },
  {
    number: "04",
    title: "Payment & Plot Allocation",
    description: "Secure payment channels provided. Your specific plot is assigned and documented in your name.",
  },
  {
    number: "05",
    title: "After-Sales Support",
    description: "Full documentation handover, fencing assistance, and ongoing post-purchase support.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-green-950 py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">The Process</span>
            </div>
            <h2 className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Your Buying Journey
            </h2>
          </div>
          <Link
            href="/purchase"
            className="shrink-0 inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-base px-3 pr-6 py-3 rounded transition-colors"
          >
            <span className="bg-white rounded w-8 h-8 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-green-900" />
            </span>
            Start Now
          </Link>
        </div>

        {/* Steps — horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-white/10" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-start md:items-center text-left md:text-center px-2 pb-10 md:pb-0">
              {/* Number circle */}
              <div className={`relative z-10 w-16 h-16 rounded-sm flex items-center justify-center mb-6 font-extrabold text-xl shrink-0 ${
                i === 3
                  ? "bg-gold-400 text-green-950"
                  : "bg-white/10 text-white border border-white/10"
              }`}>
                {step.number}
              </div>
              <h3 className="text-white font-bold text-base mb-3 leading-snug">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>

              {/* Connector arrow on mobile */}
              {i < steps.length - 1 && (
                <div className="md:hidden mt-6 text-white/20 self-center">↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
