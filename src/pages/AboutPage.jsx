import { ABOUT, BUSINESS, PHOTOS } from "../config/business";
import PageHeader from "../components/PageHeader";
import { EditableHint, Photo } from "../components/ui";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import TrustStrip from "../components/sections/TrustStrip";
import Location from "../components/sections/Location";
import CtaBand from "../components/sections/CtaBand";

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow={`About · ${BUSINESS.type}`} title={`About ${BUSINESS.businessName}`} img={PHOTOS.salonModern}
        sub={`${BUSINESS.pillars.join(" • ")}, for women and men in Kalkaji, New Delhi.`} />

      <section className="container-x py-16 md:py-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <p className="eyebrow text-gold-dark mb-3">Unisex salon in Kalkaji</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">Hair, beauty, grooming & care near Nehru Enclave</h2>
          <p className="text-lg text-muted mt-6 leading-relaxed">{ABOUT.intro}</p>
          {ABOUT.story
            ? <p className="text-muted mt-4 leading-relaxed">{ABOUT.story}</p>
            : <EditableHint className="mt-6">The salon's story, team and specialities (supplied by the client)</EditableHint>}
          <div className="grid grid-cols-2 gap-3 mt-8 text-sm">
            {["Women's hair", "Beauty & skincare", "Nails", "Men's grooming", "Home services", "Online appointment requests"].map((t) => (
              <span key={t} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold" />{t}</span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6 grid grid-cols-2 gap-3">
          <Photo src={PHOTOS.salonClassic} alt="Salon workstations" className="w-full h-64 md:h-80 rounded-2xl" />
          <Photo src={PHOTOS.mensCut} alt="Men's haircut" className="w-full h-64 md:h-80 rounded-2xl mt-10" />
        </div>
      </section>

      <TrustStrip />
      <WhyChooseUs />
      <Location />
      <CtaBand />
    </>
  );
}
