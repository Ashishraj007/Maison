import { Clock, Tag } from "lucide-react";
import { SERVICE_CATEGORIES } from "../config/business";
import { href } from "../lib/router";
import { serviceMessage } from "../lib/links";
import { EditableHint, Photo } from "./ui";
import { WhatsAppIcon, WhatsAppLink } from "./actions";

/* Compact horizontal card on phones (easy to scan), image-on-top card from sm upwards. */
export default function ServiceCard({ s }) {
  const cat = SERVICE_CATEGORIES.find((c) => c.id === s.cat);
  return (
    <article className="card overflow-hidden flex flex-col h-full transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(15,14,13,.55)]">
      <div className="flex sm:flex-col flex-1">
        <div className="img-zoom overflow-hidden w-28 xs:w-32 shrink-0 sm:w-full sm:h-48">
          <Photo src={s.img} alt={`${s.name} at Hair by Parvej Kalkaji`} className="w-full h-full" />
        </div>
        <div className="p-4 sm:p-5 flex flex-col flex-1 min-w-0">
          <p className="eyebrow text-gold-dark text-[10px]">{cat?.name}</p>
          <h3 className="font-display text-[1.6rem] sm:text-[1.75rem] font-semibold leading-tight mt-1">{s.name}</h3>
          <p className="text-sm text-muted mt-1.5 leading-relaxed line-clamp-3 sm:line-clamp-none flex-1">{s.desc}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm">
            <span className="flex items-center gap-1.5 text-ink font-medium">
              <Tag size={14} className="text-gold-dark" />{s.price || "Price on consultation"}
            </span>
            {s.duration && <span className="flex items-center gap-1.5 text-muted"><Clock size={14} />{s.duration}</span>}
          </div>
          {s.confirm && <EditableHint className="mt-3 self-start">{s.confirm}</EditableHint>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 px-4 pb-4 sm:px-5 sm:pb-5">
        <a href={href(`/book/${s.id}`)} className="btn btn-dark py-2.5 text-sm">Book Now</a>
        <WhatsAppLink message={serviceMessage(s.name)} aria-label={`WhatsApp enquiry about ${s.name}`} className="btn border border-wa/40 text-wa-dark hover:bg-wa hover:text-white py-2.5 text-sm">
          <WhatsAppIcon size={15} />Enquire
        </WhatsAppLink>
      </div>
    </article>
  );
}
