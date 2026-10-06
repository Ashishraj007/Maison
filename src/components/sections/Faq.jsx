import { Plus } from "lucide-react";
import { FAQS } from "../../config/business";
import { SectionHead } from "../ui";

export default function Faq() {
  return (
    <section className="bg-sand py-20 md:py-24" aria-labelledby="faq">
      <div className="container-x grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="FAQ" title={<span id="faq">Questions about our Kalkaji salon</span>} />
        </div>
        <div className="lg:col-span-8 divide-y divide-line border-y border-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-xl md:text-2xl font-semibold">{f.q}</h3>
                <Plus size={20} className="shrink-0 text-gold-dark transition group-open:rotate-45" />
              </summary>
              <p className="text-muted mt-3 leading-relaxed max-w-2xl">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
