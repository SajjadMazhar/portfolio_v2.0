import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import TypeText from './TypeText.jsx';
import { BadgeRow } from './Badge.jsx';
import { skillGroups } from '../data/resume.js';

export default function SkillsGrid() {
  return (
    <div className="skills-grid">
      {skillGroups.map((group, i) => (
        <Reveal className="card" key={group.label} transition={{ delay: (i % 2) * 0.08 }}>
          <div className="skill-group__label">
            <Icon name={group.icon} size={16} /> <TypeText text={group.label} speed={40} delay={(i % 2) * 0.15} />
          </div>
          <BadgeRow badges={group.badges} iconFallback={group.icon} />
        </Reveal>
      ))}
    </div>
  );
}
