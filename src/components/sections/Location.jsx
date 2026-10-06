import { useState } from "react";
import { Clock, MapPin, Navigation, Phone, TrainFront, ArrowUpRight } from "lucide-react";
import { BUSINESS } from "../../config/business";
import { CallLink, WhatsAppIcon, WhatsAppLink } from "../actions";
import { EditableHint, SectionHead } from "../ui";

function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative h-full min-h-[340px] md:min-h-[460px] rounded-2xl overflow-hidden bg-sand border border-line">
      {/* placeholder visible until the map loads (or if it can't) */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6" aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,.6) 2px, transparent 2px), linear-gradient(rgba(255,255,255,.6) 2px, transparent 2px)", backgroundSize: "56px 56px" }}>
          <MapPin size={40} className="text-ink" fill="#C4A062" />
          <p className="font-display text-2xl mt-2">{BUSINESS.businessName}</p>
          <p className="text-sm text-muted">Gate-5, {BUSINESS.landmark}</p>
        </div>
      )}
      <iframe title={`Map showing ${BUSINESS.businessName}, Kalkaji`} src={BUSINESS.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)} className="absolute inset-0 w-full h-full border-0" style={{ filter: "grayscale(.35) contrast(1.05)" }} />
    </div>
  );
}

export default function Location({ as = "h2" }) {
  const H = as;
  return (
    <section className="container-x py-20 md:py-24" aria-labelledby="visit">
      <div className="grid lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-5 flex flex-col">
          <SectionHead as={H} eyebrow="Location" title={<span id="visit">Visit {BUSINESS.businessName}</span>}
            sub="A hair salon near Nehru Enclave, right at Gate-5 of Nehru Enclave Metro Station in Kalkaji." className="mb-8" />

          <address className="not-italic space-y-5">
            <div className="flex gap-4">
              <MapPin size={22} className="text-gold-dark shrink-0 mt-1" />
              <p className="text-lg leading-relaxed">
                {BUSINESS.address.lines.map((l) => <span key={l} className="block">{l}</span>)}
              </p>
            </div>
            <div className="flex gap-4 rounded-xl bg-sand p-4">
              <TrainFront size={22} className="text-gold-dark shrink-0" />
              <p className="text-sm"><b className="font-medium">Nearby landmark:</b> {BUSINESS.landmarkDetail}.</p>
            </div>
            <div className="flex gap-4">
              <Clock size={22} className="text-gold-dark shrink-0 mt-0.5" />
              {BUSINESS.hours.length ? (
                <ul className="text-sm space-y-1">{BUSINESS.hours.map((h) => <li key={h.days}><span className="text-muted">{h.days}:</span> {h.time}</li>)}</ul>
              ) : (
                <EditableHint>Opening hours</EditableHint>
              )}
            </div>
          </address>

          <div className="grid grid-cols-2 gap-2 mt-8">
            <a href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark py-3 text-sm col-span-2 sm:col-span-1"><Navigation size={16} />Get Directions</a>
            <a href={BUSINESS.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline py-3 text-sm col-span-2 sm:col-span-1">Open in Google Maps <ArrowUpRight size={15} /></a>
            <CallLink className="btn btn-outline py-3 text-sm"><Phone size={16} />Call Now</CallLink>
            <WhatsAppLink className="btn btn-wa py-3 text-sm"><WhatsAppIcon size={16} />WhatsApp</WhatsAppLink>
          </div>
        </div>
        <div className="lg:col-span-7"><MapEmbed /></div>
      </div>
    </section>
  );
}
