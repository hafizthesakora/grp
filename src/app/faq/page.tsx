"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    label: "The Land & Title",
    faqs: [
      { q: "Who is the true owner of the land?", a: "The owner must be verifiable through a Land Title Certificate or customary documentation. Golden Roots always verifies the seller's ID, proof of ownership, and written authority for stool or family land before listing any plot." },
      { q: "Is the land stool, family, or private land?", a: "Private land carries the lowest risk. Family land requires full family consensus; stool land needs traditional authority documentation. Golden Roots guides buyers toward private or well-documented family land wherever possible." },
      { q: "Has the land been registered at the Lands Commission?", a: "Yes. We ensure the site plan is stamped and a search report confirms no litigation. No clear registration path means the land does not get listed — full stop." },
      { q: "Is the land free from disputes, multiple sales, or encumbrances?", a: "A Lands Commission search and local inquiry are conducted for every plot. Golden Roots conducts both and provides the search reports directly to buyers upon request." },
      { q: "What is the exact size and boundary of the plot?", a: "We provide a licensed surveyor's site plan showing exact dimensions and boundaries. Buyers are encouraged to physically walk the land or view it via a live video call to confirm." },
      { q: "What is the land zoned for?", a: "Residential, commercial, agricultural, or mixed use — we verify land zoning with Town and Country Planning prior to listing. Each property listing clearly states its approved use." },
    ],
  },
  {
    label: "The Buying Process",
    faqs: [
      { q: "Can I buy land remotely from abroad?", a: "Absolutely. Golden Roots was designed specifically for remote buyers. We offer virtual site tours, remote document processing, and DHL delivery of all paperwork — everything works fully online." },
      { q: "How long does the full process take?", a: "From initial enquiry to receiving your final documentation typically takes 4–8 weeks. The Lands Commission search and Indenture preparation are the longest steps. We keep you updated throughout." },
      { q: "Can I view the land before buying?", a: "Yes. We offer live video call tours via WhatsApp or Zoom, or you can arrange an in-person visit. We provide honest, unedited views and strongly encourage buyers to see the land before committing." },
      { q: "What payment methods do you accept?", a: "We accept bank transfer (international and local), mobile money (MTN/Vodafone), and other secure payment channels. Payment plans are available for eligible buyers. Contact our team for details." },
      { q: "Is a payment plan available?", a: "Yes. We offer instalment payment options for buyers who prefer to spread the cost. Terms vary by plot and land type. Contact our team to discuss what works for you." },
    ],
  },
  {
    label: "Documentation",
    faqs: [
      { q: "What documents will I receive after payment?", a: "You receive: a signed Indenture (deed of assignment), original barcoded site plan, payment receipts, and allocation notes. International clients receive documents via DHL. Local clients may arrange pickup." },
      { q: "What is an Indenture?", a: "The Indenture is the legal Deed of Assignment that formally transfers ownership of the land to you. It is signed by all parties, stamped by the Lands Commission, and is the most important document proving your ownership." },
      { q: "What is a barcoded site plan?", a: "The barcoded site plan is an official geometric survey of your specific plot, prepared by a licensed surveyor and stamped by the Lands Commission. The barcode uniquely identifies your plot in official records." },
      { q: "What additional costs should I expect?", a: "Survey, Lands Commission fees, stamp duty, and legal fees typically add 15–30% above the land price. We advise buyers upfront with a full cost breakdown so there are absolutely no surprises." },
    ],
  },
  {
    label: "After Purchase",
    faqs: [
      { q: "What post-purchase support do you offer?", a: "Golden Roots provides comprehensive after-sales support including: protection from encroachment, ground rent handling, fencing assistance, dispute resolution support, and ongoing communication with our team." },
      { q: "How is my land protected after I buy it?", a: "We provide encroachment protection services and can coordinate fencing on your behalf. We also assist with ground rent payments and handle any boundary disputes that may arise post-purchase." },
      { q: "Can Golden Roots manage my land after purchase?", a: "Yes. We offer ongoing property management services including monitoring, maintenance coordination, and representation in Ghana. Contact us to discuss a management arrangement suited to your needs." },
    ],
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-green-950 pt-52 pb-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">FAQ</span>
            </div>
            <h1 className="font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              Frequently Asked<br />Questions
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Everything diaspora buyers need to know before purchasing land in Ghana —
              whether through Golden Roots or any other seller.
            </p>
          </div>
        </section>

        {/* FAQ body */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="grid lg:grid-cols-4 gap-10">

              {/* Category sidebar */}
              <div className="lg:col-span-1">
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">Categories</p>
                <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                  {categories.map((cat, i) => (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(i)}
                      className={`shrink-0 text-left px-4 py-3 text-sm font-bold border transition-colors ${
                        activeCategory === i
                          ? "bg-green-950 text-white border-green-950"
                          : "border-gray-100 text-gray-600 hover:border-green-200 hover:text-green-950"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="hidden lg:block mt-10 bg-green-950 p-6">
                  <p className="text-white font-bold mb-2">Still have questions?</p>
                  <p className="text-white/40 text-xs mb-5">Book a free call with our team.</p>
                  <a href="https://calendly.com/goldenrootspropertiesgh/30min" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-xs px-3 pr-4 py-2.5 transition-colors">
                    <span className="bg-white w-5 h-5 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-green-900" />
                    </span>
                    Book Free Call
                  </a>
                </div>
              </div>

              {/* Accordion */}
              <div className="lg:col-span-3">
                <p className="text-green-950 font-bold text-xl mb-6">{categories[activeCategory].label}</p>
                <div className="divide-y divide-gray-100 border border-gray-100">
                  {categories[activeCategory].faqs.map((faq, i) => {
                    const id = `${activeCategory}-${i}`;
                    const isOpen = openId === id;
                    return (
                      <div key={id}>
                        <button
                          onClick={() => setOpenId(isOpen ? null : id)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className={`font-semibold text-base pr-6 leading-snug ${isOpen ? "text-green-900" : "text-green-950"}`}>
                            {faq.q}
                          </span>
                          {isOpen
                            ? <Minus className="w-4 h-4 text-gold-500 shrink-0" />
                            : <Plus className="w-4 h-4 text-gray-400 shrink-0" />
                          }
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 bg-green-50 border-t border-gray-100">
                            <p className="text-gray-600 text-sm leading-relaxed pt-4">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gold-400 py-16">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-green-950 font-bold text-2xl lg:text-3xl">Ready to start the process?</h2>
              <p className="text-green-800 mt-1">Our team is available via phone, email, and WhatsApp.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/purchase"
                    className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold text-sm px-3 pr-5 py-3 transition-colors">
                <span className="bg-gold-400 w-7 h-7 flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-green-950" />
                </span>
                Start Buying
              </Link>
              <Link href="/contact"
                    className="inline-flex items-center gap-3 border-2 border-green-950 text-green-950 font-bold text-sm px-5 py-3 hover:bg-green-950 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
