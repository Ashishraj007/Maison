import { ArrowUpRight, MapPin, MessageSquareText, Star, TrainFront } from "lucide-react";
import { BUSINESS } from "../../config/business";
import { Reveal } from "../ui";

/* "Why Customers Find Us": facts from the Google Business Profile, labelled as such. */
export default function TrustStrip() {
  const g = BUSINESS.google;
  const items = [
    { icon: Star, big: `${g.rating} ★`, label: "Google Rating" },
    { icon: MessageSquareText, big: g.reviewCount, label: "Google Reviews" },
    { icon: MapPin, big: "Kalkaji", label: "New Delhi" },
    { icon: TrainFront, big: "Gate-5", label: `Near ${BUSINESS.landmark}` },
  ];
  return (
    <section className="bg-sand py-16 md:py-20" aria-labelledby="find-us">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow text-gold-dark mb-3">From our Google Business Profile</p>
            <h2 id="find-us" className="font-display text-4xl md:text-5xl font-semibold leading-tight">Why Customers Find Us</h2>
          </div>
          <a href={BUSINESS.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-5 py-2.5 text-sm">
            View on Google <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {items.map(({ icon: I, big, label }) => (
            <Reveal key={label} className="card p-5 md:p-7">
              <I size={20} className="text-gold-dark" />
              <p className="font-display text-4xl md:text-5xl font-semibold mt-4 leading-none">{big}</p>
              <p className="text-sm text-muted mt-2">{label}</p>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-muted mt-4">
          Rating and review count as shown on {BUSINESS.businessName}'s {g.source} ({g.asOf}). They are not collected by this website.
        </p>
      </div>
    </section>
  );
}
