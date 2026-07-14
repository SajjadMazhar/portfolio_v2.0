# Sajjad Mazhar — Portfolio

Personal portfolio of Sajjad Mazhar, Full-Stack & Geospatial Engineer.

**Live:** https://sajjadmazhar.github.io/portfolio_v2.0/

## Tech stack

- [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- [Motion](https://motion.dev/) for animations and reveal-on-scroll effects
- [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) for the background scene
- [lucide-react](https://lucide.dev/) and [react-icons](https://react-icons.github.io/react-icons/) for iconography
- Plain CSS (`src/styles.css`) with a light/dark theme persisted to `localStorage`

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
├── data/resume.js     # ALL site content lives here (identity, experience, projects, skills…)
├── components/        # Presentational components (Hero, Navbar, ProjectCard, SkillsGrid…)
├── hooks/             # useTheme, useScrollSpy, useStuck
├── App.jsx            # Page layout and section composition
└── styles.css         # Global styles and theme variables
public/assets/         # Avatar, favicon, resume PDF
```

### Editing content

The site is fully data-driven: components contain no copy. To update text, experience entries, projects, skills, or contact details, edit `src/data/resume.js` only. Strings marked `html: true` may contain `<strong>` highlights; icon names are lucide-react component names.

To change the avatar or resume PDF, replace the files in `public/assets/`.

## Deployment

Pushes to `master` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the site and deploys `dist/` to GitHub Pages.

Notes:

- The Pages source must be set to **GitHub Actions** (repo Settings → Pages), not "Deploy from a branch".
- `base: '/portfolio_v2.0/'` in `vite.config.js` must match the repository name. Update it if the repo is ever renamed.
