import { useState, useEffect, useMemo, useRef } from "react";
import {
  Calendar, Clock, Phone, MessageCircle, MapPin, Star, Scissors, Sparkles, Home,
  User, Check, ChevronRight, ChevronLeft, X, Menu, Navigation, Heart, Smartphone,
  Search, ShieldCheck, Palette, Gem, Droplets, Award, Image as ImageIcon, LayoutGrid,
} from "lucide-react";

/* =========================================================
   EDITABLE DEMO DATA — replace with the client's real details
   ========================================================= */
const SALON = {
  name: "Maison Aura",                       // demo salon name
  tagline: "Hair, beauty & grooming studio",
  city: "Noida",
  area: "Sector 18",
  address: "Shop 12, Sector 18 Market, Noida, UP 201301", // demo address
  phoneDisplay: "+91 99999 99999",           // demo number
  phoneDial: "+919999999999",
  whatsapp: "919999999999",                  // demo WhatsApp (country code, no +)
  email: "hello@maisonaura.demo",
  hours: "Tue to Sun, 10 AM – 8 PM",
  homeServiceAreas: ["Noida", "Greater Noida", "Indirapuram", "East Delhi"],
};

const PROJECT = {
  name: "Salon Website Revamp",
  price: "₹34,999",
  value: "₹40,000",
  saving: "₹5,001",
  timeline: "7–12 working days",
};

const IMG = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;
const PHOTOS = {
  hero: IMG("photo-1560066984-138dadb4c035"),
  hair: IMG("photo-1522337360788-8b13dee7a37e"),
  colour: IMG("photo-1562322140-8baeececf3df"),
  care: IMG("photo-1595476108010-b4d1f102b1b1"),
  makeup: IMG("photo-1487412947147-5cebf100ffc2"),
  skin: IMG("photo-1570172619644-dfd03ed5d881"),
  menGroom: IMG("photo-1503951914875-452162b0f3f1"),
  menHair: IMG("photo-1599351431202-1e0f0137899a"),
  home: IMG("photo-1516975080664-ed2fc6a32937"),
  interior: IMG("photo-1600948836101-f9ffda59d250"),
  barber: IMG("photo-1621605815971-fbc98d665033"),
};

const CATEGORIES = [
  { id: "womens-hair", name: "Women's Hair", icon: Scissors, img: PHOTOS.hair },
  { id: "colour", name: "Hair Colour", icon: Palette, img: PHOTOS.colour },
  { id: "care", name: "Hair Care", icon: Droplets, img: PHOTOS.care },
  { id: "makeup", name: "Makeup", icon: Sparkles, img: PHOTOS.makeup },
  { id: "skin", name: "Skincare", icon: Gem, img: PHOTOS.skin },
  { id: "mens-grooming", name: "Men's Grooming", icon: User, img: PHOTOS.menGroom },
  { id: "mens-hair", name: "Men's Hair", icon: Scissors, img: PHOTOS.menHair },
  { id: "home", name: "Home Services", icon: Home, img: PHOTOS.home },
];

const SERVICES = [
  { id: "s1", cat: "womens-hair", name: "Signature cut & blow-dry", desc: "Consultation, precision cut and a polished blow-dry finish.", price: 1200, mins: 60 },
  { id: "s2", cat: "womens-hair", name: "Keratin smoothening", desc: "Frizz-free, glossy hair that lasts up to four months.", price: 4500, mins: 180 },
  { id: "s3", cat: "womens-hair", name: "Occasion styling", desc: "Curls, waves or an elegant updo for events.", price: 1500, mins: 45 },
  { id: "s4", cat: "colour", name: "Global colour", desc: "Even, long-lasting colour with ammonia-free options.", price: 3500, mins: 120 },
  { id: "s5", cat: "colour", name: "Balayage", desc: "Hand-painted, sun-kissed dimension tailored to you.", price: 6500, mins: 210 },
  { id: "s6", cat: "colour", name: "Root touch-up", desc: "Seamless coverage for regrowth and greys.", price: 1500, mins: 60 },
  { id: "s7", cat: "care", name: "Deep conditioning hair spa", desc: "Nourishing mask, steam and scalp massage.", price: 1800, mins: 60 },
  { id: "s8", cat: "care", name: "Scalp detox treatment", desc: "Clarifies build-up and soothes an itchy scalp.", price: 2200, mins: 75 },
  { id: "s9", cat: "care", name: "Bond repair therapy", desc: "Rebuilds damaged, coloured or chemically treated hair.", price: 3000, mins: 60 },
  { id: "s10", cat: "makeup", name: "Bridal makeup", desc: "HD or airbrush bridal look with trial consultation.", price: 18000, mins: 180 },
  { id: "s11", cat: "makeup", name: "Party makeup", desc: "Soft glam or bold evening looks, lashes included.", price: 4500, mins: 90 },
  { id: "s12", cat: "makeup", name: "Engagement & reception", desc: "Long-wear HD makeup built for photos.", price: 9000, mins: 120 },
  { id: "s13", cat: "skin", name: "Hydra facial", desc: "Cleanse, exfoliate and hydrate for instant glow.", price: 3500, mins: 75 },
  { id: "s14", cat: "skin", name: "Brightening facial", desc: "Targets dullness and uneven tone.", price: 2200, mins: 60 },
  { id: "s15", cat: "mens-grooming", name: "Beard sculpt & hot towel shave", desc: "Shape, line-up and a classic hot towel finish.", price: 500, mins: 30 },
  { id: "s16", cat: "mens-grooming", name: "Men's de-tan facial", desc: "Removes tan and refreshes tired, oily skin.", price: 1500, mins: 45 },
  { id: "s17", cat: "mens-grooming", name: "Charcoal clean-up", desc: "Deep pore cleanse for clearer skin.", price: 900, mins: 40 },
  { id: "s18", cat: "mens-hair", name: "Precision haircut & styling", desc: "Fade, textured crop or classic cut, styled to finish.", price: 600, mins: 40 },
  { id: "s19", cat: "mens-hair", name: "Anti-dandruff scalp treatment", desc: "Medicated cleanse and scalp therapy.", price: 1400, mins: 45 },
  { id: "s20", cat: "mens-hair", name: "Hair fall control therapy", desc: "Strengthening treatment for thinning hair.", price: 2000, mins: 60 },
  { id: "s21", cat: "mens-hair", name: "Men's hair colour", desc: "Natural grey coverage or fashion shades.", price: 1200, mins: 45 },
  { id: "s22", cat: "home", name: "Bridal makeup at home", desc: "Our senior artist comes to you on the big day.", price: 22000, mins: 210 },
  { id: "s23", cat: "home", name: "Party makeup at home", desc: "Get ready at home, without the travel.", price: 5500, mins: 90 },
  { id: "s24", cat: "home", name: "Hair spa at home", desc: "Salon-grade hair spa in your living room.", price: 2200, mins: 75 },
  { id: "s25", cat: "home", name: "Men's grooming at home", desc: "Haircut, beard and clean-up at your doorstep.", price: 1200, mins: 60 },
];

