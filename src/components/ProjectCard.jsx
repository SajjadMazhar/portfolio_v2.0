import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal.jsx';
import TypeText from './TypeText.jsx';
import { BadgeRow } from './Badge.jsx';

export default function ProjectCard({ project }) {
  return (
    <Reveal className="card card--interactive" whileHover={{ y: -4 }}>
      <div className="project__top">
        <div>
          <TypeText as="div" className="project__title" text={project.title} speed={20} />
          <TypeText as="div" className="project__sub" text={project.sub} speed={55} delay={0.35} />
        </div>
        <div className="project__meta">
          <span className="live-badge">
            <span className="pulse"></span> {project.status}
          </span>
        </div>
      </div>
      <TypeText as="p" className="project__desc" text={project.desc} speed={300} maxDur={1.4} delay={0.5} />
      <ul className="bullets">
        {project.bullets.map((b, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
        ))}
      </ul>
      <BadgeRow accentBadges={project.accentBadges} badges={project.badges} style={{ marginTop: 20 }} />
      {project.link && (
        <motion.a
          className="project__link"
          href={project.link.href}
          target="_blank"
          rel="noopener"
          whileHover={{ x: 2 }}
        >
          {project.link.label} <ArrowUpRight size={15} strokeWidth={1.8} />
        </motion.a>
      )}
    </Reveal>
  );
}
