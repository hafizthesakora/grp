const team = [
  {
    name: "Fareeda Anderson",
    role: "Founder & CEO",
    initials: "FA",
    bio: "Visionary leader driving the mission to provide accessible, transparent land ownership for the African diaspora.",
    color: "bg-gold-400",
    textColor: "text-green-950",
  },
  {
    name: "Mercy Buabeng",
    role: "Director of Operations",
    initials: "MB",
    bio: "Oversees all operational processes ensuring every transaction meets the highest standards of due diligence.",
    color: "bg-green-700",
    textColor: "text-white",
  },
  {
    name: "Prudence Borbin",
    role: "Head of Diaspora Relations",
    initials: "PB",
    bio: "Dedicated to building lasting relationships with diaspora clients across North America, Europe, and beyond.",
    color: "bg-green-800",
    textColor: "text-white",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name} className="group border border-gray-100 rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
              {/* Color block with initials */}
              <div className={`${member.color} h-48 flex items-center justify-center relative`}>
                <span className={`font-extrabold text-6xl ${member.textColor} opacity-30`}>{member.initials}</span>
                <div className={`absolute bottom-6 right-6 w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center`}>
                  <span className={`font-bold text-lg ${member.textColor}`}>{member.initials}</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-7">
                <p className="text-green-950 font-bold text-xl mb-1">{member.name}</p>
                <p className="text-gold-500 font-bold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
