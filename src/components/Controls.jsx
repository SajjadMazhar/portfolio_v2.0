import { AnimatePresence, motion } from 'motion/react';
import { FileText, Moon, Sun } from 'lucide-react';
import { GithubIcon } from './BrandIcons.jsx';
import { identity } from '../data/resume.js';

const lift = { whileHover: { y: -2 }, whileTap: { scale: 0.94 } };

export default function Controls({ theme, onToggle }) {
  return (
    <div className="controls">
      <motion.button
        className="icon-btn"
        onClick={onToggle}
        aria-label="Toggle light / dark theme"
        {...lift}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            style={{ display: 'inline-flex' }}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? <Sun size={20} strokeWidth={1.8} /> : <Moon size={20} strokeWidth={1.8} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <motion.a
        className="icon-btn"
        href={identity.github}
        target="_blank"
        rel="noopener"
        aria-label="GitHub"
        {...lift}
      >
        <GithubIcon size={20} />
      </motion.a>
      <motion.a
        className="icon-btn"
        href={identity.resume}
        target="_blank"
        rel="noopener"
        aria-label="Download résumé"
        {...lift}
      >
        <FileText size={20} strokeWidth={1.8} />
      </motion.a>
    </div>
  );
}
