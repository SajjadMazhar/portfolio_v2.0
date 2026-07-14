import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

// Renders text as if typed in a terminal once it enters the viewport.
// An invisible copy of the full text reserves layout, so typing never
// reflows the page. Use `segments` for mixed-style runs (e.g. accent
// words); `text` is shorthand for a single segment.
export default function TypeText({
  as = 'span',
  text,
  segments,
  className,
  style,
  speed = 60, // chars per second before clamping
  minDur = 0.35,
  maxDur = 2,
  delay = 0,
  ...rest
}) {
  const segs = segments || [{ text }];
  const full = segs.map((s) => s.text).join('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const [n, setN] = useState(() => (reduced ? full.length : 0));
  const typing = inView && !reduced && n < full.length;

  useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setN(full.length);
      return;
    }
    const dur = Math.min(Math.max(full.length / speed, minDur), maxDur) * 1000;
    let raf;
    let start;
    const tick = (ts) => {
      if (start === undefined) start = ts + delay * 1000;
      const p = Math.min(Math.max((ts - start) / dur, 0), 1);
      setN(Math.round(p * full.length));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced]);

  const Tag = as;
  let offset = 0;
  // Callers that pass a block-establishing className (e.g. .line, .lead)
  // already control display. Everyone else gets a bare inline <span>, which
  // breaks position:relative + an absolute-positioned child once the ghost
  // text wraps to multiple lines — browsers only give the absolute overlay
  // a containing block matching the first line fragment, so the rest of
  // the typed text spills out and overlaps whatever follows. inline-block
  // gives it a real box spanning every wrapped line instead.
  const display = className ? undefined : 'inline-block';
  return (
    <Tag ref={ref} className={className} style={{ display, position: 'relative', ...style }} aria-label={full} {...rest}>
      {/* layout ghost */}
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>
        {segs.map((s, i) => (
          <span key={i} className={s.className}>
            {s.text}
          </span>
        ))}
      </span>
      {/* typed overlay */}
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {segs.map((s, i) => {
          const from = offset;
          offset += s.text.length;
          const visible = Math.max(0, Math.min(s.text.length, n - from));
          return (
            <span key={i} className={s.className}>
              {s.text.slice(0, visible)}
            </span>
          );
        })}
        {typing && <span className="type-caret" />}
      </span>
    </Tag>
  );
}
