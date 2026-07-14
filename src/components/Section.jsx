import TypeText from './TypeText.jsx';

// Standard section header: label pill + h2, typed out on scroll.
export default function Section({ id, label, title, children }) {
  return (
    <section id={id}>
      <div className="section-label">
        <span className="dot"></span>
        <TypeText text={label} speed={25} />
      </div>
      <TypeText as="h2" className="h2" text={title} speed={35} delay={0.2} maxDur={1.2} />
      {children}
    </section>
  );
}