const GALLERY = [
  { cat: "Hair", img: PHOTOS.hair, label: "Soft layered cut" },
  { cat: "Makeup", img: PHOTOS.makeup, label: "Evening glam" },
  { cat: "Colour", img: PHOTOS.colour, label: "Caramel balayage" },
  { cat: "Men", img: PHOTOS.barber, label: "Skin fade" },
  { cat: "Salon", img: PHOTOS.interior, label: "Styling floor" },
  { cat: "Skin", img: PHOTOS.skin, label: "Hydra glow" },
  { cat: "Men", img: PHOTOS.menGroom, label: "Beard sculpt" },
  { cat: "Hair", img: PHOTOS.care, label: "Spa finish" },
  { cat: "Salon", img: PHOTOS.hero, label: "Reception lounge" },
];

const REVIEWS = [
  { name: "Ananya S.", service: "Balayage", rating: 5, text: "Exactly the shade I showed them. The colourist explained every step and my hair still feels soft.", when: "2 weeks ago" },
  { name: "Rohit M.", service: "Precision haircut", rating: 5, text: "Finally a place that gets a fade right. Booked online at night, got a slot next morning.", when: "1 month ago" },
  { name: "Priya K.", service: "Bridal makeup at home", rating: 5, text: "The team arrived on time and my makeup lasted through a 12-hour wedding day.", when: "3 weeks ago" },
  { name: "Neha G.", service: "Hydra facial", rating: 4, text: "Calm, clean space and visible glow after one session. Will be back before Diwali.", when: "5 days ago" },
];

const WHAT_CHANGES = [
  { icon: Gem, title: "Modern premium design", text: "A look that matches the quality of your work, on every screen size." },
  { icon: Calendar, title: "Online booking", text: "Customers book a service and slot themselves, even at midnight." },
  { icon: MessageCircle, title: "Easy WhatsApp enquiry", text: "One tap opens WhatsApp with the enquiry already typed." },
  { icon: LayoutGrid, title: "Services organised properly", text: "Eight clear categories with starting prices and durations." },
  { icon: ImageIcon, title: "Portfolio & gallery", text: "Your best work, filterable by hair, makeup, colour and men." },
  { icon: Star, title: "Customer reviews", text: "Visible social proof, plus a way to collect ratings after each visit." },
  { icon: MapPin, title: "Google Maps & local SEO", text: "Built to improve how nearby customers discover and find you." },
  { icon: Home, title: "Home & men's services", text: "Dedicated sections so these customers stop slipping through." },
];

const PRICING = [
  ["Website UI/UX + development", 20000],
  ["Online booking system", 8000],
  ["Service catalogue + gallery", 4000],
  ["WhatsApp + call integration", 1500],
  ["Google Maps + local SEO setup", 4500],
  ["Reviews / testimonials system", 2000],
];

/* ========================================================= */

const inr = (n) => "₹" + n.toLocaleString("en-IN");
const dur = (m) => (m >= 60 ? `${Math.floor(m / 60)} hr${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`);
const waLink = (msg) => `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(msg)}`;
const defaultWa = `Hi ${SALON.name}, I'd like to know more about your services and book an appointment.`;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
.sd { --plum:#2E1A2B; --mauve:#7D4E63; --rose:#EBD3CF; --blush:#F6E9E6; --petal:#FCF8F7; --gold:#A9845A; --ink:#2A2026; --muted:#76646E; --line:#EADCD9;
  font-family:'Jost',system-ui,sans-serif; color:var(--ink); background:var(--petal); }
