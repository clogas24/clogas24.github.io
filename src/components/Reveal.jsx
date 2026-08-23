import { useEffect, useRef, useState } from "react";

// Mirrors the old js/main.js scroll-reveal: fades/slides ".reveal" sections in
// as they enter the viewport, once, unless the user prefers reduced motion.
export default function Reveal({ as: Tag = "section", className = "", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = ["reveal", visible ? "is-visible" : "", className].filter(Boolean).join(" ");
  return <Tag ref={ref} className={classes} {...rest} />;
}
