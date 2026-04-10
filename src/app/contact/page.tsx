import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, ArrowRight, ExternalLink, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-green-950 pt-52 pb-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gold-400/50" />
              <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">Get in Touch</span>
            </div>
            <h1 className="font-bold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
              Start Your Journey
            </h1>
            <p className="text-white/60 text-lg max-w-xl">
              We welcome enquiries from individuals and institutional investors.
              Our team responds within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact grid */}
        <section className="bg-white py-20">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
            <div className="grid lg:grid-cols-5 gap-10">

              {/* Left — info */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {[
                  { icon: Mail, label: "Email", value: "goldenrootssocial@gmail.com", href: "mailto:goldenrootssocial@gmail.com" },
                  { icon: Phone, label: "International / WhatsApp", value: "+1 248-210-8333", href: "https://wa.me/12482108333" },
                  { icon: Phone, label: "Ghana Line", value: "+233 54-083-9298", href: "tel:+233540839298" },
                  { icon: MapPin, label: "Location", value: "Central Region, Ghana", href: undefined },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-5 border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                    <div className="w-12 h-12 bg-green-950 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                           rel="noopener noreferrer"
                           className="text-green-950 font-semibold hover:text-gold-500 transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-green-950 font-semibold">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Calendly block */}
                <div className="bg-gold-400 p-7">
                  <div className="flex items-center gap-2 mb-3">
                    <ExternalLink className="w-4 h-4 text-green-950" />
                    <p className="text-green-950 font-bold">Book a Free Consultation</p>
                  </div>
                  <p className="text-green-800 text-sm mb-5">
                    30-minute call with our team. Discuss your goals, land options, and any questions — no commitment required.
                  </p>
                  <a href="https://calendly.com/goldenrootspropertiesgh/30min" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold text-sm px-3 pr-5 py-2.5 transition-colors">
                    <span className="bg-gold-400 w-7 h-7 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-green-950" />
                    </span>
                    Book on Calendly
                  </a>
                </div>

                {/* WhatsApp block */}
                <div className="bg-green-950 p-7 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-bold mb-1">Chat on WhatsApp</p>
                    <p className="text-white/40 text-sm">Our fastest response channel</p>
                  </div>
                  <a href="https://wa.me/12482108333" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold text-sm px-4 py-2.5 transition-colors shrink-0">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Right — form */}
              <div className="lg:col-span-3 border border-gray-100 p-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="block w-6 h-px bg-gray-400" />
                  <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Send an Enquiry</span>
                </div>
                <form className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">First Name</label>
                      <input type="text" placeholder="John"
                             className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors" />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Last Name</label>
                      <input type="text" placeholder="Mensah"
                             className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Email Address</label>
                    <input type="email" placeholder="your@email.com"
                           className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Phone / WhatsApp</label>
                    <input type="tel" placeholder="+1 234 567 8900"
                           className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Land Interest</label>
                    <select className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors bg-white">
                      <option value="">Select a land type...</option>
                      <option>Residential Land</option>
                      <option>Agro-Industrial Land</option>
                      <option>Beach Land</option>
                      <option>Off-Market Opportunity</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider font-bold block mb-2">Message</label>
                    <textarea rows={5} placeholder="Tell us about your goals, budget, and any specific requirements..."
                              className="w-full border border-gray-200 px-4 py-3 text-sm text-green-950 focus:outline-none focus:border-gold-400 transition-colors resize-none" />
                  </div>
                  <button type="submit"
                          className="inline-flex items-center justify-center gap-3 bg-green-950 hover:bg-green-800 text-white font-bold py-4 transition-colors">
                    <span className="bg-gold-400 w-7 h-7 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-green-950" />
                    </span>
                    Send Enquiry
                  </button>
                  <p className="text-gray-400 text-xs text-center">
                    We respond within 24 hours · Your information is kept confidential
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
