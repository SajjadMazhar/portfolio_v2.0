import { motion } from 'motion/react';
import Icon from './Icon.jsx';
import { identity, navSections } from '../data/resume.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';

const sectionIds = navSections.map((s) => s.id);

export default function Navbar() {
  const active = useScrollSpy(sectionIds);

  return (
    <div className="navbar-wrap">
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
