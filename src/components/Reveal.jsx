import { motion } from 'motion/react';

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

// Generic scroll reveal: fade + 24px rise, fires once.
export default function Reveal({ as = 'div', className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      {...rest}
    >
      {children}
    </Tag>
  );
}
