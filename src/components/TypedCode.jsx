import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const LINES = [
  "const stack = ['MEAN', 'MERN', 'Flutter', 'Flask'];",
  'gdal_translate -of PNG survey.tiff overlay.png',
  'docker compose up -d --build',
  'SELECT * FROM problems WHERE solved = true;',
  'flutter build apk --release',
];

// Terminal-style typewriter under the hero lead. Types a line, holds,
// deletes, moves to the next. Reduced motion gets the first line static.
export default function TypedCode({ startDelay = 900 }) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(() => (reduced ? LINES[0] : ''));

  useEffect(() => {
    if (reduced) {
      setText(LINES[0]);
      return;
    }
    let line = 0;
    let timer;
    let cancelled = false;

    function type(i) {
      if (cancelled) return;
      const full = LINES[line];
      setText(full.slice(0, i));
      if (i < full.length) timer = setTimeout(() => type(i + 1), 34 + Math.random() * 40);
      else timer = setTimeout(() => erase(full.length), 2200);
    }
    function erase(i) {
      if (cancelled) return;
      setText(LINES[line].slice(0, i));
      if (i > 0) timer = setTimeout(() => erase(i - 1), 12);
      else {
        line = (line + 1) % LINES.length;
        timer = setTimeout(() => type(0), 400);
      }
    }
    timer = setTimeout(() => type(0), startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <div className="hero-code">
      <span className="hero-code__prompt">~ $</span> {text}
      <motion.span
        className="hero-code__caret"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
      />
    </div>
  );
}
