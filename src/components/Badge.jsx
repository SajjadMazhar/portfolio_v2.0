import { motion } from 'motion/react';

const row = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const chip = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export function Badge({ accent = false, children }) {
  return (
    <motion.span className={accent ? 'badge badge--accent' : 'badge'} variants={chip}>
      {children}
    </motion.span>
  );
}

// Staggered chip reveal; renders accent badges first, like v1.
export function BadgeRow({ badges = [], accentBadges = [], style }) {
  return (
    <motion.div
      className="badge-row"
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={row}
    >
      {accentBadges.map((b) => (
        <Badge key={b} accent>
          {b}
        </Badge>
      ))}
      {badges.map((b) => (
        <Badge key={b}>{b}</Badge>
      ))}
    </motion.div>
  );
}
