// ============================================================
// All portfolio content, extracted from the resume.
// Markup-free plain data; components own the presentation.
// `html: true` strings may contain <strong> highlights.
// Icon names are lucide-react component names.
// ============================================================

export const identity = {
  name: 'Sajjad Mazhar',
  role: 'FULL-STACK ENGINEER',
  email: 'sajjadmazharjr@gmail.com',
  phone: '+917003853731',
  phoneDisplay: '+91 70038 53731',
  location: 'Based in Bengaluru, India',
  github: 'https://github.com/SajjadMazhar',
  linkedin: 'https://linkedin.com/in/sajjadmazhar',
  resume: `${import.meta.env.BASE_URL}assets/Sajjad_Mazhar_Resume.pdf`,
  avatar: `${import.meta.env.BASE_URL}assets/avatar.jpg`,
};

export const hero = {
  tagPrefix: "Hello! I'm a ",
  tagAccent: 'Full-Stack Engineer',
  lines: ['Full-Stack Engineering,', 'Geospatial Depth'],
  lead:
    "I'm Sajjad — a Software Development Engineer with 4+ years building web and mobile " +
    'products end-to-end. I work across MEAN/MERN, Flutter/NestJS, and Python/Flask, with ' +
    'deep hands-on experience in GIS and geospatial data. Driven by curiosity, I turn ' +
    'complex spatial and product data into fast, reliable, well-tested software.',
};

export const stats = [
  { key: 'experience', value: 4, suffix: '+ yrs', label: 'Years of Experience' },
  { key: 'shipped', value: 5, suffix: '+', label: 'Products Shipped' },
  { key: 'mentored', value: 100, suffix: '+ students', label: 'Students Mentored' },
];

export const navSections = [
  { id: 'about', label: 'About', icon: 'User' },
  { id: 'experience', label: 'Experience', icon: 'Briefcase' },
  { id: 'projects', label: 'Projects', icon: 'FolderGit2' },
  { id: 'skills', label: 'Skills', icon: 'Code' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'contact', label: 'Contact', icon: 'Send' },
];

export const experience = [
  {
    role: 'Software Development Engineer',
    org: 'Phicode Pvt. Ltd.',
    orgSuffix: ' · Bengaluru, Karnataka',
    date: 'Aug 2022 – Present',
    projects: [
      {
        icon: 'RadioTower',
        name: 'Telecom Tower Management Platform',
        bullets: [
          'Built a telecom tower management platform (<strong>Angular</strong>, <strong>Express.js</strong>) that lets field and engineering teams visualize and manage drone-captured 3D models and imagery.',
          'Streamlined data flow across <strong>AWS S3</strong> and <strong>MongoDB</strong>, and built custom 3D measurement tools with <strong>Three.js</strong> for tower inspections.',
          'Containerized and deployed with <strong>Docker</strong>, <strong>AWS ECR</strong> and <strong>ECS</strong>, standardizing the release process.',
        ],
        badges: ['Angular', 'Express.js', 'Three.js', 'AWS S3', 'ECS / ECR', 'MongoDB', 'Docker'],
      },
      {
        icon: 'MountainSnow',
        name: 'Mining Site Monitoring Platform',
        bullets: [
          'Architected a coal-mining site monitoring platform — <strong>React/Redux</strong> frontend, <strong>Node/Express</strong> backend — to process and analyze 3D drone imagery.',
          'Engineered the data layer across <strong>MongoDB</strong> and <strong>Google Cloud Storage</strong>, and built 3D tools for measuring distance, area and volume.',
          'Automated geospatial processing with <strong>Python</strong> and <strong>GDAL</strong> — converting .tiff to .png and rendering zoom-based tile overlays on <strong>Google Maps</strong> to visualize site change over time.',
        ],
        badges: ['React', 'Redux', 'Node.js', 'Python', 'GDAL', 'Google Cloud Storage', 'Google Maps'],
      },
      {
        icon: 'Boxes',
        name: 'Warehouse Monitoring System',
        bullets: [
          'Co-built 3D point-cloud segmentation tools (<strong>React</strong>, <strong>Redux Toolkit</strong>) on top of an <strong>Express.js</strong> / <strong>Python Flask</strong> backend for warehouse space analysis.',
        ],
        badges: ['React', 'Redux Toolkit', 'Flask', 'Point Clouds'],
      },
    ],
  },
  {
    role: 'Student Mentor',
    org: 'NavGurukul',
    orgSuffix: ' · Dharamshala, Himachal Pradesh',
    date: 'Nov 2021 – Jul 2022',
    bullets: [
      'Trained in web development through an intensive program, then mentored <strong>100+ students</strong> through the same curriculum as an instructor within an NGO setting.',
    ],
    badges: ['Web Development', 'Mentoring', 'JavaScript'],
  },
];

