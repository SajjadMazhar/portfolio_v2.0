import { motion } from 'motion/react';
import SkillIcon from './SkillIcon.jsx';

const row = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const chip = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export function Badge({ accent = false, icon, children }) {
  return (
    <motion.span className={accent ? 'badge badge--accent' : 'badge'} variants={chip}>
      {icon && <span className="badge__icon">{icon}</span>}
      {children}
    </motion.span>
  );
}

// Staggered chip reveal; renders accent badges first, like v1.
// Pass iconFallback (a lucide icon name from Icon.jsx) to show a brand icon
// per skill, falling back to that icon when no brand logo exists.
export function BadgeRow({ badges = [], accentBadges = [], style, iconFallback }) {
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
        <Badge key={b} accent icon={iconFallback && <SkillIcon name={b} fallback={iconFallback} />}>
          {b}
        </Badge>
      ))}
      {badges.map((b) => (
        <Badge key={b} icon={iconFallback && <SkillIcon name={b} fallback={iconFallback} />}>
          {b}
        </Badge>
      ))}
    </motion.div>
  );
}
