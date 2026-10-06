import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Info, PencilLine, Scissors, Star, X } from "lucide-react";
import { DEMO } from "../config/business";

/* Image with a branded fallback if the URL fails */
export function Photo({ src, alt, className = "", eager = false, style, fit = "object-cover" }) {
  const [err, setErr] = useState(false);
  if (err || !src)
    return (
      <div className={`ph flex items-center justify-center ${className}`} style={style} role="img" aria-label={alt}>
        <Scissors className="text-gold/60" size={28} />
      </div>
    );
  return (
    <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setErr(true)}
      className={`${fit} ${className}`} style={style} />
  );
}

export function Reveal({ children, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setShown(true);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>{children}</Tag>;
}

export function SectionHead({ eyebrow, title, sub, center, dark, as: H = "h2", className = "" }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${dark ? "text-gold-light" : "text-gold-dark"}`}>{eyebrow}</p>}
      <H className={`font-display text-4xl md:text-5xl leading-[1.05] font-semibold ${dark ? "text-cream" : "text-ink"}`}>{title}</H>
      {sub && <p className={`mt-4 text-base md:text-lg leading-relaxed ${dark ? "text-cream/70" : "text-muted"}`}>{sub}</p>}
    </div>
  );
}

export function Stars({ n = 5, size = 15, className = "text-gold" }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} className={i <= Math.round(n) ? "" : "opacity-25"} />
      ))}
    </span>
  );
}

/* Dashed note on content the client still needs to confirm (toggle via DEMO.showEditableHints) */
export function EditableHint({ children, dark, className = "" }) {
  if (!DEMO.showEditableHints) return null;
  return (
    <span className={`inline-flex items-start gap-1.5 rounded-lg border border-dashed px-2.5 py-1 text-xs leading-snug ${dark ? "border-gold/50 text-gold-light" : "border-gold-dark/50 text-gold-dark"} ${className}`}>
      <PencilLine size={12} className="mt-0.5 shrink-0" />
      <span>To confirm: {children}</span>
    </span>
  );
}

export function DemoTag({ children = "Demo", dark, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider ${dark ? "bg-cream/10 text-cream/70" : "bg-sand text-muted"} ${className}`}>
      <Info size={11} />{children}
    </span>
  );
}

/* ---------- Toast ---------- */
const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null);
  const timer = useRef();
  const show = useCallback((text) => {
    setMsg(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 5000);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div aria-live="polite" className="fixed inset-x-0 bottom-20 md:bottom-6 z-[60] flex justify-center px-4 pointer-events-none">
        {msg && (
          <div className="fade-in pointer-events-auto max-w-md w-full bg-ink text-cream rounded-2xl shadow-2xl px-5 py-4 flex gap-3 items-start border border-gold/30">
            <Info size={18} className="text-gold-light shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed flex-1">{msg}</p>
            <button onClick={() => setMsg(null)} aria-label="Dismiss" className="text-cream/60 hover:text-cream"><X size={16} /></button>
          </div>
        )}
      </div>
    </ToastCtx.Provider>
  );
}
