import { useState } from "react";
import { Calendar, ChevronsLeftRight } from "lucide-react";
import { BEFORE_AFTER } from "../../config/business";
import { href } from "../../lib/router";
import { DemoTag, Photo, SectionHead } from "../ui";

/* Drag / keyboard comparison slider. Images come from BEFORE_AFTER in the config. */
function CompareSlider({ item }) {
  const [pos, setPos] = useState(50);
  const illustrative = !item.before;
  // No real "before" photo yet: show a toned-down copy of the after photo, labelled as illustrative.
  const beforeStyle = illustrative ? { filter: "grayscale(.9) brightness(.82) contrast(.85) blur(.4px)" } : undefined;
  return (
    <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/3] rounded-2xl overflow-hidden select-none bg-coal">
      <Photo src={item.after} alt={`${item.title}, after`} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo src={item.before || item.after} alt={`${item.title}, before`} className="absolute inset-0 w-full h-full" style={beforeStyle} />
      </div>

      <span className="absolute top-3 left-3 rounded-full bg-ink/80 text-cream text-xs px-3 py-1 uppercase tracking-wider">Before</span>
      <span className="absolute top-3 right-3 rounded-full bg-gold text-ink text-xs px-3 py-1 uppercase tracking-wider font-medium">After</span>

      <div className="absolute inset-y-0 w-0.5 bg-cream pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream text-ink flex items-center justify-center shadow-xl">
          <ChevronsLeftRight size={20} />
        </span>
      </div>
      <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after: ${item.title}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" />

      {illustrative && (
        <DemoTag dark className="absolute bottom-3 left-3 bg-ink/80">Illustrative. Real client photos to be added</DemoTag>
      )}
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(BEFORE_AFTER[0].id);
  const item = BEFORE_AFTER.find((b) => b.id === active);
  return (
    <section className="bg-coal text-cream py-20 md:py-24" aria-labelledby="transformations">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-5">
          <SectionHead dark eyebrow="Before → After" title={<span id="transformations">See The Transformation</span>}
            sub="Drag the slider to compare. This is where real haircut, hair colour, styling and treatment transformations from our salon will be shown." className="mb-8" />
          <div className="flex flex-wrap gap-2">
            {BEFORE_AFTER.map((b) => (
              <button key={b.id} aria-pressed={active === b.id} onClick={() => setActive(b.id)}
                className={`rounded-full px-4 py-2 text-sm border transition ${active === b.id ? "bg-gold border-gold text-ink" : "border-cream/25 text-cream/80 hover:border-cream/60"}`}>
                {b.label}
              </button>
            ))}
          </div>
          <a href={href("/book")} className="btn btn-gold px-6 py-3 mt-8"><Calendar size={17} />Book Your Transformation</a>
        </div>
        <div className="lg:col-span-7">
          <CompareSlider key={item.id} item={item} />
          <p className="font-display text-2xl mt-4">{item.title}</p>
        </div>
      </div>
    </section>
  );
}