.sd .display { font-family:'Cormorant Garamond',Georgia,serif; letter-spacing:-0.01em; }
.sd .bg-plum{background:var(--plum)} .sd .bg-petal{background:var(--petal)} .sd .bg-blush{background:var(--blush)} .sd .bg-rose{background:var(--rose)}
.sd .text-plum{color:var(--plum)} .sd .text-mauve{color:var(--mauve)} .sd .text-gold{color:var(--gold)} .sd .text-muted{color:var(--muted)} .sd .text-rose{color:var(--rose)}
.sd .border-line{border-color:var(--line)} .sd .border-plum{border-color:var(--plum)}
.sd .arch{border-radius:999px 999px 14px 14px; overflow:hidden}
:where(.sd .btn){display:inline-flex} .sd .btn{align-items:center;justify-content:center;gap:.5rem;border-radius:999px;font-weight:500;transition:transform .15s ease, background .2s ease, box-shadow .2s ease;}
.sd .btn:active{transform:scale(.97)}
.sd .btn-primary{background:var(--plum);color:#fff} .sd .btn-primary:hover{background:#432639;box-shadow:0 8px 24px -10px rgba(46,26,43,.6)}
.sd .btn-outline{border:1px solid var(--plum);color:var(--plum);background:transparent} .sd .btn-outline:hover{background:var(--plum);color:#fff}
.sd .btn-wa{background:#1FAF5A;color:#fff} .sd .btn-wa:hover{background:#178f49}
.sd .btn-light{background:#fff;color:var(--plum)} .sd .btn-light:hover{background:var(--rose)}
.sd .card{background:#fff;border:1px solid var(--line);border-radius:18px;transition:transform .25s ease, box-shadow .25s ease}
.sd .card-lift:hover{transform:translateY(-3px);box-shadow:0 18px 40px -24px rgba(46,26,43,.45)}
.sd .img-zoom img{transition:transform .6s ease} .sd .img-zoom:hover img{transform:scale(1.05)}
.sd .chip{border:1px solid var(--line);border-radius:999px;transition:all .2s ease;background:#fff}
.sd .chip-on{background:var(--plum);border-color:var(--plum);color:#fff}
.sd .reveal{opacity:0;transform:translateY(14px);transition:opacity .7s ease, transform .7s ease}
.sd .reveal.in{opacity:1;transform:none}
.sd .fade-in{animation:sdfade .45s ease both}
@keyframes sdfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.sd .ph{background:linear-gradient(135deg,#EBD3CF,#C9A9B4)}
.sd input,.sd textarea,.sd select{border:1px solid var(--line);border-radius:12px;background:#fff;padding:.75rem 1rem;width:100%;outline:none;transition:border .2s}
.sd input:focus,.sd textarea:focus{border-color:var(--mauve);box-shadow:0 0 0 3px rgba(125,78,99,.15)}
.sd button:focus-visible,.sd a:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.sd .map-bg{background-color:#EFE6E3;background-image:linear-gradient(90deg,rgba(255,255,255,.7) 2px,transparent 2px),linear-gradient(rgba(255,255,255,.7) 2px,transparent 2px);background-size:64px 64px}
@media (prefers-reduced-motion: reduce){ .sd *{animation:none!important;transition:none!important} .sd .reveal{opacity:1;transform:none} }
`;

/* ---------- small building blocks ---------- */
function Photo({ src, alt, className = "" }) {
  const [err, setErr] = useState(false);
  if (err || !src)
    return (
      <div className={`ph flex items-center justify-center ${className}`} aria-label={alt}>
        <Sparkles className="text-white opacity-70" size={28} />
      </div>
    );
  return <img src={src} alt={alt} loading="lazy" onError={() => setErr(true)} className={`object-cover ${className}`} />;
}

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setShown(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>{children}</div>;
}

function SectionHead({ title, sub, center }) {
  return (
    <div className={`mb-10 ${center ? "text-center mx-auto" : ""} max-w-2xl`}>
      <h2 className="display text-4xl md:text-5xl text-plum leading-tight">{title}</h2>
      {sub && <p className="text-muted mt-3 text-base md:text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

function Stars({ n, size = 15 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= n ? "text-gold" : "text-rose"} fill="currentColor" />
      ))}
    </div>
  );
}

function ServiceCard({ s, onBook }) {
  const cat = CATEGORIES.find((c) => c.id === s.cat);
  return (
    <div className="card card-lift overflow-hidden flex flex-col">
      <div className="img-zoom overflow-hidden h-44">
        <Photo src={cat.img} alt={s.name} className="w-full h-full" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-mauve mb-1">{cat.name}</p>
        <h3 className="display text-2xl text-plum leading-snug">{s.name}</h3>
        <p className="text-sm text-muted mt-2 flex-1">{s.desc}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
          <div>
            <p className="text-xs text-muted">Starting from</p>
            <p className="font-semibold text-plum">{inr(s.price)}</p>
          </div>
          <p className="text-sm text-muted flex items-center gap-1"><Clock size={14} />{dur(s.mins)}</p>
        </div>
        <button onClick={() => onBook(s)} className="btn btn-primary mt-4 py-2.5 text-sm w-full">Book now</button>
      </div>
    </div>
  );
}

/* ---------- presentation chrome ---------- */
function FenbrixBar({ page, go }) {
  const isProposal = page === "overview";
  return (
    <div className="bg-plum text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <p className="truncate"><span className="font-semibold">Fenbrix</span><span className="opacity-70 hidden sm:inline"> client demo for {SALON.name}. All contact details and reviews are sample data.</span></p>
        <div className="flex gap-1 shrink-0 bg-white bg-opacity-10 rounded-full p-1">
          <button onClick={() => go("overview")} className={`px-3 py-1 rounded-full transition ${isProposal ? "bg-white text-plum" : "opacity-80 hover:opacity-100"}`}>Proposal</button>
          <button onClick={() => go("home")} className={`px-3 py-1 rounded-full transition ${!isProposal ? "bg-white text-plum" : "opacity-80 hover:opacity-100"}`}>Website demo</button>
        </div>
      </div>
    </div>
  );
}

const NAV = [
  ["home", "Home"], ["services", "Services"], ["mens", "Men"], ["home-services", "Home services"],
  ["gallery", "Gallery"], ["reviews", "Reviews"], ["contact", "Contact"],
];

function SiteHeader({ page, go }) {
  const [open, setOpen] = useState(false);
  const nav = (p) => { go(p); setOpen(false); };
  return (
    <header className="sticky top-0 z-30 bg-petal bg-opacity-95 border-b border-line" style={{ backdropFilter: "blur(8px)" }}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => nav("home")} className="text-left">
          <span className="display text-2xl text-plum font-semibold whitespace-nowrap">{SALON.name}</span>
        </button>
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => nav(id)} className={`transition hover:text-plum ${page === id ? "text-plum font-medium" : "text-muted"}`}>{label}</button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${SALON.phoneDial}`} className="btn btn-outline px-4 py-2 text-sm hidden md:inline-flex"><Phone size={15} />Call</a>
          <button onClick={() => nav("booking")} className="btn btn-primary px-4 py-2 text-sm whitespace-nowrap"><span className="sm:hidden">Book</span><span className="hidden sm:inline">Book appointment</span></button>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-plum" aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-line bg-petal fade-in">
          {NAV.map(([id, label]) => (
            <button key={id} onClick={() => nav(id)} className="block w-full text-left px-5 py-3 border-b border-line text-plum">{label}</button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- PROPOSAL OVERVIEW ---------- */
function Overview({ go }) {
  const total = PRICING.reduce((a, [, v]) => a + v, 0);
  const flow = ["Visit website", "Select service", "Pick date & time", "Enter details", "Confirm booking", "WhatsApp confirmation", "Salon receives booking"];
  return (
    <div className="fade-in">
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-16">
        <p className="text-mauve text-sm mb-3">Fenbrix proposal and live demo</p>
        <h1 className="display text-5xl md:text-7xl text-plum leading-none max-w-4xl">Salon website & digital growth</h1>
        <p className="text-muted text-lg mt-5 max-w-2xl">Website revamp, online booking, local SEO and a customer conversion system for {SALON.name}.</p>

        <div className="grid md:grid-cols-12 gap-4 mt-10">
          <div className="md:col-span-7 bg-plum text-white rounded-3xl p-7 md:p-9">
            <p className="text-rose text-sm">Project</p>
            <p className="display text-3xl md:text-4xl mt-1">{PROJECT.name}</p>
            <p className="text-rose text-sm mt-7">Objective</p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-lg">
              {["More visibility", "More enquiries", "More bookings"].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="bg-white bg-opacity-10 rounded-full px-4 py-1.5">{t}</span>
                  {i < 2 && <ChevronRight size={18} className="text-rose" />}
                </span>
              ))}
            </div>
            <p className="text-rose text-sm mt-7">Features</p>
            <p className="mt-1 leading-relaxed">Booking, services, gallery, reviews, WhatsApp, maps and local SEO</p>
          </div>
          <div className="md:col-span-5 grid grid-rows-2 gap-4">
            <div className="card p-7 flex flex-col justify-between">
              <p className="text-muted text-sm">Package</p>
              <div>
                <p className="display text-6xl text-plum leading-none">{PROJECT.price}</p>
                <p className="text-sm text-muted mt-2"><span className="line-through">{PROJECT.value}</span> total value, you save {PROJECT.saving}</p>
              </div>
            </div>
            <div className="card p-7 flex flex-col justify-between">
              <p className="text-muted text-sm">Timeline</p>
              <p className="display text-4xl text-plum">{PROJECT.timeline}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-8">
          <button onClick={() => go("home")} className="btn btn-primary px-7 py-3.5">Explore the website demo</button>
          <button onClick={() => go("booking")} className="btn btn-outline px-7 py-3.5">Try the booking flow</button>
        </div>
      </section>

      <section className="bg-blush py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHead title="What will change?" sub="Eight upgrades your customers will notice from the first visit." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHAT_CHANGES.map(({ icon: Icon, title, text }) => (
              <Reveal key={title}>
                <div className="card p-6 h-full">
                  <div className="w-11 h-11 rounded-full bg-blush flex items-center justify-center text-mauve mb-5"><Icon size={20} /></div>
                  <h3 className="display text-2xl text-plum">{title}</h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionHead title="Before and after" />
          <div className="card overflow-hidden">
            <div className="grid grid-cols-2 text-sm font-medium">
              <p className="p-4 bg-blush text-muted">Today</p><p className="p-4 bg-plum text-white">With the new website</p>
            </div>
            {[
              ["Bookings by call or message only", "Online booking, 24/7"],
              ["Services and prices unclear", "Organised menu with prices"],
              ["Work shown only on Instagram", "Filterable portfolio"],
              ["Reviews scattered", "Reviews on your own site"],
              ["Customers hunt for a number", "One-tap WhatsApp and call"],
              ["Limited local search presence", "Maps, Business Profile, local SEO"],
              ["Home & men's services hidden", "Dedicated bookable sections"],
            ].map(([a, b]) => (
              <div key={a} className="grid grid-cols-2 text-sm border-t border-line">
                <p className="p-4 text-muted">{a}</p>
                <p className="p-4 text-plum flex gap-2"><Check size={16} className="text-mauve shrink-0 mt-0.5" />{b}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHead title="How a booking happens" />
          <ol className="space-y-3">
            {flow.map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full border border-plum text-plum flex items-center justify-center text-sm font-medium shrink-0">{i + 1}</span>
                <span className="card flex-1 px-5 py-3 text-plum">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-plum text-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="display text-4xl md:text-5xl">Your investment</h2>
          <p className="text-rose mt-3">Everything below is included in one package price.</p>
          <div className="grid md:grid-cols-5 gap-6 mt-10">
            <div className="md:col-span-3 bg-white bg-opacity-5 rounded-3xl p-6 md:p-8">
              {PRICING.map(([label, v]) => (
                <div key={label} className="flex justify-between py-3 border-b border-white border-opacity-10 text-sm md:text-base">
                  <span>{label}</span><span className="text-rose">{inr(v)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-medium"><span>Total value</span><span className="line-through opacity-70">{inr(total)}</span></div>
            </div>
            <div className="md:col-span-2 bg-white text-plum rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <p className="text-sm text-muted">Fenbrix package price</p>
                <p className="display text-6xl leading-none mt-2">{PROJECT.price}</p>
                <p className="mt-3 inline-block bg-blush text-mauve rounded-full px-3 py-1 text-sm">You save {PROJECT.saving}</p>
              </div>
              <div className="text-sm text-muted mt-8 space-y-1">
                <p>50% on confirmation</p><p>30% on design / development approval</p><p>20% on final deployment</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-rose mt-6 max-w-3xl">Not included: domain, hosting, paid plugins, payment gateway charges and external software subscriptions, if required. GST extra as applicable. Monthly SEO, social media, content, ads and maintenance are optional add-ons.</p>
        </div>
      </section>
    </div>
  );
}

/* ---------- WEBSITE: HOME ---------- */
function HomePage({ go, book }) {
  const featured = ["s1", "s5", "s10", "s13", "s18", "s22"].map((id) => SERVICES.find((s) => s.id === id));
  return (
    <div className="fade-in">
      {/* hero */}
      <section className="max-w-7xl mx-auto px-4 pt-10 md:pt-16 pb-20 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <p className="text-mauve flex items-center gap-2 text-sm"><MapPin size={15} />{SALON.area}, {SALON.city}</p>
          <h1 className="display text-5xl md:text-7xl text-plum leading-none mt-4">Look like yourself, on your best day.</h1>
          <p className="text-muted text-lg mt-6 max-w-md leading-relaxed">Hair, colour, makeup, skincare and men's grooming by senior stylists, in our studio or at your home.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <button onClick={() => go("booking")} className="btn btn-primary px-7 py-3.5"><Calendar size={18} />Book your appointment</button>
            <a href={waLink(defaultWa)} target="_blank" rel="noreferrer" className="btn btn-wa px-7 py-3.5"><MessageCircle size={18} />WhatsApp us</a>
          </div>
          <div className="flex items-center gap-3 mt-8 text-sm text-muted">
            <Stars n={5} /><span>4.9 from 320+ Google reviews (sample)</span>
          </div>
        </div>
        <div className="md:col-span-6 grid grid-cols-5 gap-4 items-end">
          <Photo src={PHOTOS.hero} alt="Salon interior" className="arch col-span-3 w-full h-80 md:h-96" />
          <div className="col-span-2 space-y-4">
            <Photo src={PHOTOS.makeup} alt="Makeup artistry" className="arch w-full h-44 md:h-52" />
            <div className="bg-plum text-white rounded-2xl p-4 text-sm">
              <p className="display text-2xl">12 yrs</p><p className="text-rose">of styling in {SALON.city}</p>
            </div>
          </div>
        </div>
      </section>

      {/* categories strip */}
      <section className="border-y border-line bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-3 overflow-x-auto">
          {CATEGORIES.map(({ id, name, icon: Icon }) => (
            <button key={id} onClick={() => go("services", id)} className="chip px-4 py-2 text-sm whitespace-nowrap flex items-center gap-2 text-plum hover:border-plum">
              <Icon size={15} className="text-mauve" />{name}
            </button>
          ))}
        </div>
      </section>

      {/* featured */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead title="Most-booked services" sub="Clear starting prices, so you know before you walk in." />
          <button onClick={() => go("services")} className="btn btn-outline px-5 py-2.5 text-sm mb-10">View all services</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((s) => <Reveal key={s.id}><ServiceCard s={s} onBook={book} /></Reveal>)}
        </div>
      </section>

      {/* why us */}
      <section className="bg-blush py-20">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <Photo src={PHOTOS.interior} alt="Styling floor" className="w-full h-96 rounded-3xl" />
          <div>
            <SectionHead title="Why clients choose us" />
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                [Award, "Senior stylists", "Every colour and bridal look is led by an artist with 8+ years' experience."],
                [ShieldCheck, "Hygiene first", "Sterilised tools, single-use kits and fresh linen for every client."],
                [Droplets, "Professional products", "Salon-grade brands, with ammonia-free and vegan options."],
                [Home, "We come to you", "Bridal, party and grooming services at your home."],
              ].map(([Icon, t, d]) => (
                <div key={t}>
                  <Icon className="text-mauve" size={22} />
                  <h3 className="display text-2xl text-plum mt-3">{t}</h3>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* gallery preview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead title="Recent work" />
          <button onClick={() => go("gallery")} className="btn btn-outline px-5 py-2.5 text-sm mb-10">Open gallery</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY.slice(0, 4).map((g, i) => (
            <div key={i} className={`img-zoom overflow-hidden ${i % 2 ? "rounded-2xl" : "arch"}`}>
              <Photo src={g.img} alt={g.label} className="w-full h-56 md:h-72" />
            </div>
          ))}
        </div>
      </section>

      <ReviewsBlock compact go={go} />
      <LocationBlock />
    </div>
  );
}

/* ---------- SERVICES ---------- */
function ServicesPage({ initialCat, book }) {
  const [cat, setCat] = useState(initialCat || "all");
  const [q, setQ] = useState("");
  useEffect(() => setCat(initialCat || "all"), [initialCat]);
  const list = SERVICES.filter((s) => (cat === "all" || s.cat === cat) && s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fade-in max-w-7xl mx-auto px-4 py-14">
      <SectionHead title="Services & prices" sub="Starting prices shown. Final price depends on hair length and consultation." />
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button onClick={() => setCat("all")} className={`chip px-4 py-2 text-sm whitespace-nowrap ${cat === "all" ? "chip-on" : "text-plum"}`}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={`chip px-4 py-2 text-sm whitespace-nowrap ${cat === c.id ? "chip-on" : "text-plum"}`}>{c.name}</button>
          ))}
        </div>
        <div className="relative md:w-64 shrink-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" style={{ transform: "translateY(-50%)" }} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services" style={{ paddingLeft: "2.25rem" }} />
        </div>
      </div>
      {list.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map((s) => <ServiceCard key={s.id} s={s} onBook={book} />)}
        </div>
      ) : (
        <p className="text-muted py-16 text-center">No services match "{q}". Try "hair", "facial" or "makeup".</p>
      )}
    </div>
  );
}

/* ---------- DEDICATED: MEN / HOME ---------- */
function DedicatedPage({ kind, book, go }) {
  const isMen = kind === "mens";
  const list = SERVICES.filter((s) => (isMen ? s.cat.startsWith("mens") : s.cat === "home"));
  const [picked, setPicked] = useState([]);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const total = list.filter((s) => picked.includes(s.id)).reduce((a, s) => a + s.price, 0);
  return (
    <div className="fade-in">
      <section className={`${isMen ? "bg-plum text-white" : "bg-blush"} py-16`}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className={`display text-5xl md:text-6xl leading-none ${isMen ? "" : "text-plum"}`}>
              {isMen ? "Grooming, done properly." : "The salon, at your doorstep."}
            </h1>
            <p className={`mt-5 text-lg max-w-md ${isMen ? "text-rose" : "text-muted"}`}>
              {isMen
                ? "Haircuts, beard work, men's skincare and hair treatments, with a menu built for men."
                : `Bridal, party, hair and grooming services at home across ${SALON.homeServiceAreas.join(", ")}.`}
            </p>
            {!isMen && (
              <div className="flex flex-wrap gap-2 mt-6">
                {SALON.homeServiceAreas.map((a) => <span key={a} className="chip px-3 py-1 text-sm text-plum flex items-center gap-1"><MapPin size={13} />{a}</span>)}
              </div>
            )}
          </div>
          <Photo src={isMen ? PHOTOS.barber : PHOTOS.home} alt="" className="arch w-full h-72 md:h-96" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        {isMen ? (
          <>
            {[["mens-hair", "Hair & hair treatments"], ["mens-grooming", "Beard & skincare"]].map(([c, t]) => (
              <div key={c} className="mb-12">
                <h2 className="display text-3xl text-plum mb-6">{t}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {list.filter((s) => s.cat === c).map((s) => <ServiceCard key={s.id} s={s} onBook={book} />)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="display text-3xl text-plum mb-2">Choose your home services</h2>
              <p className="text-muted mb-6">Select one or more. A travel fee may apply outside listed areas.</p>
              <div className="space-y-3">
                {list.map((s) => {
                  const on = picked.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => toggle(s.id)} className={`card w-full text-left p-5 flex items-center gap-4 ${on ? "border-plum" : ""}`} style={on ? { borderColor: "var(--plum)" } : {}}>
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${on ? "bg-plum border-plum text-white" : "border-line"}`}>{on && <Check size={14} />}</span>
                      <span className="flex-1">
                        <span className="display text-xl text-plum block">{s.name}</span>
                        <span className="text-sm text-muted">{s.desc}</span>
                      </span>
                      <span className="text-right shrink-0">
                        <span className="block font-semibold text-plum">{inr(s.price)}</span>
                        <span className="text-xs text-muted">{dur(s.mins)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="card p-6 h-fit lg:sticky lg:top-24">
              <h3 className="display text-2xl text-plum">Your selection</h3>
              {picked.length === 0 ? (
                <p className="text-sm text-muted mt-3">Select a service to see your estimate.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm">
                  {list.filter((s) => picked.includes(s.id)).map((s) => (
                    <li key={s.id} className="flex justify-between"><span>{s.name}</span><span>{inr(s.price)}</span></li>
                  ))}
                </ul>
              )}
              <div className="flex justify-between border-t border-line mt-4 pt-4 font-semibold text-plum"><span>Estimate</span><span>{inr(total)}</span></div>
              <button disabled={!picked.length} onClick={() => book(list.find((s) => s.id === picked[0]), true)} className="btn btn-primary w-full py-3 mt-5" style={!picked.length ? { opacity: 0.45, cursor: "not-allowed" } : {}}>Book home visit</button>
              <a href={waLink(`Hi ${SALON.name}, I'm interested in home services: ${list.filter((s) => picked.includes(s.id)).map((s) => s.name).join(", ") || "please share details"}.`)} target="_blank" rel="noreferrer" className="btn btn-wa w-full py-3 mt-3"><MessageCircle size={17} />Ask on WhatsApp</a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- BOOKING ---------- */
function useDays() {
  return useMemo(() => {
    const out = [];
    const d = new Date();
    for (let i = 0; i < 14; i++) {
      const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      out.push(x);
    }
    return out;
  }, []);
}
const SLOTS = ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "1:00 PM", "2:00 PM", "2:30 PM", "3:30 PM", "4:00 PM", "5:00 PM", "5:30 PM", "6:30 PM", "7:00 PM"];
const isBooked = (day, i) => ((day.getDate() * 7 + i * 3) % 5 === 0);

function BookingPage({ preset, go }) {
  const days = useDays();
  const [step, setStep] = useState(preset?.service ? 3 : 1);
  const [cat, setCat] = useState(preset?.service?.cat || "");
  const [service, setService] = useState(preset?.service || null);
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", wa: "", same: true, address: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);

  useEffect(() => {
    if (preset?.service) { setCat(preset.service.cat); setService(preset.service); setStep(3); }
  }, [preset]);

  const isHome = cat === "home";
  const steps = ["Category", "Service", "Date & time", "Your details", "Confirm"];
  const fmtDay = (d) => d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name.";
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, "").slice(-10)) || form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit mobile number.";
    if (!form.same && form.wa.replace(/\D/g, "").length < 10) e.wa = "Enter a 10-digit WhatsApp number.";
    if (isHome && form.address.trim().length < 8) e.address = "Enter the address for the home visit.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const confirm = () => {
    const id = "MA" + Math.floor(100000 + Math.random() * 900000);
    setDone({ id });
  };

  const reset = () => { setStep(1); setCat(""); setService(null); setDay(null); setSlot(""); setForm({ name: "", phone: "", wa: "", same: true, address: "", notes: "" }); setDone(null); };

  if (done) {
    const msg = `Hi ${SALON.name}, I just booked ${service.name} on ${fmtDay(day)} at ${slot}. Booking ID: ${done.id}. Name: ${form.name}.`;
    return (
      <div className="fade-in max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-plum text-white flex items-center justify-center mx-auto"><Check size={36} /></div>
        <h1 className="display text-5xl text-plum mt-6">Booking requested</h1>
        <p className="text-muted mt-3">Thank you, {form.name.split(" ")[0]}. We've received your request and will confirm on WhatsApp shortly.</p>
        <div className="card text-left p-6 mt-8 space-y-3 text-sm">
          {[["Booking ID", done.id], ["Service", service.name], ["Date", fmtDay(day)], ["Time", slot], ["Duration", dur(service.mins)], ["Starting price", inr(service.price)], ...(isHome ? [["Address", form.address]] : [["Location", SALON.address]])].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4"><span className="text-muted">{k}</span><span className="text-plum font-medium text-right">{v}</span></div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
          <a href={waLink(msg)} target="_blank" rel="noreferrer" className="btn btn-wa px-6 py-3"><MessageCircle size={18} />Confirm on WhatsApp</a>
          <button onClick={reset} className="btn btn-outline px-6 py-3">Book another service</button>
        </div>
        <p className="text-xs text-muted mt-8">Demo: in the live site, the salon receives these details instantly by WhatsApp and email.</p>
      </div>
    );
  }

  const canNext = (step === 1 && cat) || (step === 2 && service) || (step === 3 && day && slot) || step === 4;
  const next = () => { if (step === 4 && !validate()) return; setStep(step + 1); };

  return (
    <div className="fade-in max-w-6xl mx-auto px-4 py-12">
      <SectionHead title="Book an appointment" sub="Takes about a minute. We'll confirm on WhatsApp." />
      {/* progress */}
      <ol className="flex gap-2 mb-8 overflow-x-auto">
        {steps.map((s, i) => {
          const n = i + 1, active = step === n, past = step > n;
          return (
            <li key={s} className="flex items-center gap-2 shrink-0">
              <button disabled={!past} onClick={() => setStep(n)} className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full ${active ? "bg-plum text-white" : past ? "bg-blush text-plum" : "text-muted"}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${active ? "bg-white text-plum" : past ? "bg-plum text-white" : "border border-line"}`}>{past ? <Check size={12} /> : n}</span>{s}
              </button>
              {n < 5 && <ChevronRight size={14} className="text-muted" />}
            </li>
          );
        })}
      </ol>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-5 md:p-8">
          {step === 1 && (
            <div className="fade-in">
              <h2 className="display text-3xl text-plum mb-5">What would you like?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CATEGORIES.map(({ id, name, icon: Icon }) => (
                  <button key={id} onClick={() => { setCat(id); setService(null); setStep(2); }} className={`rounded-2xl border p-4 text-left transition hover:border-plum ${cat === id ? "bg-blush border-plum" : "border-line"}`}>
                    <Icon size={20} className="text-mauve" />
                    <p className="mt-3 text-sm font-medium text-plum">{name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="fade-in">
              <h2 className="display text-3xl text-plum mb-5">Choose a service</h2>
              <div className="space-y-3">
                {SERVICES.filter((s) => s.cat === cat).map((s) => (
                  <button key={s.id} onClick={() => { setService(s); setStep(3); }} className={`w-full text-left rounded-2xl border p-4 flex justify-between gap-4 transition hover:border-plum ${service?.id === s.id ? "bg-blush border-plum" : "border-line"}`}>
                    <span><span className="font-medium text-plum block">{s.name}</span><span className="text-sm text-muted">{s.desc}</span></span>
                    <span className="text-right shrink-0"><span className="block font-semibold text-plum">{inr(s.price)}</span><span className="text-xs text-muted">{dur(s.mins)}</span></span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="fade-in">
              <h2 className="display text-3xl text-plum mb-5">Pick a date</h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => {
                  const closed = d.getDay() === 1; // Mondays closed (demo)
                  const on = day && d.toDateString() === day.toDateString();
                  return (
                    <button key={d.toISOString()} disabled={closed} onClick={() => { setDay(d); setSlot(""); }} className={`shrink-0 w-16 rounded-2xl border py-3 text-center transition ${on ? "bg-plum text-white border-plum" : closed ? "border-line opacity-40 cursor-not-allowed" : "border-line hover:border-plum text-plum"}`}>
                      <span className="block text-xs">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                      <span className="block display text-2xl">{d.getDate()}</span>
                      <span className="block text-xs">{closed ? "Closed" : d.toLocaleDateString("en-IN", { month: "short" })}</span>
                    </button>
                  );
                })}
              </div>
              <h3 className="display text-2xl text-plum mt-8 mb-4">Available times</h3>
              {!day ? (
                <p className="text-sm text-muted">Select a date to see open slots.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {SLOTS.map((t, i) => {
                    const booked = isBooked(day, i);
                    return (
                      <button key={t} disabled={booked} onClick={() => setSlot(t)} className={`rounded-xl border py-2.5 text-sm transition ${slot === t ? "bg-plum text-white border-plum" : booked ? "border-line text-muted line-through opacity-50 cursor-not-allowed" : "border-line text-plum hover:border-plum"}`}>{t}</button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {step === 4 && (
            <div className="fade-in space-y-4">
              <h2 className="display text-3xl text-plum mb-1">Your details</h2>
              <Field label="Full name" error={errors.name}><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Ananya Sharma" /></Field>
              <Field label="Phone number" error={errors.phone}><input inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" /></Field>
              <label className="flex items-center gap-2 text-sm text-plum cursor-pointer">
                <input type="checkbox" checked={form.same} onChange={(e) => setForm({ ...form, same: e.target.checked })} style={{ width: 16, height: 16 }} />
                My WhatsApp number is the same
              </label>
              {!form.same && <Field label="WhatsApp number" error={errors.wa}><input inputMode="tel" value={form.wa} onChange={(e) => setForm({ ...form, wa: e.target.value })} placeholder="10-digit WhatsApp number" /></Field>}
              {isHome && <Field label="Address for home visit" error={errors.address}><textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House no., street, area, city" /></Field>}
              <Field label="Notes (optional)"><textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Hair length, preferred stylist, allergies…" /></Field>
            </div>
          )}
          {step === 5 && (
            <div className="fade-in">
              <h2 className="display text-3xl text-plum mb-5">Check and confirm</h2>
              <div className="space-y-3 text-sm">
                {[["Service", service.name], ["Date", fmtDay(day)], ["Time", slot], ["Name", form.name], ["Phone", form.phone], ["WhatsApp", form.same ? form.phone : form.wa], ...(isHome ? [["Home visit address", form.address]] : [])].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line pb-3"><span className="text-muted">{k}</span><span className="text-plum font-medium text-right">{v}</span></div>
                ))}
              </div>
              <p className="text-xs text-muted mt-4">Pay at the salon after your service. Free rescheduling up to 4 hours before.</p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? <button onClick={() => setStep(step - 1)} className="btn text-plum px-3 py-2"><ChevronLeft size={18} />Back</button> : <span />}
            {step >= 3 && step < 5 && <button disabled={!canNext} onClick={next} className="btn btn-primary px-7 py-3" style={!canNext ? { opacity: 0.45, cursor: "not-allowed" } : {}}>Continue</button>}
            {step === 5 && <button onClick={confirm} className="btn btn-primary px-7 py-3"><Check size={18} />Confirm booking</button>}
          </div>
        </div>

        {/* summary */}
        <aside className="card p-6 h-fit lg:sticky lg:top-24">
          <h3 className="display text-2xl text-plum">Summary</h3>
          <div className="mt-4 space-y-3 text-sm">
            <Row k="Category" v={CATEGORIES.find((c) => c.id === cat)?.name} />
            <Row k="Service" v={service?.name} />
            <Row k="Date" v={day && fmtDay(day)} />
            <Row k="Time" v={slot} />
          </div>
          {service && <div className="flex justify-between border-t border-line mt-4 pt-4 font-semibold text-plum"><span>From</span><span>{inr(service.price)}</span></div>}
          <p className="text-xs text-muted mt-5">Prefer to talk?</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <a href={`tel:${SALON.phoneDial}`} className="btn btn-outline py-2 text-sm"><Phone size={15} />Call</a>
            <a href={waLink(defaultWa)} target="_blank" rel="noreferrer" className="btn btn-wa py-2 text-sm"><MessageCircle size={15} />Chat</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
const Row = ({ k, v }) => (<div className="flex justify-between gap-3"><span className="text-muted">{k}</span><span className={v ? "text-plum font-medium text-right" : "text-muted"}>{v || "Not selected"}</span></div>);
function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm text-plum font-medium block mb-1.5">{label}</span>
      {children}
      {error && <span className="text-xs mt-1 block" style={{ color: "#B3261E" }}>{error}</span>}
    </label>
  );
}

/* ---------- GALLERY ---------- */
function GalleryPage() {
  const cats = ["All", "Hair", "Colour", "Makeup", "Skin", "Men", "Salon"];
  const [f, setF] = useState("All");
  const [open, setOpen] = useState(null);
  const list = GALLERY.filter((g) => f === "All" || g.cat === f);
  return (
    <div className="fade-in max-w-7xl mx-auto px-4 py-14">
      <SectionHead title="Portfolio" sub="Real work from our chairs. Tap any photo to view it larger." />
      <div className="flex gap-2 overflow-x-auto mb-8">
        {cats.map((c) => <button key={c} onClick={() => setF(c)} className={`chip px-4 py-2 text-sm ${f === c ? "chip-on" : "text-plum"}`}>{c}</button>)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((g, i) => (
          <button key={g.label} onClick={() => setOpen(g)} className={`img-zoom overflow-hidden relative group text-left ${i % 3 === 0 ? "arch" : "rounded-2xl"}`}>
            <Photo src={g.img} alt={g.label} className={`w-full ${i % 3 === 0 ? "h-80" : "h-64"}`} />
            <span className="absolute left-3 bottom-3 bg-white text-plum text-xs px-3 py-1 rounded-full">{g.label}</span>
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 fade-in" onClick={() => setOpen(null)}>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <Photo src={open.img.replace("w=900", "w=1600")} alt={open.label} className="w-full rounded-2xl" />
            <div className="flex justify-between items-center mt-3 text-white">
              <p className="display text-2xl">{open.label}</p>
              <button onClick={() => setOpen(null)} className="btn btn-light px-4 py-2 text-sm"><X size={16} />Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- REVIEWS ---------- */
function ReviewsBlock({ compact, go }) {
  const [reviews, setReviews] = useState(REVIEWS);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (!rating) return;
    setReviews([{ name: name || "You", service: "Recent visit", rating, text: text || "Lovely experience.", when: "Just now" }, ...reviews]);
    setSent(true);
  };
  const shown = compact ? reviews.slice(0, 3) : reviews;
  return (
    <section className={compact ? "bg-blush py-20" : "py-14"}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead title="What clients say" sub="Sample reviews for the demo. The live site can pull in your Google reviews." />
          {compact && <button onClick={() => go("reviews")} className="btn btn-outline px-5 py-2.5 text-sm mb-10">All reviews</button>}
        </div>
        <div className={`grid gap-5 ${compact ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {shown.map((r, i) => (
            <div key={i} className="card p-6 fade-in">
              <Stars n={r.rating} />
              <p className="display text-xl text-plum mt-4 leading-snug">"{r.text}"</p>
              <div className="flex justify-between text-sm mt-5">
                <span className="text-plum font-medium">{r.name}</span>
                <span className="text-muted">{r.service}, {r.when}</span>
              </div>
            </div>
          ))}
        </div>
        {!compact && (
          <div className="card p-6 md:p-8 mt-10 max-w-2xl">
            <h3 className="display text-3xl text-plum">Rate your experience</h3>
            <p className="text-sm text-muted mt-1">After each visit, clients get a WhatsApp link to this form.</p>
            {sent ? (
              <div className="mt-6 flex items-center gap-3 text-plum fade-in"><Heart className="text-mauve" fill="currentColor" />Thank you. Your review has been added above.</div>
            ) : (
              <div className="mt-5 space-y-4">
                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button key={i} onMouseEnter={() => setHover(i)} onClick={() => setRating(i)} aria-label={`${i} stars`} className="p-1 transition hover:scale-110">
                      <Star size={30} className={(hover || rating) >= i ? "text-gold" : "text-rose"} fill="currentColor" />
                    </button>
                  ))}
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                <textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Tell us about your visit" />
                <button onClick={submit} disabled={!rating} className="btn btn-primary px-6 py-3" style={!rating ? { opacity: 0.45, cursor: "not-allowed" } : {}}>Submit review</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- LOCATION / MAP ---------- */
function LocationBlock() {
  const dir = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SALON.address)}`;
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-5 gap-8 items-stretch">
      <div className="lg:col-span-2 flex flex-col justify-center">
        <SectionHead title="Visit the studio" />
        <div className="space-y-4 text-plum">
          <p className="flex gap-3"><MapPin className="text-mauve shrink-0" size={20} />{SALON.address}</p>
          <p className="flex gap-3"><Clock className="text-mauve shrink-0" size={20} />{SALON.hours}</p>
          <p className="flex gap-3"><Phone className="text-mauve shrink-0" size={20} />{SALON.phoneDisplay}</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-8">
          <a href={dir} target="_blank" rel="noreferrer" className="btn btn-primary px-6 py-3"><Navigation size={17} />Get directions</a>
          <a href={`tel:${SALON.phoneDial}`} className="btn btn-outline px-6 py-3"><Phone size={17} />Call now</a>
        </div>
      </div>
      <div className="lg:col-span-3 map-bg rounded-3xl relative overflow-hidden min-h-80" style={{ minHeight: 340 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 220 C150 200 250 260 600 180" stroke="#fff" strokeWidth="18" fill="none" />
          <path d="M320 0 L280 360" stroke="#fff" strokeWidth="14" fill="none" />
          <path d="M0 90 L600 120" stroke="#fff" strokeWidth="8" fill="none" />
          <rect x="60" y="250" width="120" height="70" rx="10" fill="#D9E6D3" />
          <rect x="420" y="20" width="140" height="80" rx="10" fill="#D9E6D3" />
        </svg>
        <div className="absolute left-1/2 top-1/2 flex flex-col items-center" style={{ transform: "translate(-50%,-100%)" }}>
          <div className="bg-white rounded-xl px-4 py-2 shadow-lg text-sm text-plum font-medium mb-2 whitespace-nowrap">{SALON.name}<span className="text-muted font-normal"> | 4.9 ★</span></div>
          <MapPin size={40} className="text-plum" fill="#EBD3CF" />
        </div>
        <p className="absolute bottom-3 right-4 text-xs text-muted bg-white bg-opacity-80 px-2 py-1 rounded">Map preview. Live site embeds Google Maps.</p>
      </div>
    </section>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="fade-in">
      <LocationBlock />
      <section className="bg-blush py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
          <div className="card p-6 md:p-8">
            <h2 className="display text-3xl text-plum">Send an enquiry</h2>
            <p className="text-sm text-muted mt-1">For bridal packages, group bookings or questions.</p>
            {sent ? (
              <p className="mt-6 text-plum flex gap-2 items-center fade-in"><Check className="text-mauve" />Thanks. We'll reply within working hours.</p>
            ) : (
              <div className="mt-5 space-y-3">
                <input placeholder="Name" /><input placeholder="Phone" inputMode="tel" /><textarea rows={3} placeholder="How can we help?" />
                <button onClick={() => setSent(true)} className="btn btn-primary px-6 py-3">Send enquiry</button>
              </div>
            )}
          </div>
          <div>
            <h2 className="display text-3xl text-plum">How you'll appear on Google</h2>
            <p className="text-sm text-muted mt-1 mb-5">Local SEO preview. Titles, descriptions and business details are set up to match your Google Business Profile. Rankings are not guaranteed.</p>
            <div className="card p-5 text-sm">
              <p className="text-muted flex items-center gap-2"><Search size={14} />best salon near {SALON.area} {SALON.city}</p>
              <div className="mt-4">
                <p className="text-xs text-muted">maisonaura.demo › services</p>
                <p className="text-lg" style={{ color: "#1a0dab" }}>{SALON.name} | Hair, Makeup & Grooming Salon in {SALON.area}, {SALON.city}</p>
                <p className="text-muted mt-1">Book haircuts, balayage, bridal makeup, facials and men's grooming online. Home services across {SALON.city}. Open {SALON.hours}.</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted"><Stars n={5} size={12} />4.9 (320) · Beauty salon</div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
              {["LocalBusiness schema", "Service + area pages", "Unique titles & meta", "Maps & directions links"].map((t) => (
                <p key={t} className="flex gap-2 items-center text-plum"><Check size={15} className="text-mauve" />{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- FOOTER & FLOATING ---------- */
function Footer({ go }) {
  return (
    <footer className="bg-plum text-white pt-16 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="display text-4xl">{SALON.name}</p>
          <p className="text-rose mt-2 max-w-sm">{SALON.tagline} in {SALON.area}, {SALON.city}. Studio and home appointments.</p>
          <button onClick={() => go("booking")} className="btn btn-light px-6 py-3 mt-6">Book appointment</button>
        </div>
        <div className="text-sm space-y-2">
          <p className="text-rose mb-3">Explore</p>
          {NAV.map(([id, l]) => <button key={id} onClick={() => go(id)} className="block opacity-80 hover:opacity-100">{l}</button>)}
        </div>
        <div className="text-sm space-y-3">
          <p className="text-rose mb-3">Contact (demo data)</p>
          <a href={`tel:${SALON.phoneDial}`} className="flex gap-2 opacity-80 hover:opacity-100"><Phone size={15} />{SALON.phoneDisplay}</a>
          <a href={waLink(defaultWa)} target="_blank" rel="noreferrer" className="flex gap-2 opacity-80 hover:opacity-100"><MessageCircle size={15} />WhatsApp</a>
          <p className="flex gap-2 opacity-80"><MapPin size={15} className="shrink-0" />{SALON.address}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white border-opacity-10 text-xs text-rose flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} {SALON.name}. Demo website.</span>
        <span>Designed & developed by Fenbrix, www.fenbrix.in</span>
      </div>
    </footer>
  );
}

function FloatingActions({ go }) {
  return (
    <>
      <a href={waLink(defaultWa)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="hidden md:flex fixed right-6 bottom-6 z-40 w-14 h-14 rounded-full items-center justify-center text-white shadow-lg transition hover:scale-105"
        style={{ background: "#1FAF5A" }}>
        <MessageCircle size={26} />
      </a>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-line grid grid-cols-3 text-sm">
        <a href={`tel:${SALON.phoneDial}`} className="flex flex-col items-center py-2.5 text-plum"><Phone size={19} />Call</a>
        <button onClick={() => go("booking")} className="flex flex-col items-center py-2.5 bg-plum text-white"><Calendar size={19} />Book</button>
        <a href={waLink(defaultWa)} target="_blank" rel="noreferrer" className="flex flex-col items-center py-2.5" style={{ color: "#1FAF5A" }}><MessageCircle size={19} />WhatsApp</a>
      </div>
    </>
  );
}

/* ---------- APP ---------- */
export default function SalonDemo() {
  const [page, setPage] = useState("overview");
  const [svcCat, setSvcCat] = useState(null);
  const [preset, setPreset] = useState(null);

  const go = (p, cat) => {
    if (p === "services") setSvcCat(cat || null);
    if (p === "booking" && !cat) setPreset(null);
    setPage(p);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const book = (service) => { setPreset({ service, t: Date.now() }); setPage("booking"); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="sd min-h-screen">
      <style>{CSS}</style>
      <FenbrixBar page={page} go={go} />
      {page === "overview" ? (
        <>
          <Overview go={go} />
          <footer className="bg-petal border-t border-line py-10 text-center text-sm text-muted px-4">
            <p className="display text-2xl text-plum">Website. Visibility. Leads. Growth.</p>
            <p className="mt-2">Fenbrix, Digital Growth & Technology Partner. info@fenbrix.in | sales@fenbrix.in | www.fenbrix.in</p>
          </footer>
        </>
      ) : (
        <>
          <SiteHeader page={page} go={go} />
          <main>
            {page === "home" && <HomePage go={go} book={book} />}
            {page === "services" && <ServicesPage initialCat={svcCat} book={book} />}
            {page === "booking" && <BookingPage preset={preset} go={go} />}
            {page === "gallery" && <GalleryPage />}
            {page === "reviews" && <ReviewsBlock />}
            {page === "mens" && <DedicatedPage kind="mens" book={book} go={go} />}
            {page === "home-services" && <DedicatedPage kind="home" book={book} go={go} />}
            {page === "contact" && <ContactPage />}
          </main>
          <Footer go={go} />
          <FloatingActions go={go} />
        </>
      )}
    </div>
  );
}
