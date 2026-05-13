const PHRASES = [
  "HAUTE COUTURE",
  "THE DEVIL WEARS PRADA II",
  "PREMIÈRE EXCLUSIVA",
  "MIRANDA PRIESTLY",
  "RUNWAY READY",
  "CERÚLEO",
  "THAT'S ALL",
  "FASHION WEEK",
  "VOGUE",
  "PRADA",
  "EL DIABLO VISTE A LA MODA",
  "TEMPORADA 2026",
];

export default function Ticker() {
  const items = [...PHRASES, ...PHRASES];
  return (
    <div className="border-t border-black overflow-hidden py-3 shrink-0 bg-white">
      <div className="anim-ticker whitespace-nowrap">
        {items.map((p, i) => (
          <span
            key={i}
            className="font-sans text-[9px] tracking-[0.4em] text-stone-400 mr-6"
          >
            {p}
            <span className="text-[#E60000] ml-6">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
