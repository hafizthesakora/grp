const items = [
  { value: "100%", label: "Litigation-Free Guarantee" },
  { value: "3", label: "Land Categories" },
  { value: "5-Step", label: "Buying Process" },
  { value: "6", label: "Verification Checkpoints" },
  { value: "DHL", label: "Document Delivery" },
];

// Triple the items so the loop is perfectly seamless
const ticker = [...items, ...items, ...items];

export default function StatsBar() {
  return (
    <div className="bg-gold-400 overflow-hidden py-3 select-none">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {ticker.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2.5 px-10 shrink-0">
            <span className="font-extrabold text-green-950 text-xl leading-none">{item.value}</span>
            <span className="text-green-900 text-sm font-bold uppercase tracking-widest leading-none">{item.label}</span>
            <span className="text-green-900/25 font-bold ml-2">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
