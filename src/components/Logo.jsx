import { BUSINESS } from "../config/business";

// Monogram + wordmark. TODO(client): swap for the salon's real logo file if one exists.
export default function Logo({ size = "md", tone = "light" }) {
  const big = size === "lg";
  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <span className={`shrink-0 rounded-full border border-gold/70 items-center justify-center font-display text-gold-light ${big ? "flex w-14 h-14 text-3xl" : "hidden xs:flex w-10 h-10 text-2xl"}`}
        style={{ boxShadow: "inset 0 0 0 3px #0F0E0D, inset 0 0 0 4px rgba(196,160,98,.35)", background: "#0F0E0D" }} aria-hidden="true">
        P
      </span>
      <span className="leading-none text-left">
        <span className={`block font-display font-semibold ${big ? "text-3xl" : "text-[1.25rem] sm:text-[1.35rem]"} ${tone === "light" ? "text-cream" : "text-ink"}`}>
          {BUSINESS.brandLine1}
        </span>
        <span className={`block eyebrow mt-1 ${big ? "text-xs" : "text-[10px]"} ${tone === "light" ? "text-gold-light" : "text-gold-dark"}`}>
          {BUSINESS.brandLine2} · {BUSINESS.type}
        </span>
      </span>
    </span>
  );
}
