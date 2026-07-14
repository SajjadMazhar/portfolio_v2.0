import { useTheme } from './hooks/useTheme.js';
import { experience, projects } from './data/resume.js';
import GridBackground from './components/GridBackground.jsx';
import CodeFragments from './components/CodeFragments.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Controls from './components/Controls.jsx';
import Navbar from './components/Navbar.jsx';
import ProfileCard from './components/ProfileCard.jsx';
import Hero from './components/Hero.jsx';
import Section from './components/Section.jsx';
import ExperienceCard from './components/ExperienceCard.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import SkillsGrid from './components/SkillsGrid.jsx';
import Timeline from './components/Timeline.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <GridBackground theme={theme} />
      <CodeFragments />
      <ScrollProgress />
      <Controls theme={theme} onToggle={toggleTheme} />

      <div className="shell">
        <div className="layout">
          <ProfileCard />

          <div className="main">
            <Navbar />
            <Hero />

            <Section id="experience" label="Experience" title="Where I've Worked">
              {experience.map((entry, i) => (
                <ExperienceCard key={entry.org} entry={entry} last={i === experience.length - 1} />
              ))}
            </Section>

            <Section id="projects" label="Projects" title="Selected Work">
              <div className="projects-grid">
                {projects.map((p) => (
                  <ProjectCard key={p.title} project={p} />
                ))}
              </div>
            </Section>

            <Section id="skills" label="Skills" title="Technical Toolkit">
              <SkillsGrid />
            </Section>

            <Section id="education" label="Education" title="Education">
              <Timeline />
            </Section>

            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}
