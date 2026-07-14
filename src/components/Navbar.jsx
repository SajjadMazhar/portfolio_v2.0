import { useRef } from 'react';
import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import { identity, navSections } from '../data/resume.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import { useStuck } from '../hooks/useStuck.js';

const sectionIds = navSections.map((s) => s.id);

// The fixed theme/GitHub/résumé buttons occupy a top:20px..176px column on
// mobile (see .controls in styles.css). The navbar must shift out of their
// way as soon as it scrolls into that band — not only once it's fully
// pinned at top:20, since it would otherwise pass behind them en route.
const CONTROLS_CLEARANCE = 180;

export default function Navbar() {
  const active = useScrollSpy(sectionIds);
  const navRef = useRef(null);
  const stuck = useStuck(navRef, CONTROLS_CLEARANCE);

  return (
    <div ref={navRef} className={stuck ? 'navbar-wrap navbar-wrap--stuck' : 'navbar-wrap'}>
      <nav className="navbar" aria-label="Section navigation">
        <div className="navbar__brand">
          <img src={identity.avatar} alt={identity.name} />
          <div>
            <div className="name">{identity.name}</div>
            <div className="role">{identity.role}</div>
          </div>
        </div>
        <div className="navbar__links">
          {navSections.map(({ id, label, icon }) => (
            <motion.a
              key={id}
              className={id === active ? 'icon-btn active' : 'icon-btn'}
              href={`#${id}`}
              aria-label={label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              {id === active && (
                <motion.span
                  className="nav-pill"
                  layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon name={icon} size={20} />
            </motion.a>
          ))}
        </div>
      </nav>
    </div>
  );
}
