import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import TypeText from './TypeText.jsx';
import { stats } from '../data/resume.js';

const PROMPT = 'whoami --stats';

const row = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// Counts 0 -> value once the block scrolls into view, timed to start as
// this row's fade-in lands rather than the moment the container appears.
function useCountUp(value, active, reduced, delaySec) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      delay: delaySec,
      duration: 0.9,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, reduced, value, delaySec]);
  return display;
}

function StatRow({ stat, active, reduced, delaySec, isLast }) {
  const display = useCountUp(stat.value, active, reduced, delaySec);
  return (
    <motion.div className="hero-stats__row" variants={row}>
      <span className="hero-stats__key">{stat.key}</span>
      <span className="hero-stats__punc">: </span>
      <span className="hero-stats__val">
        {display}
        {stat.suffix}
      </span>
      {!isLast && <span className="hero-stats__punc">,</span>}
      <span className="hero-stats__comment"> // {stat.label}</span>
    </motion.div>
  );
}

// Folds the "years / shipped / mentored" numbers into the hero's terminal
// motif instead of standalone stat cards: a typed command whose "output"
// is a JS object, counting each value up once it's in view.
export default function HeroStats({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const promptDur = Math.min(Math.max(PROMPT.length / 30, 0.35), 2);
  const list = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: delay + promptDur + 0.15 } },
  };

  return (
    <div className="hero-stats" ref={ref}>
      <div className="hero-stats__prompt">
        <span className="hero-code__prompt">~ $</span>{' '}
        <TypeText text={PROMPT} delay={delay} speed={30} />
      </div>
      <motion.div className="hero-stats__obj" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={list}>
        <div className="hero-stats__brace">{'{'}</div>
        {stats.map((s, i) => (
          <StatRow
            key={s.key}
            stat={s}
            active={inView}
            reduced={reduced}
            delaySec={delay + promptDur + 0.15 + i * 0.14 + 0.2}
            isLast={i === stats.length - 1}
          />
        ))}
        <div className="hero-stats__brace">{'}'}</div>
      </motion.div>
    </div>
  );
}
