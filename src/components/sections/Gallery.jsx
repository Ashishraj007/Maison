import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { BUSINESS, GALLERY, GALLERY_FILTERS } from "../../config/business";
import { Photo } from "../ui";

const big = (url) => url.replace(/w=\d+/, "w=1800");

function Lightbox({ items, index, onClose, onMove }) {
  const item = items[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onMove]);

  const nav = "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center";
  return (
    <div className="fixed inset-0 z-[70] bg-ink/95 flex items-center justify-center p-4 fade-in" role="dialog" aria-modal="true" aria-label={item.label} onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 w-11 h-11 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center" aria-label="Close"><X size={22} /></button>
      <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <Photo src={big(item.img)} alt={item.label} eager fit="object-contain" className="w-full max-h-[78vh] rounded-xl" />
        <figcaption className="flex items-center justify-between mt-3 text-cream">
          <span className="font-display text-2xl">{item.label}</span>
          <span className="text-sm text-cream/60">{item.cat} · {index + 1} / {items.length}</span>
        </figcaption>
      </figure>
      {items.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onMove(-1); }} className={`${nav} left-3 md:left-6`} aria-label="Previous photo"><ChevronLeft /></button>
          <button onClick={(e) => { e.stopPropagation(); onMove(1); }} className={`${nav} right-3 md:right-6`} aria-label="Next photo"><ChevronRight /></button>
        </>
      )}
    </div>
  );
}

/* Masonry-style portfolio with filters + lightbox. `limit` shows a preview without filters. */
export default function Gallery({ limit, withFilters = true }) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);
  const list = GALLERY.filter((g) => filter === "All" || g.cat === filter).slice(0, limit || undefined);
  const move = useCallback((d) => setOpen((i) => (i + d + list.length) % list.length), [list.length]);
  const close = useCallback(() => setOpen(null), []);

  return (
    <div>
      {withFilters && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mb-8">
          {GALLERY_FILTERS.map((c) => (
            <button key={c} onClick={() => setFilter(c)} aria-pressed={filter === c} className={`chip whitespace-nowrap ${filter === c ? "chip-on" : ""}`}>{c}</button>
          ))}
        </div>
      )}
      <div className="columns-2 md:columns-3 gap-3 md:gap-4">
        {list.map((g, i) => (
          <button key={g.id} onClick={() => setOpen(i)} className="group img-zoom relative block w-full mb-3 md:mb-4 overflow-hidden rounded-xl break-inside-avoid text-left fade-in"
            aria-label={`Open photo: ${g.label}`}>
            <Photo src={g.img} alt={`${g.label}, ${g.cat} at ${BUSINESS.businessName}`} className={`w-full ${i % 3 === 0 ? "h-72 md:h-96" : i % 3 === 1 ? "h-52 md:h-64" : "h-60 md:h-80"}`} />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-90 md:opacity-0 md:group-hover:opacity-100 transition" />
            <span className="absolute left-3 bottom-3 right-3 flex items-end justify-between text-cream">
              <span>
                <span className="block eyebrow text-[9px] text-gold-light">{g.cat}</span>
                <span className="font-display text-lg leading-tight">{g.label}</span>
              </span>
              <Expand size={16} className="opacity-70 hidden md:block" />
            </span>
          </button>
        ))}
      </div>
      {open !== null && list[open] && <Lightbox items={list} index={open} onClose={close} onMove={move} />}
    </div>
  );
}
