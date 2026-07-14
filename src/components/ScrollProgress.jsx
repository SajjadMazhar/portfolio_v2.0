import { motion, useScroll, useSpring } from 'motion/react';

// 2px accent hairline along the top tracking scroll position.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
