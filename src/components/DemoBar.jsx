import { BUSINESS, DEMO } from "../config/business";
import { href } from "../lib/router";

// Presentation-only strip. Hide it for launch with DEMO.showDemoBar = false.
export default function DemoBar({ page }) {
  if (!DEMO.showDemoBar) return null;
  const onProposal = page === "proposal";
  return (
    <div className="bg-coal text-cream/80 text-xs border-b border-cream/10">
      <div className="container-x py-2 flex items-center justify-between gap-3">
        <p className="truncate">
          <span className="text-gold-light font-medium">Website proposal</span>
          <span className="hidden sm:inline"> for {BUSINESS.businessName} · prepared by {DEMO.agency}</span>
        </p>
        <div className="flex shrink-0 rounded-full bg-cream/10 p-0.5">
          <a href={href("/")} className={`px-3 py-1 rounded-full transition ${!onProposal ? "bg-cream text-ink" : "hover:text-cream"}`}>Website</a>
          <a href={href("/proposal")} className={`px-3 py-1 rounded-full transition ${onProposal ? "bg-cream text-ink" : "hover:text-cream"}`}>Proposal</a>
        </div>
      </div>
    </div>
  );
}
