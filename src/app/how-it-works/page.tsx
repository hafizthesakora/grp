import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, PhoneCall, Video, FileText, CreditCard, HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Enquiry & Consultation",
    description:
      "Book a free 30-minute call with our team. We discuss your goals, budget, preferred land type, and answer any questions you have. There is no obligation at this stage.",
    details: [
      "Discuss your goals and budget",
      "Learn about available land options",
      "Get guidance on the best land type for your needs",
      "Ask any questions about the process",
    ],
    cta: "Book a free consultation",
    ctaHref: "https://calendly.com/goldenrootspropertiesgh/30min",
    external: true,
  },
  {
    number: "02",
    icon: Video,
    title: "Site Visit — Virtual or Physical",
    description:
      "See the land yourself before committing. We offer live video call tours via WhatsApp or Zoom, or you can visit in person. We provide honest, unedited views of every plot.",
    details: [
      "Live video call tour via WhatsApp or Zoom",
      "In-person visit arranged at your convenience",
      "View boundary markers and surrounding area",
      "Ask questions during the tour in real-time",
    ],
    cta: null,
  },
  {
    number: "03",
    icon: FileText,
    title: "Verification & Documentation Review",
    description:
      "All documentation is provided for your independent review before any payment is made. We encourage buyers to conduct their own verification — we have nothing to hide.",
    details: [
      "Lands Commission search report shared with you",
      "Family or stool consent letters provided",
      "Survey and site plan made available",
      "Independent legal review encouraged",
    ],
    cta: null,
  },
  {
    number: "04",
    icon: CreditCard,
    title: "Payment & Plot Allocation",
    description:
      "Once you are satisfied with the documentation, secure payment channels are provided. Your specific plot is then assigned, allocated, and documented legally in your name.",
    details: [
      "Secure payment channels provided",
      "Instalment/payment plan options available",
      "Plot formally allocated in your name",
      "Allocation notes issued immediately",
    ],
    cta: "Start buying process",
    ctaHref: "/purchase",
    external: false,
  },
  {
    number: "05",
    icon: HeartHandshake,
    title: "After-Sales Support",
    description:
      "We do not disappear after the sale. Full documentation is handed over, and we provide ongoing support including fencing assistance, encroachment protection, and ground rent handling.",
    details: [
      "Indenture and site plan handed over (DHL for international buyers)",
      "Fencing assistance coordinated",
      "Protection from encroachment",
      "Ground rent and post-purchase support",
    ],
    cta: null,
  },
];

const verificationItems = [
  { icon: ShieldCheck, title: "Lands Commission Search", desc: "We independently verify the root of title at the Lands Commission." },
  { icon: ShieldCheck, title: "Family / Stool Consent", desc: "Written consent obtained from all relevant family or traditional authority." },
  { icon: ShieldCheck, title: "Physical Boundary Check", desc: "On-site boundary verification by a licensed surveyor." },
  { icon: ShieldCheck, title: "Gazetted Site Plan", desc: "Official stamped site plan showing the exact plot dimensions." },
  { icon: ShieldCheck, title: "Indenture Preparation", desc: "Legal deed of assignment drafted and signed by all parties." },
  { icon: ShieldCheck, title: "Barcode Generation", desc: "Each plot receives a unique barcode registered against its documentation." },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-green-950 pt-52 pb-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">The Process</span>
            </div>
            <h1 className="font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              Your Buying Journey
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              A transparent, five-step process designed to work fully remotely for international buyers.
              No hidden steps, no surprises.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`grid lg:grid-cols-2 gap-0 border border-gray-100 ${i > 0 ? "border-t-0" : ""}`}
                >
                  {/* Left — number + title */}
                  <div className={`p-10 lg:p-14 flex flex-col justify-between ${i % 2 === 0 ? "bg-white" : "bg-green-50"}`}>
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        {/* Step number — clearly visible gold box */}
                        <div className="w-16 h-16 bg-gold-400 flex items-center justify-center shrink-0">
                          <span className="font-extrabold text-green-950 text-2xl leading-none">{step.number}</span>
                        </div>
                        <div className="w-12 h-12 bg-green-950 flex items-center justify-center shrink-0">
                          <step.icon className="w-5 h-5 text-gold-400" />
                        </div>
                      </div>
                      <h2 className="text-green-950 font-bold text-2xl lg:text-3xl mb-4">{step.title}</h2>
                      <p className="text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                    {step.cta && (
                      <div className="mt-8">
                        {step.external ? (
                          <a href={step.ctaHref!} target="_blank" rel="noopener noreferrer"
                             className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-5 py-2.5 transition-colors">
                            <span className="bg-white w-7 h-7 flex items-center justify-center">
                              <ArrowRight className="w-3.5 h-3.5 text-green-900" />
                            </span>
                            {step.cta}
                          </a>
                        ) : (
                          <Link href={step.ctaHref!}
                                className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-5 py-2.5 transition-colors">
                            <span className="bg-white w-7 h-7 flex items-center justify-center">
                              <ArrowRight className="w-3.5 h-3.5 text-green-900" />
                            </span>
                            {step.cta}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right — detail list */}
                  <div className={`p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-gray-100 ${i % 2 === 0 ? "bg-green-950" : "bg-green-900"}`}>
                    <p className="text-white/40 font-bold text-xs uppercase tracking-widest mb-6">What happens in this step</p>
                    <ul className="space-y-4">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-start gap-3">
                          <span className="w-5 h-5 bg-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-green-950 text-xs font-extrabold">✓</span>
                          </span>
                          <span className="text-white/70 text-sm leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verification checklist */}
        <section className="bg-green-950 py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">Due Diligence</span>
            </div>
            <h2 className="font-bold text-white mb-4"
                style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}>
              Our 6-Step Verification Framework
            </h2>
            <p className="text-white/50 text-lg mb-12 max-w-2xl">
              Before any plot is listed, it goes through our full verification checklist. You receive copies of all search reports.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {verificationItems.map((item, i) => (
                <div key={item.title} className="bg-white/5 border border-white/10 p-7 hover:border-gold-400/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gold-400 flex items-center justify-center shrink-0">
                      <span className="text-green-950 font-extrabold text-sm">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="text-white font-bold text-sm">{item.title}</p>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold-400 py-16">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-green-950 font-bold text-2xl lg:text-3xl">Ready to begin your journey?</h2>
              <p className="text-green-800 mt-1">Start with a free consultation — no commitment required.</p>
            </div>
            <Link href="/purchase"
                  className="shrink-0 inline-flex items-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold text-sm px-3 pr-5 py-3 transition-colors">
              <span className="bg-gold-400 w-7 h-7 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-green-950" />
              </span>
              Start Buying Process
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
