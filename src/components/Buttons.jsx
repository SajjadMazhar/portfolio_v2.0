import { motion } from 'motion/react';

// Capsule button link: Framer owns the hover lift (CSS keeps the shadow).
export function BtnLink({ className = '', href, children, style, ...rest }) {
  const external = /^https?:/.test(href) || href.endsWith('.pdf');
  return (
    <motion.a
      className={className}
      href={href}
      style={style}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

export function Social({ href, label, children }) {
  const external = /^https?:/.test(href) || href.endsWith('.pdf');
  return (
    <motion.a
      className="social"
      href={href}
      aria-label={label}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      {children}
    </motion.a>
  );
}
