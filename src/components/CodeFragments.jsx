import { motion } from 'motion/react';

// Faint code snippets floating in the background layer (z 0, behind
// content). Bob animation is transform-only, so MotionConfig's
// reducedMotion="user" stills them automatically.
const FRAGS = [
  {
    code: "const engineer = {\n  stack: ['MERN', 'Flutter'],\n  gis: true,\n};",
    style: { top: '11%', right: '3%' },
    dur: 11,
  },
  {
    code: '$ docker compose up -d\n✔ api  ✔ web  ✔ db',
    style: { top: '44%', left: '2%' },
    dur: 13,
  },
  {
    code: 'SELECT * FROM problems\nWHERE solved = true;',
    style: { top: '68%', right: '5%' },
    dur: 12,
    accent: true,
  },
  {
    code: "git commit -m 'ship it'",
    style: { top: '86%', left: '5%' },
    dur: 10,
  },
];

export default function CodeFragments() {
  return (
    <div className="code-frags" aria-hidden="true">
      {FRAGS.map((f, i) => (
        <motion.pre
          key={i}
          className={f.accent ? 'code-frag code-frag--accent' : 'code-frag'}
          style={f.style}
          animate={{ y: [0, -16, 0], rotate: [0, i % 2 ? 0.6 : -0.6, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 1.7 }}
        >
          {f.code}
        </motion.pre>
      ))}
    </div>
  );
}
