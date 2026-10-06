import { useEffect } from "react";
import { BUSINESS, SEO, SERVICES } from "../config/business";

const setMeta = (name, content) => {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

// BeautySalon structured data built from the config, so NAP details stay identical everywhere.
// Google's rating is deliberately not included: self-served review markup is not eligible for rich results.
function businessSchema() {
  const b = BUSINESS;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: b.businessName,
    description: SEO.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.street,
      addressLocality: `${b.address.locality}, ${b.address.city}`,
      addressRegion: b.address.region,
      postalCode: b.address.postalCode,
      addressCountry: b.address.country,
    },
    areaServed: ["Kalkaji", "Nehru Enclave", "New Delhi"],
    hasMap: b.googleMapsUrl,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Salon services",
      itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
    },
  };
  if (b.phone) schema.telephone = b.phone;
  if (b.email) schema.email = b.email;
  if (b.website) schema.url = b.website;
  const sameAs = Object.values(b.socialLinks).filter(Boolean);
  if (sameAs.length) schema.sameAs = sameAs;
  return schema;
}

export function useSeo(page) {
  useEffect(() => {
    const cfg = SEO.pages[page] || SEO.pages.home;
    document.title = cfg.title;
    setMeta("description", cfg.description || SEO.description);
  }, [page]);

  useEffect(() => {
    let el = document.getElementById("ld-business");
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = "ld-business";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(businessSchema());
  }, []);
}
