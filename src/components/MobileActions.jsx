import { Calendar, Phone } from "lucide-react";
import { href } from "../lib/router";
import { CallLink, WhatsAppIcon, WhatsAppLink } from "./actions";

/* Floating "Chat on WhatsApp" on desktop + sticky [WhatsApp] [Call] [Book Now] bar on mobile. */
export default function MobileActions({ hideBar }) {
  return (
    <>
      <WhatsAppLink aria-label="Chat on WhatsApp"
        className="hidden md:flex fixed right-6 bottom-6 z-40 items-center gap-2 rounded-full bg-wa text-white pl-4 pr-5 py-3 shadow-[0_12px_30px_-10px_rgba(31,175,90,.7)] hover:bg-wa-dark transition hover:-translate-y-0.5">
        <WhatsAppIcon size={22} /><span className="text-sm font-medium">Chat on WhatsApp</span>
      </WhatsAppLink>

      {!hideBar && (
        <nav aria-label="Quick actions" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ink border-t border-cream/10 grid grid-cols-3 text-[13px] font-medium"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <WhatsAppLink className="flex flex-col items-center gap-1 py-2.5 text-[#4ADE80]"><WhatsAppIcon size={20} />WhatsApp</WhatsAppLink>
          <CallLink className="flex flex-col items-center gap-1 py-2.5 text-cream"><Phone size={20} />Call</CallLink>
          <a href={href("/book")} className="flex flex-col items-center gap-1 py-2.5 bg-gold text-ink"><Calendar size={20} />Book Now</a>
        </nav>
      )}
    </>
  );
}
