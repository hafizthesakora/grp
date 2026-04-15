import Image from "next/image";

const team = [
  {
    name: "Fareeda Anderson",
    role: "Founder & CEO",
    bio: "Visionary leader driving the mission to provide accessible, transparent land ownership for the African diaspora.",
    photo: "/team/fareeda.jpg",
  },
  {
    name: "Mercy Buabeng",
    role: "Director of Operations",
    bio: "Oversees all operational processes ensuring every transaction meets the highest standards of due diligence.",
    photo: "/team/mercy.jpg",
  },
  {
    name: "Prudence Borbin",
    role: "Head of Diaspora Relations",
    bio: "Dedicated to building lasting relationships with diaspora clients across North America, Europe, and beyond.",
    photo: "/team/prudence.jpg",
  },
  {
    name: "Hafiz Toyyib",
    role: "Chief Innovation Officer",
    bio: "Leading the technology and innovation strategy that powers Golden Roots' modern approach to land ownership.",
    photo: "/team/hafiz.png",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="block w-6 h-px bg-gray-400" />
              <span className="text-gray-500 font-bold text-sm tracking-widest uppercase">Leadership</span>
            </div>
            <h2 className="font-bold text-green-950 leading-tight"
                style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              Meet the Team
            </h2>
          </div>
          <p className="text-gray-500 text-lg max-w-sm">
            Ghana-based professionals with deep expertise in real estate, operations, and diaspora relations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="group border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-shadow duration-300">
              {/* Photo */}
              <div className="relative bg-green-950 overflow-hidden" style={{ aspectRatio: "3/4" }}>
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-950">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-gold-400/40 flex items-center justify-center mb-4">
                      <span className="text-gold-400/50 text-3xl font-bold">?</span>
                    </div>
                    <span className="text-white/20 text-xs font-bold tracking-widest uppercase">Photo Coming Soon</span>
                  </div>
                )}
                {/* Gold accent bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </div>
              {/* Info */}
              <div className="p-6">
                <p className="text-green-950 font-bold text-lg leading-tight mb-1">{member.name}</p>
                <p className="text-gold-500 font-bold text-xs uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
