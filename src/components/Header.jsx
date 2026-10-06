import { useEffect, useState } from "react";
import { Calendar, Menu, Phone, X } from "lucide-react";
import { BUSINESS } from "../config/business";
import { href } from "../lib/router";
import Logo from "./Logo";
import { CallLink, WhatsAppIcon, WhatsAppLink } from "./actions";

export const NAV = [
  ["home", "/", "Home"],
  ["services", "/services", "Services"],
  ["gallery", "/gallery", "Gallery"],
  ["reviews", "/reviews", "Reviews"],
  ["about", "/about", "About"],
  ["contact", "/contact", "Contact"],
];

export default function Header({ page }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [page]);

  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur border-b border-cream/10">
      <div className="container-x h-[68px] flex items-center justify-between gap-4">
        <a href={href("/")} aria-label={`${BUSINESS.businessName}, home`}><Logo /></a>

        <nav className="hidden lg:flex items-center gap-7 text-sm" aria-label="Main">
          {NAV.map(([id, to, label]) => (
            <a key={id} href={href(to)} aria-current={page === id ? "page" : undefined}
              className={`relative py-1 transition ${page === id ? "text-gold-light" : "text-cream/75 hover:text-cream"}`}>
              {label}
              {page === id && <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={href("/book")} className="btn btn-gold px-3.5 py-2.5 text-[13px] sm:text-sm sm:px-4 lg:px-5">
            <Calendar size={16} className="hidden sm:block" />
            <span className="lg:hidden">Book Now</span>
            <span className="hidden lg:inline">Book Appointment</span>
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 -mr-2 text-cream" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-cream/10 bg-ink fade-in">
          <nav className="container-x py-2" aria-label="Mobile">
            {NAV.map(([id, to, label]) => (
              <a key={id} href={href(to)} className={`flex items-center justify-between py-3.5 border-b border-cream/10 font-display text-2xl ${page === id ? "text-gold-light" : "text-cream"}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="container-x pb-5 pt-2 grid grid-cols-2 gap-2">
            <CallLink className="btn btn-outline-light py-3 text-sm"><Phone size={16} />Call Now</CallLink>
            <WhatsAppLink className="btn btn-wa py-3 text-sm"><WhatsAppIcon size={16} />WhatsApp</WhatsAppLink>
          </div>
        </div>
      )}
    </header>
  );
}
