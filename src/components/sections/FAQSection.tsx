"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Who is the true owner of the land?", a: "The owner must be verifiable through a Land Title Certificate or customary documentation. Golden Roots always verifies the seller's ID, proof of ownership, and written authority for stool or family land before listing." },
  { q: "Is the land stool, family, or private land?", a: "Private land carries the lowest risk. Family land requires full consensus; stool land needs traditional authority documentation. We guide buyers toward private or well-documented family land." },
  { q: "Has the land been registered at the Lands Commission?", a: "Yes. We ensure the site plan is stamped and a search report confirms no litigation. No clear registration path means no listing." },
  { q: "Is the land free from disputes or multiple sales?", a: "A Lands Commission search and local inquiry are conducted for every plot. Golden Roots provides these search reports to buyers upon request." },
  { q: "What documents will I receive after payment?", a: "Signed Indenture, original site plan, payment receipts, and allocation notes — delivered via DHL for international clients. Local clients may arrange pickup." },
  { q: "What additional costs should I expect?", a: "Survey, Lands Commission fees, stamp duty, and legal fees typically add 15–30% above land price. We advise buyers upfront so there are no surprises." },
  { q: "Can I buy land remotely from abroad?", a: "Absolutely. We offer virtual site tours, remote document processing, and DHL delivery of all paperwork. Golden Roots was designed for the diaspora buyer." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — sticky */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gray-400" />
              <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">FAQ</span>
            </div>
            <h2 className="font-bold text-green-950 leading-tight mb-6"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Questions Every<br />Buyer Should Ask
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our framework helps diaspora buyers approach any Ghana land purchase with confidence — whether through Golden Roots or any other seller.
            </p>
            <div className="bg-green-950 p-8 rounded-sm">
              <p className="text-white font-bold text-lg mb-2">Still have questions?</p>
              <p className="text-white/50 text-sm mb-6">Book a free 30-minute consultation with our team.</p>
              <a
                href="https://calendly.com/goldenrootspropertiesgh/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-5 py-2.5 rounded transition-colors"
              >
                <span className="bg-white rounded-sm w-7 h-7 flex items-center justify-center">
                  <span className="text-green-900 font-bold text-xs">→</span>
                </span>
                Book Free Call
              </a>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="divide-y divide-gray-100 border border-gray-100 rounded-sm">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className={`font-semibold text-base pr-6 leading-snug ${open === i ? "text-green-900" : "text-green-950"}`}>
                    {faq.q}
                  </span>
                  {open === i
                    ? <Minus className="w-4 h-4 text-gold-500 shrink-0" />
                    : <Plus className="w-4 h-4 text-gray-400 shrink-0" />
                  }
                </button>
                {open === i && (
                  <div className="px-6 pb-5 bg-green-50">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
