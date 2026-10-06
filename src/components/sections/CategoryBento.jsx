import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES, SERVICES } from "../../config/business";
import { href } from "../../lib/router";
import { Photo, Reveal, SectionHead } from "../ui";

// Bento layout spans for the 5 categories (desktop)
const SPANS = ["md:col-span-3 md:row-span-2", "md:col-span-3", "md:col-span-3", "md:col-span-4", "md:col-span-2"];

export default function CategoryBento() {
  return (
    <section className="container-x py-20 md:py-24" aria-labelledby="services-overview">
      <SectionHead
        eyebrow="Services"
        title={<span id="services-overview">Hair, Beauty & Grooming Services in Kalkaji</span>}
        sub="Everything from haircuts, hair colour and treatments to makeup, nails, men's grooming and home services."
      />
      <div className="grid md:grid-cols-6 md:auto-rows-[260px] gap-4">
        {SERVICE_CATEGORIES.map((c, i) => {
          const items = SERVICES.filter((s) => s.cat === c.id);
          return (
            <Reveal key={c.id} className={`${SPANS[i] || "md:col-span-2"}`}>
              <a href={href(`/services/${c.id}`)} className="group img-zoom relative block h-64 md:h-full rounded-2xl overflow-hidden bg-ink">
                <Photo src={c.img} alt={`${c.name} at Hair by Parvej Kalkaji`} className="absolute inset-0 w-full h-full opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-cream">
                  <h3 className="font-display text-3xl md:text-4xl font-semibold">{c.name}</h3>
                  <p className="text-sm text-cream/75 mt-1.5">
                    {items.slice(0, 5).map((s) => s.name).join(" · ")}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-gold-light mt-3 group-hover:gap-2.5 transition-all">
                    Explore {c.name} <ArrowRight size={15} />
                  </span>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
