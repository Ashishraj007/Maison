import { ArrowRight } from "lucide-react";
import { BUSINESS, WHAT_WILL_CHANGE } from "../../config/business";
import { Icon } from "../icons";
import { Reveal } from "../ui";

/* Proposal section for the client presentation (toggle with DEMO.showProposalOnHome). */
export default function WhatWillChange({ showLabel = true }) {
  return (
    <section className="relative bg-ink text-cream py-20 md:py-28 overflow-hidden" aria-labelledby="what-changes">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(#C4A062 1px, transparent 1px), linear-gradient(90deg, #C4A062 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      <div className="relative container-x">
        {showLabel && <p className="eyebrow text-gold-light mb-3">Proposal for {BUSINESS.businessName}</p>}
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-12">
          <h2 id="what-changes" className="lg:col-span-7 font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
            What Will Change With Your <span className="italic text-gold-light">New Website?</span>
          </h2>
          <p className="lg:col-span-5 text-cream/70 md:text-lg leading-relaxed">
            Your Google profile already shows customers trust you. The new website turns that trust into bookings.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10 rounded-2xl overflow-hidden border border-cream/10">
          {WHAT_WILL_CHANGE.map((c, i) => (
            <Reveal as="li" key={c.to} className="bg-ink p-6 md:p-7 flex flex-col group hover:bg-coal transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-gold/50 group-hover:text-gold transition-colors">{String(i + 1).padStart(2, "0")}</span>
                <span className="w-10 h-10 rounded-full border border-gold/40 text-gold-light flex items-center justify-center"><Icon name={c.icon} size={18} /></span>
              </div>
              <p className="mt-8 text-sm text-cream/45 line-through decoration-cream/30">{c.from}</p>
              <ArrowRight size={16} className="text-gold my-2" />
              <p className="font-display text-2xl leading-tight font-semibold">{c.to}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
