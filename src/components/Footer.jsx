import { Facebook, Instagram, MapPin, Navigation, Phone, Youtube } from "lucide-react";
import { BUSINESS, DEMO } from "../config/business";
import { href } from "../lib/router";
import Logo from "./Logo";
import { CallLink, WhatsAppIcon, WhatsAppLink } from "./actions";

const QUICK_LINKS = [
  ["/services", "Services"], ["/gallery", "Gallery"], ["/reviews", "Reviews"],
  ["/book", "Book Appointment"], ["/contact", "Contact"],
];
const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, youtube: Youtube };

export default function Footer() {
  const socials = Object.entries(BUSINESS.socialLinks).filter(([, url]) => url);
  const link = "flex items-center gap-2.5 text-cream/70 hover:text-gold-light transition";
  return (
    <footer className="bg-ink text-cream pt-16 pb-28 md:pb-12">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo size="lg" />
          <p className="mt-5 text-cream/70">{BUSINESS.type} · {BUSINESS.pillars.join(" • ")}</p>
          <p className="mt-3 flex gap-2 text-cream/70"><MapPin size={17} className="text-gold shrink-0 mt-0.5" />
            <span>{BUSINESS.locality}<br /><span className="text-sm text-cream/50">{BUSINESS.address.lines.join(" ")}</span></span>
          </p>
          <a href={href("/book")} className="btn btn-gold px-6 py-3 mt-7">Book Appointment</a>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-gold-light mb-4">Quick Links</p>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map(([to, label]) => <li key={to}><a href={href(to)} className={link}>{label}</a></li>)}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-gold-light mb-4">Get in touch</p>
          <ul className="space-y-3">
            <li><WhatsAppLink className={link}><WhatsAppIcon size={17} />WhatsApp</WhatsAppLink></li>
            <li><CallLink className={link}><Phone size={17} />{BUSINESS.phone || "Call"}</CallLink></li>
            <li><a href={BUSINESS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={link}><Navigation size={17} />Google Maps</a></li>
          </ul>
          {socials.length > 0 && (
            <div className="flex gap-2 mt-6">
              {socials.map(([key, url]) => {
                const I = SOCIAL_ICONS[key];
                return (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}
                    className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold-light transition">
                    {I && <I size={17} />}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="container-x mt-14 pt-6 border-t border-cream/10 text-xs text-cream/50 flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} {BUSINESS.businessName}. All rights reserved.</span>
        {DEMO.showDemoBar && <span>Website design proposal by <a href={DEMO.agencyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-light">{DEMO.agency}</a></span>}
      </div>
    </footer>
  );
}
