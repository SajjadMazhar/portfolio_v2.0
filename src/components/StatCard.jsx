import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { EASE_OUT } from './Reveal.jsx';

// Fades up on view with a per-card delay, then counts 0 → value.
export default function StatCard({ value, suffix, label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <motion.div
      ref={ref}
      className="card stat"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      <div className="stat__value">
        {display}
        <span className="accent">{suffix}</span>
      </div>
      <div className="stat__label">{label}</div>
    </motion.div>
  );
}