export const projects = [
  {
    title: 'GYMAXIS',
    sub: 'Multi-Tenant Gym Management SaaS',
    status: 'In Active Use',
    desc:
      'A personal SaaS product currently used by a live gym. I led the Flutter/NestJS rebuild of a ' +
      'multi-tenant platform — role-based apps for owners (tenants), trainers, and members on a shared ' +
      'REST API and PostgreSQL/Sequelize data layer, with self-serve signup and per-tenant branding.',
    bullets: [
      'Designed secure auth: native <strong>Google Sign-In</strong> (NestJS + Passport.js, ID-token verification) and a from-scratch <strong>WhatsApp OTP</strong> login built directly on the Meta WhatsApp Cloud API — rate-limiting, hashed/expiring codes, dev-mode fallbacks.',
      'Built self-serve multi-tenant onboarding and a public <strong>"Explore Gyms"</strong> discovery experience with profile pages, cover-image uploads, and dynamic per-tenant theming.',
      'Shipped a full financial &amp; operations module (ledgers, expenses, subscriptions, notifications); fixed state-serialization bugs via root-cause analysis in the mobile data layer.',
      'Diagnosed and fixed a hard native <strong>Android OAuth</strong> bug (missing serverClientId → silent null ID tokens) through on-device adb/logcat debugging.',
    ],
    accentBadges: ['Flutter', 'NestJS'],
    badges: ['TypeScript', 'PostgreSQL', 'Sequelize', 'Riverpod', 'Passport.js', 'WhatsApp Cloud API'],
  },
  {
    title: 'GrayHawk',
    sub: 'GIS / Geospatial Analytics Platform',
    status: 'Freelance · US Client',
    desc:
      'A full-stack GIS platform for drone / aerial survey analytics — turning LAS point clouds, ' +
      'GeoTIFF DEMs, Shapefiles, and GeoJSON into interactive maps, 3D terrain views, elevation ' +
      'profiles, and volume / stockpile measurements.',
    bullets: [
      'Built geospatial pipelines in <strong>Python</strong> (GDAL, Rasterio, GeoPandas, Shapely, LasPy, PyProj) to compute volumes, generate contour lines, and perform cut-and-fill / stockpile analysis over user-drawn polygons.',
      'Implemented interactive 3D terrain &amp; point-cloud rendering (<strong>Potree/Three.js</strong>) and multi-layer 2D mapping (<strong>Mapbox GL</strong>, Leaflet, Google Maps) with drawing, annotation and measurement tools.',
      'Designed a RESTful <strong>Flask</strong> backend (MongoDB via MongoEngine) with JWT auth, Axios token-refresh interceptors, and Bcrypt hashing; added a multispectral analytics module with dashboards and PDF export.',
      "Containerized and deployed the multi-service stack with <strong>Docker Compose</strong> (React, Flask API, S3 proxy, MongoDB, Nginx) and automated Let's Encrypt SSL.",
    ],
    accentBadges: ['React 18', 'Flask'],
    badges: ['GDAL', 'Rasterio', 'Potree', 'Mapbox GL', 'MongoDB', 'Docker'],
    link: { href: 'https://greyhawkmulti-scope.com', label: 'Visit greyhawkmulti-scope.com' },
  },
];

export const skillGroups = [
  {
    icon: 'Braces',
    label: 'Languages',
    badges: ['JavaScript / ES6+', 'TypeScript', 'Python', 'Dart', 'HTML5', 'CSS3'],
  },
  {
    icon: 'Layers',
    label: 'Frameworks & Libraries',
    badges: ['Node.js', 'NestJS', 'React.js', 'Express.js', 'Redux / Toolkit', 'Flutter', 'Riverpod', 'Flask', 'Electron.js'],
  },
  {
    icon: 'Map',
    label: 'Geospatial & Mapping',
    badges: ['GDAL', 'Rasterio', 'GeoPandas', 'Shapely', 'LasPy', 'PyProj', 'Mapbox GL', 'Leaflet', 'Potree', 'Three.js', 'Google Maps API'],
  },
  {
    icon: 'Cloud',
    label: 'Cloud & DevOps',
    badges: ['AWS S3', 'EC2', 'ECS / ECR', 'Lightsail', 'GCP Compute', 'Cloud Storage', 'Pub/Sub', 'Firebase', 'Docker', 'Nginx'],
  },
  {
    icon: 'Database',
    label: 'Databases',
    badges: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    icon: 'Wrench',
    label: 'Tools & Other',
    badges: ['Git / GitHub', 'Postman', 'Docker Compose', 'JWT / Passport.js', 'REST APIs', 'Sequelize', 'Mongoose', 'WhatsApp Cloud API'],
  },
];

export const education = [
  { title: 'MCA in AI / ML', org: 'Amity University', date: 'Expected Feb 2027' },
  { title: 'B.Sc.', org: 'Calcutta University', date: 'Oct 2020' },
];

export const contact = {
  heading: "Let's build something.",
  copy:
    "I'm open to full-stack, mobile, and geospatial engineering roles and freelance work. " +
    'The fastest way to reach me is email — I usually reply within a day.',
};
