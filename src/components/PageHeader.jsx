import { Photo } from "./ui";

export default function PageHeader({ eyebrow, title, sub, img, children }) {
  return (
    <section className="relative bg-ink text-cream overflow-hidden">
      {img && (
        <>
          <Photo src={img} alt="" eager className="absolute inset-0 w-full h-full opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        </>
      )}
      <div className="relative container-x py-14 md:py-20 fade-in">
        {eyebrow && <p className="eyebrow text-gold-light">{eyebrow}</p>}
        <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.02] mt-3 max-w-3xl">{title}</h1>
        {sub && <p className="text-cream/70 text-base md:text-lg mt-4 max-w-2xl leading-relaxed">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
