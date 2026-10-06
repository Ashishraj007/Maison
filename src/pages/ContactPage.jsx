import { useState } from "react";
import { Navigation, Phone, Send } from "lucide-react";
import { BUSINESS, SERVICES } from "../config/business";
import { waHref } from "../lib/links";
import PageHeader from "../components/PageHeader";
import { CallLink, WhatsAppIcon, WhatsAppLink } from "../components/actions";
import { useToast } from "../components/ui";
import Location from "../components/sections/Location";
import Faq from "../components/sections/Faq";

function EnquiryForm() {
  const toast = useToast();
  const [f, setF] = useState({ name: "", service: "", message: "" });
  const submit = (e) => {
    e.preventDefault();
    const msg = [
      `Hi ${BUSINESS.businessName}, I would like to enquire about ${f.service || "your salon services"}.`,
      f.message && `\n${f.message}`,
      f.name && `\nName: ${f.name}`,
    ].filter(Boolean).join("");
    window.open(waHref(msg), "_blank", "noopener");
    if (!BUSINESS.whatsapp) toast("Demo preview: WhatsApp opens with your enquiry pre-filled. Once the salon's number is added, it goes straight to their chat.");
  };
  return (
    <form onSubmit={submit} className="card p-6 md:p-8">
      <h2 className="font-display text-3xl font-semibold">Send a quick enquiry</h2>
      <p className="text-sm text-muted mt-1.5">Your message opens in WhatsApp, ready to send to the salon.</p>
      <div className="space-y-3 mt-6">
        <label className="block">
          <span className="text-sm font-medium block mb-1.5">Your name</span>
          <input className="field" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Full name" autoComplete="name" />
        </label>
        <label className="block">
          <span className="text-sm font-medium block mb-1.5">Service</span>
          <select className="field" value={f.service} onChange={(e) => setF({ ...f, service: e.target.value })}>
            <option value="">Select a service (optional)</option>
            {SERVICES.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium block mb-1.5">Message</span>
          <textarea className="field" rows={3} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="Preferred day, questions about pricing…" />
        </label>
        <button type="submit" className="btn btn-wa w-full py-3.5"><Send size={17} />Send on WhatsApp</button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  const cards = "card p-5 flex items-center gap-4 hover:border-ink transition text-left w-full";
  return (
    <>
      <PageHeader eyebrow="Contact" title="Contact & Directions"
        sub={`${BUSINESS.businessName}, Gate-5, ${BUSINESS.landmark}, Kalkaji, New Delhi 110019.`} />

      <section className="container-x py-12 md:py-16 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-3">
          <WhatsAppLink className={cards}>
            <span className="w-12 h-12 rounded-full bg-wa text-white flex items-center justify-center shrink-0"><WhatsAppIcon size={22} /></span>
            <span><span className="block font-display text-2xl font-semibold">Chat on WhatsApp</span><span className="text-sm text-muted">Pricing, availability & bookings</span></span>
          </WhatsAppLink>
          <CallLink className={cards}>
            <span className="w-12 h-12 rounded-full bg-ink text-gold-light flex items-center justify-center shrink-0"><Phone size={20} /></span>
            <span><span className="block font-display text-2xl font-semibold">Call Now</span><span className="text-sm text-muted">{BUSINESS.phone || "Speak to the salon directly"}</span></span>
          </CallLink>
          <a href={BUSINESS.directionsUrl} target="_blank" rel="noopener noreferrer" className={cards}>
            <span className="w-12 h-12 rounded-full bg-gold text-ink flex items-center justify-center shrink-0"><Navigation size={20} /></span>
            <span><span className="block font-display text-2xl font-semibold">Get Directions</span><span className="text-sm text-muted">Gate-5, {BUSINESS.landmark}</span></span>
          </a>
        </div>
        <div className="lg:col-span-7"><EnquiryForm /></div>
      </section>

      <Location />
      <Faq />
    </>
  );
}
