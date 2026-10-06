import { PHOTOS } from "../config/business";
import PageHeader from "../components/PageHeader";
import Gallery from "../components/sections/Gallery";
import BeforeAfter from "../components/sections/BeforeAfter";
import CtaBand from "../components/sections/CtaBand";
import { EditableHint } from "../components/ui";

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Portfolio" title="Gallery" img={PHOTOS.heroStyling}
        sub="Haircuts, hair colour, styling, men's grooming, beauty and a look inside the salon. Tap any photo to view it larger." />
      <div className="container-x py-12 md:py-16">
        <EditableHint className="mb-6">Replace sample photos with Hair by Parvej Kalkaji's own work</EditableHint>
        <Gallery />
      </div>
      <BeforeAfter />
      <CtaBand />
    </>
  );
}
