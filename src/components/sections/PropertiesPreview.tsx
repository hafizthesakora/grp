import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import { MapPin, ArrowRight, Maximize2 } from "lucide-react";

const listings = [
  {
    id: "residential",
    type: "Residential Land",
    tag: "Most Popular",
    tagColor: "bg-gold-400 text-green-950",
    location: "Central Region, Ghana",
    plotSize: "80 × 80 ft",
    minPurchase: "1 plot",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    description: "Plots in secure, planned communities — ideal for building your home or securing a long-term investment.",
    href: "/properties#residential",
  },
  {
    id: "agro-industrial",
    type: "Agro-Industrial Land",
    tag: "High ROI",
    tagColor: "bg-green-500 text-white",
    location: "Central Region, Ghana",
    plotSize: "1 acre (6 plots)",
    minPurchase: "5 acres",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    description: "Prime farmland and commercial land for agribusiness and large-scale development.",
    href: "/properties#agro-industrial",
  },
  {
    id: "beach",
    type: "Beach Land",
    tag: "Premium",
    tagColor: "bg-gold-500 text-white",
    location: "Central Region Coastline",
    plotSize: "80 × 80 ft",
    minPurchase: "1 plot",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    description: "Beachfront plots with exceptional appreciation potential along Ghana's Atlantic coastline.",
    href: "/properties#beach",
  },
];

export default function PropertiesPreview() {
  return (
    <section id="properties" className="bg-white py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <AnimateIn>
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gray-400" />
              <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Our Listings</span>
            </div>
            <h2 className="font-bold text-green-950 leading-tight"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Land Available<br />
              <span className="text-green-700">Across Our Estates</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Link href="/properties"
                  className="shrink-0 inline-flex items-center gap-3 bg-green-900 hover:bg-green-800 text-white font-bold text-base px-3 pr-6 py-3 transition-colors">
              <span className="bg-gold-400 w-8 h-8 flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-green-950" />
              </span>
              View All Properties
            </Link>
          </AnimateIn>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((p, i) => (
            <AnimateIn key={p.id} delay={i * 0.1} direction="up">
              <div className="group flex flex-col border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 overflow-hidden">

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.type}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 to-transparent" />

                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 ${p.tagColor}`}>
                    {p.tag}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl leading-snug">{p.type}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {p.location}
                  </div>

                  <div className="flex gap-6 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-3.5 h-3.5 text-green-600" />
                      <div>
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Plot Size</p>
                        <p className="text-green-950 font-bold text-sm">{p.plotSize}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">Min. Purchase</p>
                      <p className="text-green-950 font-bold text-sm">{p.minPurchase}</p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{p.description}</p>

                  <Link
                    href={p.href}
                    className="flex items-center justify-between text-green-900 hover:text-gold-600 font-bold text-sm transition-colors group/link"
                  >
                    View Details &amp; Enquire
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Off-market bar */}
        <AnimateIn delay={0.2}>
          <div className="mt-8 bg-green-950 flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6">
            <div>
              <p className="text-white font-bold text-lg">Off-Market Opportunities</p>
              <p className="text-white/50 text-sm">Exclusive unlisted plots for buyers with specific requirements</p>
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
  );
}
