"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  { quote: "Golden Roots made what seemed like a daunting process incredibly smooth. Their team handled everything from verification to documentation.", name: "Kwame & Abena", location: "Accra, Ghana", initials: "KA" },
  { quote: "As someone living abroad, I was hesitant about buying land in Ghana. Golden Roots provided regular virtual tours and handled all paperwork remotely.", name: "Samuel O.", location: "New York, USA", initials: "SO" },
  { quote: "The transparency throughout the process was exceptional. I received my indenture and site plan within two weeks of purchase.", name: "Anita B.", location: "Accra, Ghana", initials: "AB" },
  { quote: "I purchased land as an investment for my children's future. The gated community is exactly as described — no surprises at all.", name: "Sarah Owusu", location: "London, UK", initials: "SO" },
  { quote: "The litigation-free guarantee gave me peace of mind. After hearing horror stories, I knew I needed a reputable company. Golden Roots delivered.", name: "David K.", location: "Toronto, Canada", initials: "DK" },
  { quote: "The payment plan option made it possible to invest without financial strain. I'm now building my retirement home in Winneba.", name: "Dr. Mensah", location: "Manchester, UK", initials: "DM" },
];

export default function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const total = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="testimonials" className="bg-green-950 py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">Testimonials</span>
            </div>
            <h2 className="font-bold text-white leading-tight"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              What Our Clients Say
            </h2>
          </div>
          {/* Pagination controls */}
          <div className="flex gap-3">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-12 h-12 rounded-sm bg-white/10 hover:bg-white/20 flex items-center justify-center text-white disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(total - 1, p + 1))}
              disabled={page === total - 1}
              className="w-12 h-12 rounded-sm bg-gold-400 hover:bg-gold-300 flex items-center justify-center text-green-950 disabled:opacity-30 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-8 flex flex-col gap-6 rounded-sm hover:border-gold-400/30 transition-colors"
            >
              <span className="text-gold-400 text-5xl font-serif leading-none">&ldquo;</span>
              <p className="text-white/80 text-base leading-relaxed flex-1">{t.quote}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center shrink-0">
                  <span className="text-gold-400 font-bold text-xs">{t.initials}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-8 justify-center">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all ${i === page ? "w-8 bg-gold-400" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
