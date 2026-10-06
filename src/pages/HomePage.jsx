import { ArrowRight } from "lucide-react";
import { DEMO, FEATURED_SERVICE_IDS, SERVICES } from "../config/business";
import { href } from "../lib/router";
import ServiceCard from "../components/ServiceCard";
import { Reveal, SectionHead } from "../components/ui";
import Hero from "../components/sections/Hero";
import TrustStrip from "../components/sections/TrustStrip";
import CategoryBento from "../components/sections/CategoryBento";
import BeforeAfter from "../components/sections/BeforeAfter";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Gallery from "../components/sections/Gallery";
import Testimonials from "../components/sections/Testimonials";
import WhatWillChange from "../components/sections/WhatWillChange";
import Location from "../components/sections/Location";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/sections/CtaBand";

export default function HomePage() {
  const featured = FEATURED_SERVICE_IDS.map((id) => SERVICES.find((s) => s.id === id)).filter(Boolean);
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryBento />

      <section className="bg-white border-y border-line py-20 md:py-24" aria-labelledby="featured">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHead eyebrow="Book a service" title={<span id="featured">Featured Services</span>}
              sub="Prices depend on the service and your requirements. Book a slot or ask us on WhatsApp." className="mb-0" />
            <a href={href("/services")} className="btn btn-outline px-5 py-2.5 text-sm">All Services <ArrowRight size={16} /></a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featured.map((s) => <Reveal key={s.id}><ServiceCard s={s} /></Reveal>)}
          </div>
        </div>
      </section>

      <BeforeAfter />
      <WhyChooseUs />

      <section className="bg-white border-y border-line py-20 md:py-24" aria-labelledby="portfolio">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHead eyebrow="Portfolio" title={<span id="portfolio">Our Work</span>}
              sub="Hair, colour, styling, men's grooming and beauty. Tap a photo to view it larger." className="mb-0" />
            <a href={href("/gallery")} className="btn btn-outline px-5 py-2.5 text-sm">View Full Gallery <ArrowRight size={16} /></a>
          </div>
          <Gallery limit={6} withFilters={false} />
        </div>
      </section>

      <Testimonials />
      {DEMO.showProposalOnHome && <WhatWillChange />}
      <Location />
      <Faq />
      <CtaBand />
    </>
  );
}
