import { useEffect, useState } from "react";

// Hash routing keeps the demo working on any static host (no server rewrites needed).
// Routes: "/", "/services", "/services/:category", "/gallery", "/reviews", "/about",
//         "/contact", "/book", "/book/:serviceId", "/proposal"
const parse = () => {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [, page = "", param = ""] = raw.split("/");
  return { page: page || "home", param: decodeURIComponent(param), path: raw };
};

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export const navigate = (path) => {
  if (window.location.hash === `#${path}`) window.scrollTo({ top: 0, behavior: "smooth" });
  else window.location.hash = path;
};

export const href = (path) => `#${path}`;
