import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, ArrowRight, CheckSquare } from "lucide-react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import UmmiSaeedaSitePlan from "@/components/UmmiSaeedaSitePlan";

const categories = [
  {
    id: "residential",
    type: "Residential Land",
    tag: "Most Popular",
    accent: "bg-gold-400 text-green-950",
    location: "Mankessim, Central Region",
    plotSize: "80 × 80 ft",
    minPurchase: "1 plot",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80",
    description: "Ideal for personal homes and long-term investment in Ghana's growing residential sector. Each plot comes with a full documentation package in a secure, well-planned community.",
    features: ["Pre-vetted, litigation-free title", "Full boundary demarcation", "Fencing assistance available", "Barcoded site plan", "Signed Indenture", "DHL document delivery"],
  },
  {
    id: "agro-industrial",
    type: "Agro-Industrial Land",
    tag: "High ROI",
    accent: "bg-green-500 text-white",
    location: "Mankessim, Central Region",
    plotSize: "1 acre (6 plots)",
    minPurchase: "5 acres",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
    description: "Prime agricultural land suitable for farming, agribusiness, and industrial development. Ideal for investors capitalising on Ghana's growing agricultural sector.",
    features: ["Commercially zoned land", "Large-scale acquisition", "Agricultural & industrial use", "Full survey & site plan", "Lands Commission verified", "Post-purchase support"],
  },
  {
    id: "beach",
    type: "Beach Land",
    tag: "Premium",
    accent: "bg-gold-500 text-white",
    location: "Central Region Coastline",
    plotSize: "80 × 80 ft",
    minPurchase: "1 plot",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    description: "Beachfront investment with exceptional appreciation potential along Ghana's coastline. Perfect for vacation homes, resort development, or long-term investment.",
    features: ["Prime coastal location", "High appreciation potential", "Vacation & resort use", "Full documentation package", "Virtual site tour available", "Limited plots only"],
  },
];

export default function PropertiesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── PAGE HERO ── */}
        <section className="bg-green-950 pt-52 pb-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">Our Listings</span>
            </div>
            <h1 className="font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              Verified Land<br />Opportunities
            </h1>
            <p className="text-white/60 text-lg max-w-xl">
              Every plot is pre-vetted, Lands Commission-searched, and comes with a full documentation package.
            </p>
          </div>
        </section>

        {/* ── VERIFICATION BAR ── */}
        <div className="bg-gold-400">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-4 flex flex-wrap items-center gap-4">
            <span className="text-green-950 font-extrabold text-sm uppercase tracking-wider">Verified:</span>
            {["Lands Commission Search", "Family/Stool Consent", "Boundary Check", "Site Plan", "Indenture", "Barcode"].map(s => (
              <span key={s} className="flex items-center gap-1.5 text-green-900 text-xs font-bold">
                <span className="w-1 h-1 rounded-full bg-green-900" />{s}
              </span>
            ))}
          </div>
        </div>

        {/* ── LAND CATEGORIES ── */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <AnimateIn>
              <div className="flex items-center gap-2 mb-3">
                <span className="block w-6 h-px bg-gray-400" />
                <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Land Categories</span>
              </div>
              <h2 className="font-bold text-green-950 mb-12" style={{ fontSize: "clamp(28px, 3vw, 44px)" }}>
                What We Offer
              </h2>
            </AnimateIn>

            <div className="space-y-10">
              {categories.map((cat, i) => (
                <AnimateIn key={cat.id} delay={i * 0.08}>
                  <div id={cat.id} className="group grid lg:grid-cols-5 border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-shadow duration-300">

                    <div className={`lg:col-span-2 relative min-h-64 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                      <Image
                        src={cat.image}
                        alt={cat.type}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-950/70 to-green-950/30" />
                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <span className={`self-start text-xs font-bold px-3 py-1 ${cat.accent}`}>{cat.tag}</span>
                        <div>
                          <h2 className="text-white text-2xl font-bold mb-2">{cat.type}</h2>
                          <div className="flex items-center gap-1.5 text-white/50 text-sm mb-5">
                            <MapPin className="w-3.5 h-3.5" />{cat.location}
                          </div>
                          <div className="flex gap-6">
                            <div>
                              <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold mb-0.5">Plot Size</p>
                              <p className="text-white font-bold">{cat.plotSize}</p>
                            </div>
                            <div>
                              <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold mb-0.5">Min. Purchase</p>
                              <p className="text-white font-bold">{cat.minPurchase}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <p className="text-gray-600 leading-relaxed mb-7">{cat.description}</p>
                        <p className="text-green-950 font-bold text-xs uppercase tracking-wider mb-4">What&apos;s Included</p>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {cat.features.map(f => (
                            <div key={f} className="flex items-center gap-2">
                              <CheckSquare className="w-4 h-4 text-gold-500 shrink-0" />
                              <span className="text-gray-700 text-sm">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Link href="/purchase"
                              className="inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-5 py-2.5 transition-colors">
                          <span className="bg-white w-7 h-7 flex items-center justify-center shrink-0">
                            <ArrowRight className="w-3.5 h-3.5 text-green-900" />
                          </span>
                          Start Buying
                        </Link>
                        <Link href="/contact"
                              className="inline-flex items-center gap-2 border border-gray-200 hover:border-green-700 hover:text-green-800 text-gray-600 font-semibold text-sm px-5 py-2.5 transition-colors">
                          Enquire
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── UMMI SAEEDA VILLAGE — SITE PLAN ── */}
        <section className="bg-green-950 py-16">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

            {/* Section header */}
            <AnimateIn>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-gold-400 text-green-950 font-bold text-xs px-3 py-1 uppercase tracking-wider mb-4">
                    Active Estate — Now Selling
                  </span>
                  <h2 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                    Ummi Saeeda Village
                  </h2>
                  <p className="text-white/50 mt-2 max-w-xl">
                    Our flagship estate in Mankessim, Central Region. Select any available plot on the site plan below.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm shrink-0">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  Mankessim, Central Region
                </div>
              </div>
            </AnimateIn>

            {/* Animated site plan */}
            <UmmiSaeedaSitePlan />

            {/* CTA footer */}
            <AnimateIn delay={0.15}>
              <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/5 border border-white/10 p-8">
                <div>
                  <p className="text-white font-bold text-lg mb-1">Can&apos;t find your ideal plot?</p>
                  <p className="text-white/50 text-sm">Contact us about off-market listings or upcoming estates.</p>
                </div>
                <Link href="/contact"
                      className="shrink-0 inline-flex items-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-3 pr-5 py-2.5 transition-colors">
                  <span className="bg-white w-7 h-7 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-green-900" />
                  </span>
                  Enquire Now
                </Link>
              </div>
            </AnimateIn>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
