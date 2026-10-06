import { Calendar, MapPin, Phone, TrainFront } from "lucide-react";
import { BUSINESS, PHOTOS } from "../../config/business";
import { href } from "../../lib/router";
import { Photo, Stars } from "../ui";
import { CallLink, WhatsAppIcon, WhatsAppLink } from "../actions";

export default function Hero() {
  const g = BUSINESS.google;
  return (
    <section className="relative bg-ink text-cream overflow-hidden">
      {/* imagery: full-bleed behind text on mobile, right column on desktop */}
      <div className="absolute inset-0 lg:left-auto lg:w-[48%]">
        <Photo src={PHOTOS.heroStyling} alt="Hair styling at Hair by Parvej Kalkaji" eager className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink lg:bg-gradient-to-r lg:from-ink lg:via-ink/20 lg:to-transparent" />
      </div>

      <div className="relative container-x pt-12 pb-14 sm:pt-16 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl lg:max-w-[52%] fade-in">
          <a href={href("/reviews")} className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-ink/60 px-3.5 py-1.5 text-sm hover:border-gold transition">
            <Stars n={5} size={13} className="text-gold" />
            <span><b className="font-semibold">{g.rating} ★</b><span className="text-cream/50 mx-1.5">|</span>{g.reviewCount} Google Reviews</span>
          </a>

          <p className="eyebrow text-gold-light mt-7">{BUSINESS.type} · {BUSINESS.locality}</p>
          <h1 className="font-display font-semibold leading-[0.95] mt-3 text-[3.4rem] xs:text-6xl sm:text-7xl xl:text-8xl">
            {BUSINESS.brandLine1}
            <span className="block italic font-medium text-gold-light">{BUSINESS.brandLine2}</span>
          </h1>

          <p className="font-display text-2xl sm:text-3xl mt-6 text-cream">Your Hair. Your Style. Your Confidence.</p>
          <p className="mt-3 text-cream/70 text-base sm:text-lg leading-relaxed max-w-xl">
            Professional hair, beauty and grooming services for women and men in Kalkaji, New Delhi.
          </p>

          <div className="flex flex-col xs:flex-row gap-3 mt-8">
            <a href={href("/book")} className="btn btn-gold px-7 py-3.5 text-base"><Calendar size={18} />Book Appointment</a>
            <WhatsAppLink className="btn btn-wa px-7 py-3.5 text-base"><WhatsAppIcon size={18} />WhatsApp Us</WhatsAppLink>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-sm text-cream/75">
            <span className="flex items-center gap-1.5"><MapPin size={16} className="text-gold" />Kalkaji, New Delhi</span>
            <span className="flex items-center gap-1.5"><TrainFront size={16} className="text-gold" />Gate-5, {BUSINESS.landmark}</span>
            <CallLink className="flex items-center gap-1.5 hover:text-gold-light"><Phone size={16} className="text-gold" />Call Now</CallLink>
          </div>
        </div>

        {/* desktop accent: men's grooming + rating card, signals "unisex" at a glance */}
        <div className="hidden lg:block absolute right-6 xl:right-10 bottom-10 w-60">
          <div className="rounded-2xl overflow-hidden border border-cream/15 shadow-2xl">
            <Photo src={PHOTOS.heroMen} alt="Men's haircut and styling" eager className="w-full h-44" />
            <div className="bg-ink/95 px-4 py-3">
              <p className="eyebrow text-gold-light text-[10px]">Women · Men</p>
              <p className="font-display text-xl leading-tight mt-1">Hair, beauty & grooming under one roof</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-cream/10 bg-ink">
        <div className="container-x py-4 flex items-center justify-center gap-3 sm:gap-6 font-display text-lg sm:text-2xl tracking-wide text-cream/85">
          {BUSINESS.pillars.map((p, i) => (
            <span key={p} className="flex items-center gap-3 sm:gap-6">
              {i > 0 && <span className="text-gold text-sm" aria-hidden="true">◆</span>}{p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
