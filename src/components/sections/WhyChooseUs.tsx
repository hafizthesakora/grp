import { CheckSquare } from "lucide-react";

const points = [
  "Every plot is pre-vetted with a Lands Commission search — zero disputes, zero stress before listing.",
  "We manage the entire documentation process remotely so you never need to be physically present.",
  "Success is not tied to chance. Our 6-step verification framework ensures a replicable, reliable process every time.",
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
        <div className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

          {/* LEFT — image block */}
          <div className="relative w-full lg:w-[45%] shrink-0">
            {/* Floating gold stat — matches Figma "20+" box */}
            <div className="absolute -top-6 right-0 lg:-right-6 z-10 bg-gold-400 p-8 text-center">
              <p className="font-extrabold text-green-950 leading-none" style={{ fontSize: "clamp(56px, 7vw, 93px)" }}>
                6
              </p>
              <p className="font-bold text-green-800 text-sm tracking-widest uppercase mt-2 max-w-[100px]">
                Verification<br />Checkpoints
              </p>
            </div>

            {/* Main image panel */}
            <div className="w-full h-[420px] lg:h-[580px] bg-green-900 rounded-sm overflow-hidden relative">
              {/* decorative gradient as stand-in for photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-900 to-green-950" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-gold-400 font-extrabold text-5xl leading-none">100%</p>
                <p className="text-white font-bold text-xl mt-2">Litigation-Free<br/>Guarantee</p>
                <p className="text-white/60 text-sm mt-2">Every plot legally verified before listing</p>
              </div>
            </div>
          </div>

          {/* RIGHT — content, matches Figma structure */}
          <div className="flex-1 pt-4 lg:pt-16">
            {/* Tag line */}
            <div className="flex items-center gap-2 mb-6">
              <span className="block w-6 h-px bg-gray-400" />
              <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">
                The Problem We Solve
              </span>
            </div>

            {/* Heading — matches Figma 46px bold */}
            <h2
              className="font-bold text-green-950 leading-tight mb-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 46px)" }}
            >
              Why Diaspora Land<br />Purchases Go Wrong
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              For buyers abroad, land ownership in Ghana has historically been fraught with risk —
              disputes, fraudulent sellers, and opaque processes.
              Golden Roots was built to fix exactly that.
            </p>

            {/* Bullet points — matches Figma box icon + text layout */}
            <div className="flex flex-col gap-7">
              {points.map((point, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckSquare className="w-7 h-7 text-gold-500 shrink-0 mt-0.5" />
                  <p className="text-green-950 text-lg leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            {/* Verification checklist */}
            <div className="mt-10 grid grid-cols-2 gap-3">
              {[
                "Lands Commission Search",
                "Family/Stool Consent",
                "Physical Boundary Check",
                "Gazetted Site Plan",
                "Indenture Preparation",
                "Barcode Generation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
