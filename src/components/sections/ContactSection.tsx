import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-green-950 py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="block w-6 h-px bg-gold-400/50" />
            <span className="text-gold-400/80 font-bold text-sm tracking-widest uppercase">Get in Touch</span>
          </div>
          <h2 className="font-bold text-white leading-tight"
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
            Start Your Journey
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <div className="flex flex-col gap-6">
            {[
              { icon: Mail, label: "Email", value: "goldenrootssocial@gmail.com", href: "mailto:goldenrootssocial@gmail.com" },
              { icon: Phone, label: "International / WhatsApp", value: "+1 248-210-8333", href: "https://wa.me/12482108333" },
              { icon: Phone, label: "Ghana Line", value: "+233 54-083-9298", href: "tel:+233540839298" },
              { icon: MapPin, label: "Location", value: "Central Region, Ghana", href: undefined },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center shrink-0">
                  <c.icon className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider font-bold mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                       className="text-white font-semibold hover:text-gold-400 transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-white font-semibold">{c.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4 bg-gold-400 p-8">
              <p className="text-green-950 font-bold text-xl mb-2">Book a Free Consultation</p>
              <p className="text-green-800 text-sm mb-6">30-minute call with our team — no commitment required.</p>
              <a
                href="https://calendly.com/goldenrootspropertiesgh/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-950 hover:bg-green-900 text-white font-bold text-sm px-3 pr-5 py-2.5 rounded transition-colors"
              >
                <span className="bg-gold-400 w-7 h-7 flex items-center justify-center rounded-sm">
                  <ArrowRight className="w-3.5 h-3.5 text-green-950" />
                </span>
                Book on Calendly
              </a>
            </div>
          </div>

          {/* Right — enquiry form */}
          <div className="bg-white/5 border border-white/10 p-8">
            <p className="text-white font-bold text-xl mb-6">Send an Enquiry</p>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">First Name</label>
                  <input type="text" placeholder="John"
                         className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Last Name</label>
                  <input type="text" placeholder="Mensah"
                         className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50" />
                </div>
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Email</label>
                <input type="email" placeholder="your@email.com"
                       className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50" />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Land Interest</label>
                <select className="w-full bg-white/10 border border-white/10 text-white/70 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50">
                  <option value="" className="bg-green-950">Select a land type...</option>
                  <option className="bg-green-950">Residential Land</option>
                  <option className="bg-green-950">Agro-Industrial Land</option>
                  <option className="bg-green-950">Beach Land</option>
                  <option className="bg-green-950">Off-Market Opportunity</option>
                </select>
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider font-bold block mb-2">Message</label>
                <textarea rows={4} placeholder="Tell us about your goals and requirements..."
                          className="w-full bg-white/10 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold-400/50 resize-none" />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 bg-gold-400 hover:bg-gold-300 text-green-950 font-bold py-3.5 transition-colors mt-2"
              >
                <span className="bg-white w-7 h-7 flex items-center justify-center rounded-sm">
                  <ArrowRight className="w-3.5 h-3.5 text-green-900" />
                </span>
                Send Enquiry
              </button>
              <p className="text-white/30 text-xs text-center">We respond within 24 hours · Your data is kept confidential</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
