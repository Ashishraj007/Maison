# Hair by Parvej Kalkaji: Website Proposal Demo

Client-specific website demo for **Hair by Parvej Kalkaji**, a unisex salon at Gate-5, Nehru Enclave Metro Station, Kalkaji, New Delhi.
Built by Fenbrix with React + Vite + Tailwind + Lucide. Frontend only: no backend, database, auth or payments.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Update the content
**All business content is in `src/config/business.js`.** Search that file for `TODO(client)`.

| What | Key |
|---|---|
| Name, address, landmark | `BUSINESS` |
| Phone / WhatsApp (empty = safe demo behaviour, no fake number) | `BUSINESS.phone`, `BUSINESS.whatsapp` |
| Opening hours | `BUSINESS.hours` |
| Google rating, review count, Maps & review links | `BUSINESS.google`, `googleMapsUrl`, `writeReviewUrl` |
| Social links | `BUSINESS.socialLinks` |
| Services (price/duration stay hidden until confirmed) | `SERVICE_CATEGORIES`, `SERVICES` |
| Gallery, before/after photos | `GALLERY`, `BEFORE_AFTER`, `PHOTOS` |
| Reviews (`isDemo: true` shows a "Demo testimonial" label) | `REVIEWS` |
| WhatsApp pre-filled messages | `WHATSAPP_MESSAGES` |
| Booking dates/time slots | `BOOKING` |
| Page titles & meta descriptions | `SEO` |
| Proposal bar, "To confirm" hints, "What will change" section, pricing | `DEMO`, `PROPOSAL` |

**Before launch:** set `DEMO.showDemoBar`, `DEMO.showEditableHints` and `DEMO.showProposalOnHome` to `false`, and connect the booking form to WhatsApp, email or a backend.

## Structure
```
src/config/business.js   all editable data
src/lib/                 hash router, WhatsApp/call links, SEO + BeautySalon schema
src/components/          header, footer, service card, call/WhatsApp actions, UI primitives
src/components/sections/ hero, trust strip, services bento, before/after, gallery, reviews, map, FAQ…
src/pages/               Home, Services, Gallery, Reviews, About, Contact, Booking, Proposal
```

Routes use the URL hash (`#/services`, `#/book/hair-colour`, `#/proposal`) so the demo runs on any static host. For the production site, switch to path-based routes with prerendering so each page is indexed separately.
