import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, ArrowRight, CheckSquare, Maximize2, Tag } from "lucide-react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

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

const ummisaeedaPlots = [
  { id: "USV-001", type: "Residential", size: "80 × 80 ft", price: "$8,500", status: "available" },
  { id: "USV-002", type: "Residential", size: "80 × 80 ft", price: "$8,500", status: "available" },
  { id: "USV-003", type: "Residential", size: "80 × 80 ft", price: "$9,000", status: "reserved" },
  { id: "USV-004", type: "Residential", size: "80 × 80 ft", price: "$8,500", status: "available" },
  { id: "USV-005", type: "Residential", size: "80 × 80 ft", price: "$9,000", status: "available" },
  { id: "USV-006", type: "Residential", size: "80 × 80 ft", price: "$8,500", status: "sold" },
  { id: "USV-007", type: "Residential", size: "80 × 80 ft", price: "$9,500", status: "available" },
  { id: "USV-008", type: "Residential", size: "80 × 80 ft", price: "$9,500", status: "available" },
  { id: "USV-009", type: "Agro", size: "1 acre", price: "$14,000", status: "available" },
  { id: "USV-010", type: "Agro", size: "1 acre", price: "$14,000", status: "reserved" },
  { id: "USV-011", type: "Agro", size: "1 acre", price: "$14,500", status: "available" },
  { id: "USV-012", type: "Residential", size: "80 × 80 ft", price: "$8,500", status: "sold" },
];

const statusStyle: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  reserved:  "bg-gold-100  text-yellow-800",
  sold:      "bg-gray-100  text-gray-500",
};

export default function PropertiesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── PAGE HERO ─── */}
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

        {/* ── LAND CATEGORIES WITH IMAGES ── */}
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
              {categories.map((p, i) => (
                <AnimateIn key={p.id} delay={i * 0.08}>
                  <div id={p.id} className="group grid lg:grid-cols-5 border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-shadow duration-300">

                    {/* Image */}
                    <div className={`lg:col-span-2 relative min-h-64 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                      <Image
                        src={p.image}
                        alt={p.type}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-950/70 to-green-950/30" />
                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <span className={`self-start text-xs font-bold px-3 py-1 ${p.accent}`}>{p.tag}</span>
                        <div>
                          <h2 className="text-white text-2xl font-bold mb-2">{p.type}</h2>
                          <div className="flex items-center gap-1.5 text-white/50 text-sm mb-5">
                            <MapPin className="w-3.5 h-3.5" />{p.location}
                          </div>
                          <div className="flex gap-6">
                            <div>
                              <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold mb-0.5">Plot Size</p>
                              <p className="text-white font-bold">{p.plotSize}</p>
                            </div>
                            <div>
                              <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold mb-0.5">Min. Purchase</p>
                              <p className="text-white font-bold">{p.minPurchase}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <p className="text-gray-600 leading-relaxed mb-7">{p.description}</p>
                        <p className="text-green-950 font-bold text-xs uppercase tracking-wider mb-4">What&apos;s Included</p>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {p.features.map(f => (
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

        {/* ── UMMI SAEEDA VILLAGE ── */}
        <section className="bg-green-950 py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

            <AnimateIn>
              {/* Estate header */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div>
                  <span className="inline-flex items-center gap-1.5 bg-gold-400 text-green-950 font-bold text-xs px-3 py-1 uppercase tracking-wider mb-4">
                    Active Estate — Now Selling
                  </span>
                  <h2 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
                    Ummi Saeeda Village
                  </h2>
                  <p className="text-white/50 mt-2 max-w-xl">
                    Our flagship estate in Mankessim, Central Region. Individual plots available for purchase — residential and agro-industrial.
                  </p>
                </div>

                {/* Estate image */}
                <div className="relative h-48 w-full lg:w-80 overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
                    alt="Ummi Saeeda Village"
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-green-950/40" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/70 text-sm">
                    <MapPin className="w-3.5 h-3.5" /> Mankessim, Central Region
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mb-8">
                {[
                  { label: "Available", cls: "bg-green-100 text-green-800" },
                  { label: "Reserved", cls: "bg-gold-100 text-yellow-800" },
                  { label: "Sold", cls: "bg-gray-100 text-gray-500" },
                ].map(l => (
                  <span key={l.label} className={`text-xs font-bold px-3 py-1 ${l.cls}`}>{l.label}</span>
                ))}
              </div>
            </AnimateIn>

            {/* Plot grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {ummisaeedaPlots.map((plot, i) => (
                <AnimateIn key={plot.id} delay={i * 0.04} direction="up">
                  <div className={`border p-5 flex flex-col gap-3 ${
                    plot.status === "available" ? "border-white/10 bg-white/5 hover:border-gold-400/50 hover:bg-white/8 transition-all" :
                    plot.status === "reserved"  ? "border-yellow-500/20 bg-yellow-500/5" :
                    "border-white/5 bg-white/3 opacity-50"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Plot</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 ${statusStyle[plot.status]}`}>
                        {plot.status.charAt(0).toUpperCase() + plot.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-white font-extrabold text-lg leading-none">{plot.id}</p>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs">
                      <Maximize2 className="w-3 h-3" />
                      {plot.size}
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                      <div className="flex items-center gap-1 text-white/40 text-xs">
                        <Tag className="w-3 h-3" />
                        {plot.type}
                      </div>
                      <span className="text-gold-400 font-extrabold text-sm">{plot.price}</span>
                    </div>

                    {plot.status === "available" && (
                      <Link href="/purchase"
                            className="mt-1 w-full text-center py-2 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-xs uppercase tracking-wider transition-colors">
                        Secure Plot
                      </Link>
                    )}
                  </div>
                </AnimateIn>
              ))}
            </div>

            {/* Note */}
            <AnimateIn delay={0.2}>
              <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/5 border border-white/10 p-8">
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
