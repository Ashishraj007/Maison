import { useMemo, useState } from "react";
import { Search, Tag } from "lucide-react";
import { PHOTOS, SERVICE_CATEGORIES, SERVICES } from "../config/business";
import { href } from "../lib/router";
import PageHeader from "../components/PageHeader";
import ServiceCard from "../components/ServiceCard";
import CtaBand from "../components/sections/CtaBand";

export default function ServicesPage({ category }) {
  const active = SERVICE_CATEGORIES.some((c) => c.id === category) ? category : "all";
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const groups = useMemo(() =>
    SERVICE_CATEGORIES
      .filter((c) => active === "all" || c.id === active)
      .map((c) => ({
        ...c,
        items: SERVICES.filter((s) => s.cat === c.id && (!query || `${s.name} ${s.desc} ${c.name}`.toLowerCase().includes(query))),
      }))
      .filter((g) => g.items.length),
  [active, query]);

  return (
    <>
      <PageHeader eyebrow="Services · Kalkaji, New Delhi" title="Salon Services in Kalkaji" img={PHOTOS.salonBlack}
        sub="Women's hair, beauty and skincare, nails, men's grooming and home services at Hair by Parvej Kalkaji, near Nehru Enclave Metro Station." />

      {/* sticky filter bar */}
      <div className="sticky top-[68px] z-30 bg-stone/95 backdrop-blur border-b border-line">
        <div className="container-x py-3 flex flex-col md:flex-row gap-3 md:items-center justify-between">
          <nav className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0" aria-label="Service categories">
            <a href={href("/services")} className={`chip whitespace-nowrap ${active === "all" ? "chip-on" : ""}`}>All</a>
            {SERVICE_CATEGORIES.map((c) => (
              <a key={c.id} href={href(`/services/${c.id}`)} className={`chip whitespace-nowrap ${active === c.id ? "chip-on" : ""}`}>{c.name}</a>
            ))}
          </nav>
          <label className="relative md:w-64 shrink-0">
            <span className="sr-only">Search services</span>
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search e.g. colour, nails" className="field py-2.5 pl-10" type="search" />
          </label>
        </div>
      </div>

      <div className="container-x py-12 md:py-16">
        <p className="flex items-start gap-2 text-sm text-muted mb-10 max-w-2xl">
          <Tag size={16} className="text-gold-dark mt-0.5 shrink-0" />
          Prices are shared on consultation, as they depend on the service and your requirements. Tap "Enquire" to ask on WhatsApp.
        </p>

        {groups.length ? groups.map((g) => (
          <section key={g.id} className="mb-16 last:mb-0 fade-in" aria-labelledby={`cat-${g.id}`}>
            <div className="mb-6 max-w-2xl">
              <h2 id={`cat-${g.id}`} className="font-display text-3xl md:text-4xl font-semibold">{g.heading}</h2>
              <p className="text-muted mt-2">{g.intro}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {g.items.map((s) => <ServiceCard key={s.id} s={s} />)}
            </div>
          </section>
        )) : (
          <p className="text-muted py-16 text-center">No services match "{q}". Try "hair", "nails" or "men".</p>
        )}
      </div>
      <CtaBand />
    </>
  );
}
