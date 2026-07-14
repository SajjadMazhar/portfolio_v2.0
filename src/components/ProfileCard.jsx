import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { FileText, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import { identity } from '../data/resume.js';
import { BtnLink, Social } from './Buttons.jsx';
import { EASE_OUT } from './Reveal.jsx';
import TypeText from './TypeText.jsx';

const TILT = 4; // max degrees

export default function ProfileCard() {
  const ref = useRef(null);
  const mx = useMotionValue(0); // pointer position, -0.5 .. 0.5
  const my = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [TILT, -TILT]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-TILT, TILT]), spring);

  function onPointerMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <aside className="sidebar">
      <motion.div
        ref={ref}
        className="card profile"
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <img src={identity.avatar} alt={identity.name} />
        <TypeText as="div" className="profile__name" text={identity.name} speed={25} delay={0.4} />
        <TypeText as="div" className="profile__role" text={identity.role} speed={45} delay={1.0} />
        <TypeText
          as="a"
          className="profile__email"
          href={`mailto:${identity.email}`}
          text={identity.email}
          speed={60}
          delay={1.5}
        />
        <TypeText as="div" className="profile__loc" text={identity.location} speed={60} delay={2.0} />
        <div className="socials">
          <Social href={identity.linkedin} label="LinkedIn">
            <LinkedinIcon size={18} />
          </Social>
          <Social href={identity.github} label="GitHub">
            <GithubIcon size={18} />
          </Social>
          <Social href={`mailto:${identity.email}`} label="Email">
            <Mail size={18} strokeWidth={1.8} />
          </Social>
          <Social href={`tel:${identity.phone}`} label="Phone">
            <Phone size={18} strokeWidth={1.8} />
          </Social>
        </div>
        <BtnLink className="btn btn--secondary btn--full" href={identity.resume} style={{ marginTop: 20 }}>
          <FileText size={18} strokeWidth={1.8} /> View My CV
        </BtnLink>
        <BtnLink className="btn btn--primary btn--full" href={`mailto:${identity.email}`} style={{ marginTop: 12 }}>
          <Mail size={18} strokeWidth={1.8} /> Contact Me
        </BtnLink>
      </motion.div>
    </aside>
  );
}
