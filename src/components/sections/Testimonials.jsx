import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, PenLine, Quote } from "lucide-react";
import { BUSINESS, REVIEWS } from "../../config/business";
import { writeReviewHref } from "../../lib/links";
import { DemoTag, SectionHead, Stars } from "../ui";

function ReviewCard({ r }) {
  return (
    <figure className="h-full rounded-2xl bg-coal border border-cream/10 p-6 md:p-7 flex flex-col">
      <div className="flex items-center justify-between gap-3">
        <Stars n={r.rating} size={15} />
        {r.isDemo && <DemoTag dark>Demo testimonial</DemoTag>}
      </div>
      <Quote size={26} className="text-gold/40 mt-5" />
      <blockquote className="font-display text-xl md:text-[1.4rem] leading-snug text-cream mt-2 flex-1">{r.text}</blockquote>
      <figcaption className="mt-6 pt-4 border-t border-cream/10 flex justify-between gap-3 text-sm">
        <span className="text-cream font-medium">{r.name}</span>
        <span className="text-cream/50">{r.service}</span>
      </figcaption>
    </figure>
  );
}

/* "Trusted by Our Clients": Google profile summary + swipeable testimonial carousel. */
export default function Testimonials({ layout = "carousel" }) {
  const track = useRef(null);
  const g = BUSINESS.google;
  const scroll = (dir) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  const hasDemo = REVIEWS.some((r) => r.isDemo);

  return (
    <section className="bg-ink text-cream py-20 md:py-24 overflow-hidden" aria-labelledby="trusted">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHead dark eyebrow="Reviews" title={<span id="trusted">Trusted by Our Clients</span>} className="mb-8" />
          <div className="rounded-2xl border border-gold/30 p-6 md:p-7 bg-gradient-to-br from-coal to-ink">
            <div className="flex items-end gap-3">
              <span className="font-display text-7xl font-semibold leading-none text-gold-light">{g.rating}</span>
              <span className="pb-2"><Stars n={5} size={18} /></span>
            </div>
            <p className="mt-3 text-lg">{g.reviewCount} Google Reviews</p>
            <p className="text-xs text-cream/50 mt-1">Source: {g.source}, {g.asOf}</p>
            <div className="grid gap-2 mt-6">
              <a href={BUSINESS.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold py-3 text-sm">View More Reviews <ArrowUpRight size={16} /></a>
              <a href={writeReviewHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light py-3 text-sm"><PenLine size={15} />Review Us on Google</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 min-w-0">
          {layout === "carousel" ? (
            <>
              <div ref={track} className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
                {REVIEWS.map((r) => (
                  <div key={r.id} className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-0.5rem)]"><ReviewCard r={r} /></div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-6">
                <p className="text-xs text-cream/50 max-w-sm">{hasDemo && "Demo testimonials show the layout only. Real Google reviews will replace them before launch."}</p>
                <div className="flex gap-2">
                  <button onClick={() => scroll(-1)} aria-label="Previous reviews" className="w-11 h-11 rounded-full border border-cream/25 flex items-center justify-center hover:border-gold hover:text-gold-light transition"><ChevronLeft size={20} /></button>
                  <button onClick={() => scroll(1)} aria-label="Next reviews" className="w-11 h-11 rounded-full border border-cream/25 flex items-center justify-center hover:border-gold hover:text-gold-light transition"><ChevronRight size={20} /></button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">{REVIEWS.map((r) => <ReviewCard key={r.id} r={r} />)}</div>
              {hasDemo && <p className="text-xs text-cream/50 mt-6">Demo testimonials show the layout only. Real Google reviews will replace them before launch.</p>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
