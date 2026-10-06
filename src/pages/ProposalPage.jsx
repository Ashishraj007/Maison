import { ArrowRight, Check, ChevronRight, ClipboardList, Search } from "lucide-react";
import { BUSINESS, CLIENT_CHECKLIST, DEMO, PROPOSAL, SEO } from "../config/business";
import { href } from "../lib/router";
import { SectionHead, Stars } from "../components/ui";
import WhatWillChange from "../components/sections/WhatWillChange";

const inr = (n) => "₹" + n.toLocaleString("en-IN");

const JOURNEY = [
  "Finds you on Google or Maps",
  "Opens the website on mobile",
  "Chooses a service",
  "Picks a date & time",
  "Sends the request",
  "Salon confirms on call / WhatsApp",
];

const SEO_POINTS = [
  "Unique page titles & meta descriptions",
  "BeautySalon schema with consistent NAP",
  "Service pages written around local search",
  "Google Maps embed + directions links",
  "Mobile-first, fast-loading pages",
  "Google Business Profile linked throughout",
];

export default function ProposalPage() {
  const total = PROPOSAL.lineItems.reduce((a, [, v]) => a + v, 0);
  const g = BUSINESS.google;
  return (
    <div className="fade-in">
      <section className="bg-ink text-cream">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow text-gold-light">{DEMO.agency} · Website proposal</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1] mt-4 max-w-4xl">
            A website built for <span className="italic text-gold-light">{BUSINESS.businessName}</span>
          </h1>
          <p className="text-cream/70 text-lg mt-6 max-w-2xl">
            Online booking, a complete service catalogue, portfolio, reviews, WhatsApp, Google Maps and local SEO, designed for a {BUSINESS.type.toLowerCase()} in {BUSINESS.locality}.
          </p>
          <div className="grid md:grid-cols-12 gap-4 mt-10">
            <div className="md:col-span-7 rounded-2xl border border-cream/10 bg-coal p-7">
              <p className="eyebrow text-gold-light text-[10px]">Objective</p>
              <div className="flex flex-wrap items-center gap-2 mt-3 text-lg">
                {["More visibility", "More enquiries", "More bookings"].map((t, i) => (
                  <span key={t} className="flex items-center gap-2">
                    <span className="rounded-full bg-cream/10 px-4 py-1.5">{t}</span>
                    {i < 2 && <ChevronRight size={18} className="text-gold" />}
                  </span>
                ))}
              </div>
              <p className="eyebrow text-gold-light text-[10px] mt-8">Starting point (Google Business Profile)</p>
              <p className="mt-2 flex items-center gap-3 text-lg"><Stars n={5} size={16} />{g.rating} ★ · {g.reviewCount} reviews · {BUSINESS.locality}</p>
            </div>
            <div className="md:col-span-5 grid gap-4">
              <a href={href("/")} className="rounded-2xl bg-gold text-ink p-7 flex items-center justify-between hover:bg-gold-light transition">
                <span><span className="block eyebrow text-[10px]">Live demo</span><span className="font-display text-3xl font-semibold">Explore the website</span></span><ArrowRight />
              </a>
              <a href={href("/book")} className="rounded-2xl border border-cream/20 p-7 flex items-center justify-between hover:border-gold transition">
                <span><span className="block eyebrow text-[10px] text-gold-light">Try it</span><span className="font-display text-3xl font-semibold">Booking flow</span></span><ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhatWillChange showLabel={false} />

      <section className="container-x py-20 md:py-24 grid lg:grid-cols-2 gap-14">
        <div>
          <SectionHead eyebrow="Customer journey" title="From Google search to confirmed appointment" />
          <ol className="space-y-3">
            {JOURNEY.map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-ink text-gold-light flex items-center justify-center font-display text-lg shrink-0">{i + 1}</span>
                <span className="card flex-1 px-5 py-3.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHead eyebrow="Local SEO" title="How you can appear in local search" />
          <div className="card p-5 text-sm">
            <p className="text-muted flex items-center gap-2 rounded-full border border-line px-4 py-2"><Search size={14} />hair salon in kalkaji</p>
            <div className="mt-5">
              <p className="text-xs text-muted">{BUSINESS.website || "yourdomain.in"}</p>
              <p className="text-lg mt-0.5" style={{ color: "#1a0dab" }}>{SEO.pages.home.title}</p>
              <p className="text-muted mt-1 leading-relaxed">{SEO.description}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-5 text-sm">
            {SEO_POINTS.map((t) => <p key={t} className="flex gap-2"><Check size={16} className="text-gold-dark shrink-0 mt-0.5" />{t}</p>)}
          </div>
          <p className="text-xs text-muted mt-5">Search preview is illustrative. Local SEO improves how the salon can be discovered; no agency can guarantee Google rankings.</p>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-24">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Before launch" title="What we need from you" sub="Everything marked 'To confirm' in the demo is replaced with your real details." />
          </div>
          <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {CLIENT_CHECKLIST.map((t) => (
              <li key={t} className="card p-4 flex gap-3 text-sm"><ClipboardList size={18} className="text-gold-dark shrink-0" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {PROPOSAL.showInvestment && (
        <section className="bg-ink text-cream py-20 md:py-24">
          <div className="container-x max-w-5xl">
            <h2 className="font-display text-4xl md:text-5xl font-semibold">Your investment</h2>
            <p className="text-cream/60 mt-3">{PROPOSAL.projectName}. Everything below is included in one package price.</p>
            <div className="grid md:grid-cols-5 gap-6 mt-10">
              <div className="md:col-span-3 rounded-2xl bg-coal border border-cream/10 p-6 md:p-8">
                {PROPOSAL.lineItems.map(([label, v]) => (
                  <div key={label} className="flex justify-between py-3 border-b border-cream/10 text-sm md:text-base"><span>{label}</span><span className="text-cream/60">{inr(v)}</span></div>
                ))}
                <div className="flex justify-between pt-4 font-medium"><span>Total value</span><span className="line-through text-cream/50">{inr(total)}</span></div>
              </div>
              <div className="md:col-span-2 rounded-2xl bg-cream text-ink p-8 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted">{DEMO.agency} package price</p>
                  <p className="font-display text-6xl font-semibold leading-none mt-2">{PROPOSAL.price}</p>
                  <p className="mt-3 inline-block rounded-full bg-gold/25 text-gold-dark px-3 py-1 text-sm">You save {PROPOSAL.saving}</p>
                  <p className="text-sm text-muted mt-4">Timeline: {PROPOSAL.timeline}</p>
                </div>
                <ul className="text-sm text-muted mt-8 space-y-1">{PROPOSAL.paymentTerms.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            </div>
            <p className="text-sm text-cream/50 mt-6 max-w-3xl">{PROPOSAL.exclusions}</p>
          </div>
        </section>
      )}
    </div>
  );
}
