import { useEffect, useMemo, useState } from "react";
import { Calendar, Check, ChevronLeft, ChevronRight, Info, MapPin, Phone, Tag } from "lucide-react";
import { BOOKING, BUSINESS, SERVICE_CATEGORIES, SERVICES } from "../config/business";
import { href } from "../lib/router";
import { CallLink, WhatsAppIcon, WhatsAppLink } from "../components/actions";
import { Icon } from "../components/icons";
import { Photo } from "../components/ui";

/* Frontend-only booking request flow. Nothing is sent to a server or stored.
   Mounted with key={serviceId}, so "Book Now" on a service card always starts a fresh request. */

const STEPS = ["Category", "Service", "Date & Time", "Your Details", "Confirm"];
const EMPTY_FORM = { name: "", phone: "", address: "", notes: "" };

const fmtDay = (d) => d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
const slotMinutes = (t) => {
  const [, h, m, ap] = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  return ((+h % 12) + (ap.toUpperCase() === "PM" ? 12 : 0)) * 60 + +m;
};
const cleanPhone = (p) => p.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");

function useDays() {
  return useMemo(() => {
    const now = new Date();
    return Array.from({ length: BOOKING.daysAhead }, (_, i) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + i));
  }, []);
}

export default function BookingPage({ serviceId }) {
  const preset = SERVICES.find((s) => s.id === serviceId) || null;
  const days = useDays();
  const [step, setStep] = useState(preset ? 3 : 1);
  const [cat, setCat] = useState(preset?.cat || "");
  const [service, setService] = useState(preset);
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step, done]);

  const isHome = cat === "home";
  const category = SERVICE_CATEGORIES.find((c) => c.id === cat);
  const isToday = (d) => d && d.toDateString() === new Date().toDateString();
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const slotPast = (t) => isToday(day) && slotMinutes(t) <= nowMin + 30;

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(cleanPhone(form.phone))) e.phone = "Please enter a valid 10-digit mobile number.";
    if (isHome && form.address.trim().length < 8) e.address = "Please enter the address for the home visit.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const canContinue = (step === 3 && day && slot) || step === 4;
  const next = () => {
    if (step === 4 && !validate()) return;
    setStep(step + 1);
  };
  const reset = () => { setStep(1); setCat(""); setService(null); setDay(null); setSlot(""); setForm(EMPTY_FORM); setErrors({}); setDone(false); };

  const summary = [
    ["Service", service?.name],
    ["Category", category?.name],
    ["Date", day && fmtDay(day)],
    ["Time", slot],
    ["Name", form.name],
    ["Phone", form.phone && `+91 ${cleanPhone(form.phone)}`],
    ...(isHome ? [["Home visit address", form.address]] : [["Salon", `${BUSINESS.businessName}, ${BUSINESS.locality}`]]),
    ...(form.notes ? [["Notes", form.notes]] : []),
  ];

  /* ---------- success ---------- */
  if (done) {
    const waMsg = `Hi ${BUSINESS.businessName}, I have requested an appointment.\nService: ${service.name}\nDate: ${fmtDay(day)}\nTime: ${slot}\nName: ${form.name}\nPhone: +91 ${cleanPhone(form.phone)}${isHome ? `\nAddress: ${form.address}` : ""}${form.notes ? `\nNotes: ${form.notes}` : ""}`;
    return (
      <div className="bg-stone min-h-[70vh]">
        <div className="max-w-xl mx-auto px-4 py-14 md:py-20 text-center fade-in">
          <div className="w-20 h-20 rounded-full bg-ink text-gold-light flex items-center justify-center mx-auto ring-8 ring-gold/15"><Check size={36} /></div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mt-7">Appointment Request Received</h1>
          <p className="text-lg mt-4">Thank you for choosing {BUSINESS.businessName}.</p>
          <p className="text-muted mt-2">Your appointment request has been recorded. Our team will confirm your appointment shortly.</p>

          <div className="card text-left p-5 md:p-6 mt-8 space-y-3 text-sm">
            {summary.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4"><span className="text-muted shrink-0">{k}</span><span className="font-medium text-right">{v}</span></div>
            ))}
            <div className="flex justify-between gap-4 pt-3 border-t border-line"><span className="text-muted">Price</span><span className="font-medium">{service.price || "On consultation"}</span></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
            <WhatsAppLink message={waMsg} className="btn btn-wa px-6 py-3.5"><WhatsAppIcon size={18} />Send Details on WhatsApp</WhatsAppLink>
            <button onClick={reset} className="btn btn-outline px-6 py-3.5">Book Another Service</button>
          </div>
          <p className="text-xs text-muted mt-8 flex items-start gap-2 text-left bg-sand rounded-xl p-4">
            <Info size={15} className="shrink-0 mt-0.5" />
            <span>Demo mode: this request is not sent or saved anywhere yet. On the live website it will be delivered to the salon (for example by WhatsApp or email) so the team can confirm it.</span>
          </p>
        </div>
      </div>
    );
  }

  /* ---------- flow ---------- */
  return (
    <div className="bg-stone pb-28 md:pb-0">
      <div className="bg-ink text-cream">
        <div className="container-x pt-10 pb-8 md:pt-14 md:pb-10">
          <p className="eyebrow text-gold-light">{BUSINESS.businessName} · {BUSINESS.locality}</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mt-2">Book an Appointment</h1>
          <p className="text-cream/65 mt-2">Takes under a minute. We'll confirm your slot by call or WhatsApp.</p>

          {/* progress: compact on mobile, labelled pills on desktop */}
          <div className="mt-7 md:hidden">
            <div className="flex justify-between text-sm"><span className="text-gold-light">Step {step} of {STEPS.length}</span><span className="text-cream/70">{STEPS[step - 1]}</span></div>
            <div className="h-1 rounded-full bg-cream/15 mt-2 overflow-hidden"><div className="h-full bg-gold transition-all duration-500" style={{ width: `${(step / STEPS.length) * 100}%` }} /></div>
          </div>
          <ol className="hidden md:flex items-center gap-2 mt-8">
            {STEPS.map((s, i) => {
              const n = i + 1, active = step === n, past = step > n;
              return (
                <li key={s} className="flex items-center gap-2">
                  <button disabled={!past} onClick={() => setStep(n)}
                    className={`flex items-center gap-2 text-sm pl-1.5 pr-4 py-1.5 rounded-full transition ${active ? "bg-gold text-ink" : past ? "bg-cream/10 text-cream hover:bg-cream/20" : "text-cream/45"}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${active ? "bg-ink text-gold-light" : past ? "bg-gold text-ink" : "border border-cream/25"}`}>{past ? <Check size={13} /> : n}</span>{s}
                  </button>
                  {n < STEPS.length && <ChevronRight size={15} className="text-cream/30" />}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="container-x py-8 md:py-12 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-8 min-w-0 card p-5 md:p-8">
          {step === 1 && (
            <div className="fade-in">
              <h2 className="font-display text-3xl font-semibold mb-5">What would you like to book?</h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
                {SERVICE_CATEGORIES.map((c) => (
                  <button key={c.id} onClick={() => { setCat(c.id); setService(null); setStep(2); }}
                    className={`group relative overflow-hidden rounded-xl border text-left transition hover:border-ink ${cat === c.id ? "border-ink ring-2 ring-gold/40" : "border-line"}`}>
                    <Photo src={c.img} alt="" className="w-full h-24 md:h-28 transition duration-500 group-hover:scale-105" />
                    <span className="flex items-start gap-3 p-3.5">
                      <span className="w-9 h-9 rounded-full bg-ink text-gold-light flex items-center justify-center shrink-0"><Icon name={c.icon} size={16} /></span>
                      <span><span className="block font-medium leading-tight">{c.name}</span><span className="text-xs text-muted">{c.short}</span></span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <h2 className="font-display text-3xl font-semibold mb-1">Choose a service</h2>
              <p className="text-sm text-muted mb-5">{category?.name}</p>
              <div className="space-y-2.5">
                {SERVICES.filter((s) => s.cat === cat).map((s) => (
                  <button key={s.id} onClick={() => { setService(s); setStep(3); }}
                    className={`w-full text-left rounded-xl border p-3 flex items-center gap-4 transition hover:border-ink ${service?.id === s.id ? "border-ink bg-sand" : "border-line"}`}>
                    <Photo src={s.img} alt="" className="w-16 h-16 rounded-lg shrink-0" />
                    <span className="flex-1 min-w-0">
                      <span className="block font-medium">{s.name}</span>
                      <span className="block text-sm text-muted line-clamp-2">{s.desc}</span>
                      <span className="flex items-center gap-1 text-xs text-gold-dark mt-1"><Tag size={12} />{s.price || "Price on consultation"}{s.duration && ` · ${s.duration}`}</span>
                    </span>
                    <ChevronRight size={18} className="text-muted shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <h2 className="font-display text-3xl font-semibold mb-1">Preferred date</h2>
              <p className="text-sm text-muted mb-5">{service?.name}</p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 md:mx-0 md:px-0 pb-1">
                {days.map((d) => {
                  const closed = BOOKING.closedWeekdays.includes(d.getDay());
                  const on = day && d.toDateString() === day.toDateString();
                  return (
                    <button key={d.toISOString()} disabled={closed} onClick={() => { setDay(d); setSlot(""); }} aria-pressed={on}
                      className={`shrink-0 w-[68px] rounded-xl border py-3 text-center transition ${on ? "bg-ink text-cream border-ink" : closed ? "border-line opacity-40 cursor-not-allowed" : "border-line hover:border-ink bg-white"}`}>
                      <span className={`block text-xs ${on ? "text-gold-light" : "text-muted"}`}>{isToday(d) ? "Today" : d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                      <span className="block font-display text-3xl font-semibold leading-none my-1">{d.getDate()}</span>
                      <span className={`block text-xs ${on ? "text-cream/70" : "text-muted"}`}>{closed ? "Closed" : d.toLocaleDateString("en-IN", { month: "short" })}</span>
                    </button>
                  );
                })}
              </div>

              <h3 className="font-display text-2xl font-semibold mt-8 mb-1">Preferred time</h3>
              <p className="text-sm text-muted mb-4">The salon confirms the final time with you.</p>
              {!day ? (
                <p className="text-sm text-muted rounded-xl bg-sand p-4 flex items-center gap-2"><Calendar size={16} />Select a date to see time slots.</p>
              ) : (
                <div className="space-y-5">
                  {Object.entries(BOOKING.timeSlots).map(([part, times]) => (
                    <div key={part}>
                      <p className="eyebrow text-muted text-[10px] mb-2">{part}</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                        {times.map((t) => {
                          const past = slotPast(t);
                          return (
                            <button key={t} disabled={past} onClick={() => setSlot(t)} aria-pressed={slot === t}
                              className={`rounded-lg border py-2.5 text-sm transition ${slot === t ? "bg-ink text-cream border-ink" : past ? "border-line text-muted/50 cursor-not-allowed line-through" : "border-line bg-white hover:border-ink"}`}>
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="fade-in space-y-4">
              <h2 className="font-display text-3xl font-semibold mb-1">Your details</h2>
              <Field label="Full name" error={errors.name}>
                <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
              </Field>
              <Field label="Mobile number" error={errors.phone} hint="We'll confirm your appointment on this number.">
                <div className="flex">
                  <span className="rounded-l-xl border border-r-0 border-line bg-sand px-3.5 flex items-center text-sm">+91</span>
                  <input className="field rounded-l-none" inputMode="numeric" autoComplete="tel-national" maxLength={14} value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" />
                </div>
              </Field>
              {isHome && (
                <Field label="Address for home visit" error={errors.address}>
                  <textarea className="field" rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no., street, area" autoComplete="street-address" />
                </Field>
              )}
              <Field label={isHome ? "Which services do you need at home?" : "Notes (optional)"}>
                <textarea className="field" rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder={isHome ? "e.g. haircut and manicure" : "Anything we should know before your visit"} />
              </Field>
            </div>
          )}

          {step === 5 && (
            <div className="fade-in">
              <h2 className="font-display text-3xl font-semibold mb-5">Confirm your appointment request</h2>
              <dl className="divide-y divide-line border-y border-line text-sm">
                {summary.filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-muted shrink-0">{k}</dt><dd className="font-medium text-right">{v}</dd></div>
                ))}
                <div className="flex justify-between gap-4 py-3"><dt className="text-muted">Price</dt><dd className="font-medium">{service?.price || "On consultation"}</dd></div>
              </dl>
              <p className="text-xs text-muted mt-4">This is an appointment request. {BUSINESS.businessName} will confirm availability with you by call or WhatsApp.</p>
            </div>
          )}

          {/* desktop step controls */}
          <div className="hidden md:flex justify-between items-center mt-8 pt-6 border-t border-line">
            {step > 1 ? <button onClick={() => setStep(step - 1)} className="btn px-2 py-2 text-muted hover:text-ink"><ChevronLeft size={18} />Back</button> : <span />}
            {(step === 3 || step === 4) && (
              <button disabled={!canContinue} onClick={next} className="btn btn-dark px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed">Continue<ChevronRight size={18} /></button>
            )}
            {step === 5 && <button onClick={() => setDone(true)} className="btn btn-gold px-8 py-3"><Check size={18} />Confirm Appointment</button>}
          </div>
        </div>

        {/* summary */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="card p-5 md:p-6 hidden lg:block">
            <h3 className="font-display text-2xl font-semibold">Your appointment</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {[["Category", category?.name], ["Service", service?.name], ["Date", day && fmtDay(day)], ["Time", slot]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3"><dt className="text-muted">{k}</dt><dd className={v ? "font-medium text-right" : "text-muted/60"}>{v || "Not selected"}</dd></div>
              ))}
            </dl>
            <p className="flex items-start gap-2 text-sm mt-5 pt-4 border-t border-line">
              <MapPin size={16} className="text-gold-dark shrink-0 mt-0.5" />
              {isHome ? "Home visit at your address" : `${BUSINESS.businessName}, Gate-5, ${BUSINESS.landmark}`}
            </p>
          </div>
          <div className="card p-5">
            <p className="text-sm font-medium">Prefer to talk?</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <CallLink className="btn btn-outline py-2.5 text-sm"><Phone size={15} />Call</CallLink>
              <WhatsAppLink className="btn btn-wa py-2.5 text-sm"><WhatsAppIcon size={15} />WhatsApp</WhatsAppLink>
            </div>
          </div>
        </aside>
      </div>

      {/* mobile sticky step controls (replaces the quick-action bar on this page) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-line px-4 py-3 flex items-center gap-3" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
        {step > 1
          ? <button onClick={() => setStep(step - 1)} className="btn btn-outline px-4 py-3" aria-label="Back"><ChevronLeft size={18} /></button>
          : <a href={href("/")} className="btn btn-outline px-4 py-3 text-sm">Cancel</a>}
        {step <= 2 && <p className="flex-1 text-sm text-muted">{step === 1 ? "Choose a category" : "Choose a service"}</p>}
        {(step === 3 || step === 4) && (
          <button disabled={!canContinue} onClick={next} className="btn btn-dark flex-1 py-3 disabled:opacity-40">{step === 3 && !canContinue ? "Pick a date & time" : "Continue"}</button>
        )}
        {step === 5 && <button onClick={() => setDone(true)} className="btn btn-gold flex-1 py-3"><Check size={18} />Confirm Appointment</button>}
      </div>
    </div>
  );
}

function Field({ label, error, hint, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium block mb-1.5">{label}</span>
      {children}
      {error ? <span className="text-xs mt-1.5 block text-red-700">{error}</span> : hint && <span className="text-xs mt-1.5 block text-muted">{hint}</span>}
    </label>
  );
}
