import { useEffect, useRef } from "react";

// Mirrors the old js/main.js hero counter: counts up from 0 to years-since(date) on load.
export default function CountUpStat({ date }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const start = new Date(date);
    const years = (Date.now() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    const duration = 1200;
    let startTime = null;
    let frame;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = (years * progress).toFixed(4);
      if (progress < 1) frame = requestAnimationFrame(step);
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [date]);

  return <span className="hero-stat-num" ref={ref}>0</span>;
}
