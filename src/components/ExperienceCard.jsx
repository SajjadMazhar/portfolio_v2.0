import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import TypeText from './TypeText.jsx';
import { BadgeRow } from './Badge.jsx';

function Bullets({ items, style }) {
  return (
    <ul className="bullets" style={style}>
      {items.map((b, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
      ))}
    </ul>
  );
}

export default function ExperienceCard({ entry, last }) {
  return (
    <Reveal className="card" style={last ? undefined : { marginBottom: 24 }}>
      <div className="exp-head">
        <div>
          <TypeText as="div" className="exp-role" text={entry.role} speed={45} />
          <TypeText
            as="div"
            className="exp-org"
            segments={[{ text: entry.org, className: 'accent' }, { text: entry.orgSuffix }]}
            speed={60}
            delay={0.3}
          />
        </div>
        <span className="date-pill">{entry.date}</span>
      </div>

      {entry.projects?.map((p) => (
        <div className="exp-project" key={p.name}>
          <div className="exp-project__name">
            <Icon name={p.icon} size={16} /> <TypeText text={p.name} speed={45} />
          </div>
          <Bullets items={p.bullets} />
          <BadgeRow badges={p.badges} style={{ marginTop: 14 }} />
        </div>
      ))}

      {entry.bullets && <Bullets items={entry.bullets} style={{ marginTop: 20 }} />}
      {entry.badges && <BadgeRow badges={entry.badges} style={{ marginTop: 14 }} />}
    </Reveal>
  );
}
