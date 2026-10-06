import { Calendar, Phone } from "lucide-react";
import { BUSINESS, PHOTOS } from "../../config/business";
import { href } from "../../lib/router";
import { CallLink, WhatsAppIcon, WhatsAppLink } from "../actions";
import { Photo } from "../ui";

export default function CtaBand() {
  return (
    <section className="relative bg-ink text-cream overflow-hidden">
      <Photo src={PHOTOS.salonModern} alt="" className="absolute inset-0 w-full h-full opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/60" />
      <div className="relative container-x py-20 md:py-24 text-center">
        <p className="eyebrow text-gold-light">{BUSINESS.businessName}</p>
        <h2 className="font-display text-4xl md:text-6xl font-semibold mt-4 leading-tight">Ready for your next look?</h2>
        <p className="text-cream/70 mt-4 max-w-xl mx-auto">Book online in under a minute, or message us on WhatsApp for pricing and availability.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-9">
          <a href={href("/book")} className="btn btn-gold px-8 py-3.5"><Calendar size={18} />Book Appointment</a>
          <WhatsAppLink className="btn btn-wa px-8 py-3.5"><WhatsAppIcon size={18} />WhatsApp Us</WhatsAppLink>
          <CallLink className="btn btn-outline-light px-8 py-3.5"><Phone size={18} />Call Now</CallLink>
        </div>
      </div>
    </section>
  );
}
