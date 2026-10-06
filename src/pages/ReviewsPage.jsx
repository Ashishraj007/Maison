import { BUSINESS } from "../config/business";
import PageHeader from "../components/PageHeader";
import Testimonials from "../components/sections/Testimonials";
import TrustStrip from "../components/sections/TrustStrip";
import CtaBand from "../components/sections/CtaBand";

export default function ReviewsPage() {
  const g = BUSINESS.google;
  return (
    <>
      <PageHeader eyebrow="Reviews" title={`${g.rating} ★ on Google`}
        sub={`${BUSINESS.businessName} is rated ${g.rating} from ${g.reviewCount} reviews on its Google Business Profile.`} />
      <Testimonials layout="grid" />
      <TrustStrip />
      <CtaBand />
    </>
  );
}
