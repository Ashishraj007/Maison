import { BUSINESS, PHOTOS, WHY_CHOOSE_US } from "../../config/business";
import { Icon } from "../icons";
import { Photo, Reveal, SectionHead } from "../ui";

export default function WhyChooseUs() {
  return (
    <section className="container-x py-20 md:py-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center" aria-labelledby="why-us">
      <div className="lg:col-span-5 relative">
        <Photo src={PHOTOS.salonBlack} alt={`Styling stations at ${BUSINESS.businessName}`} className="w-full h-80 md:h-[520px] rounded-2xl" />
        <div className="absolute -bottom-5 left-5 right-5 md:left-auto md:-right-6 md:w-64 bg-ink text-cream rounded-2xl p-5 border border-gold/30">
          <p className="eyebrow text-gold-light text-[10px]">{BUSINESS.type}</p>
          <p className="font-display text-2xl leading-tight mt-1.5">{BUSINESS.pillars.join(" • ")}</p>
        </div>
      </div>
      <div className="lg:col-span-7 pt-6 lg:pt-0">
        <SectionHead eyebrow="Why choose us" title={<span id="why-us">Why Choose {BUSINESS.businessName}</span>} />
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
          {WHY_CHOOSE_US.map((w) => (
            <Reveal key={w.title} className="flex gap-4">
              <span className="w-11 h-11 shrink-0 rounded-full bg-ink text-gold-light flex items-center justify-center">
                <Icon name={w.icon} size={19} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold leading-tight">{w.title}</h3>
                <p className="text-sm text-muted mt-1.5 leading-relaxed">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
