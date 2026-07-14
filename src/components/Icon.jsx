import {
  Boxes,
  Braces,
  Briefcase,
  Cloud,
  Code,
  Database,
  FolderGit2,
  GraduationCap,
  Layers,
  Map,
  MountainSnow,
  RadioTower,
  Send,
  User,
  Wrench,
} from 'lucide-react';

// Icons referenced by name from src/data/resume.js
const registry = {
  Boxes,
  Braces,
  Briefcase,
  Cloud,
  Code,
  Database,
  FolderGit2,
  GraduationCap,
  Layers,
  Map,
  MountainSnow,
  RadioTower,
  Send,
  User,
  Wrench,
};

export default function Icon({ name, size = 18, ...rest }) {
  const Cmp = registry[name];
  return Cmp ? <Cmp size={size} strokeWidth={1.8} aria-hidden="true" {...rest} /> : null;
}
