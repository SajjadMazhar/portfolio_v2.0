import Reveal from './Reveal.jsx';
import TypeText from './TypeText.jsx';
import { education } from '../data/resume.js';

export default function Timeline() {
  return (
    <Reveal className="card">
      {education.map((item) => (
        <div className="timeline-item" key={item.title}>
          <div className="timeline-rail">
            <span className="timeline-dot"></span>
            <span className="timeline-line"></span>
          </div>
          <div className="timeline-body">
            <div>
              <TypeText as="div" className="timeline-title" text={item.title} speed={40} />
              <TypeText as="div" className="timeline-org" text={item.org} speed={55} delay={0.3} />
            </div>
            <span className="date-pill">{item.date}</span>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
