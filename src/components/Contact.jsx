import { FileText, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import Reveal from './Reveal.jsx';
import TypeText from './TypeText.jsx';
import { BtnLink, Social } from './Buttons.jsx';
import { contact, identity } from '../data/resume.js';

export default function Contact() {
  return (
    <section id="contact">
      <Reveal className="card contact-card">
        <div className="section-label" style={{ justifyContent: 'center' }}>
          <span className="dot"></span>
          <TypeText text="Contact" speed={25} />
        </div>
        <TypeText as="h2" className="h2" text={contact.heading} speed={30} delay={0.25} />
        <TypeText as="p" text={contact.copy} speed={250} maxDur={1.4} delay={0.5} />
        <div className="contact-actions">
          <BtnLink className="btn btn--primary" href={`mailto:${identity.email}`}>
            <Mail size={18} strokeWidth={1.8} /> {identity.email}
          </BtnLink>
          <BtnLink className="btn btn--secondary" href={`tel:${identity.phone}`}>
            <Phone size={18} strokeWidth={1.8} /> {identity.phoneDisplay}
          </BtnLink>
        </div>
        <div className="socials contact-socials">
          <Social href={identity.linkedin} label="LinkedIn">
            <LinkedinIcon size={18} />
          </Social>
          <Social href={identity.github} label="GitHub">
            <GithubIcon size={18} />
          </Social>
          <Social href={identity.resume} label="Résumé">
            <FileText size={18} strokeWidth={1.8} />
          </Social>
        </div>
      </Reveal>
      <div className="footer" style={{ marginTop: 24 }}>
        © {new Date().getFullYear()} {identity.name} · Built with the ZenG design language.
      </div>
    </section>
  );
}
