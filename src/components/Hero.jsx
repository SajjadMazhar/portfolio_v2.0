import { hero } from '../data/resume.js';
import HeroStats from './HeroStats.jsx';
import TypeText from './TypeText.jsx';
import TypedCode from './TypedCode.jsx';

// About/hero: everything types out terminal-style on load —
// label → tag → h1 lines → lead — then the live terminal starts.
export default function Hero() {
  return (
    <section id="about">
      <div className="section-label">
        <span className="dot"></span>
        <TypeText text="About" speed={20} />
      </div>
      <div className="hero-tag">
        <TypeText
          segments={[{ text: hero.tagPrefix }, { text: hero.tagAccent, className: 'accent' }]}
          delay={0.35}
          speed={35}
        />
      </div>
      <h1 className="hero">
        <TypeText as="span" className="line" text={hero.lines[0]} delay={1.1} speed={30} maxDur={1.1} />
        <TypeText as="span" className="line" text={hero.lines[1]} delay={2.0} speed={30} maxDur={1.1} />
      </h1>
      <TypeText as="p" className="lead" text={hero.lead} delay={2.9} speed={280} maxDur={1.6} />
      <TypedCode startDelay={4700} />
      <HeroStats delay={0.6} />
    </section>
  );
}
