import { motion } from 'motion/react';

// Faint code snippets floating in the background layer (z 0, behind
// content). Bob animation is transform-only, so MotionConfig's
// reducedMotion="user" stills them automatically.
// Two 10%-spaced columns (left / right), interleaved by 5% so nothing
// in the same column sits closer than ~80px vertically — keeps the
// 2-4 line snippets from touching even on short mobile viewports.
const FRAGS = [
  // left column
  {
    code: 'npm run build\n✓ compiled successfully',
    style: { top: '3%', left: '4%' },
    dur: 9,
    accent: true,
  },
  {
    code: 'useEffect(() => {\n  fetchData();\n}, [])',
    style: { top: '13%', left: '7%' },
    dur: 10,
  },
  {
    code: "import gdal\nds = gdal.Open('map.tif')",
    style: { top: '23%', left: '4%' },
    dur: 12,
  },
  {
    code: 'async function fetchData() {}',
    style: { top: '33%', left: '8%' },
    dur: 9,
  },
  {
    code: '$ docker compose up -d\n✔ api  ✔ web  ✔ db',
    style: { top: '43%', left: '2%' },
    dur: 13,
  },
  {
    code: 'const [state, setState] = useState();',
    style: { top: '53%', left: '6%' },
    dur: 11,
  },
  {
    code: 'db.users.find({ active: true })',
    style: { top: '63%', left: '3%' },
    dur: 14,
  },
  {
    code: 'try {\n  ...\n} catch (e) {}',
    style: { top: '73%', left: '7%' },
    dur: 10,
  },
  {
    code: "git push origin main",
    style: { top: '83%', left: '5%' },
    dur: 11,
  },
  {
    code: 'npm install',
    style: { top: '93%', left: '8%' },
    dur: 8,
  },
  // right column
  {
    code: "const engineer = {\n  stack: ['MERN', 'Flutter'],\n  gis: true };",
    style: { top: '8%', right: '3%' },
    dur: 11,
  },
  {
    code: 'SELECT COUNT(*) FROM users;',
    style: { top: '18%', right: '7%' },
    dur: 10,
    accent: true,
  },
  {
    code: 'aws s3 sync ./dist s3://bucket',
    style: { top: '28%', right: '4%' },
    dur: 12,
  },
  {
    code: 'interface Props {\n  geo: LatLng[];\n}',
    style: { top: '38%', right: '4%' },
    dur: 10,
  },
  {
    code: 'pip install geopandas',
    style: { top: '48%', right: '8%' },
    dur: 9,
  },
  {
    code: 'flutter pub get',
    style: { top: '58%', right: '6%' },
    dur: 10,
  },
  {
    code: 'SELECT * FROM problems\nWHERE solved = true;',
    style: { top: '68%', right: '5%' },
    dur: 12,
    accent: true,
  },
  {
    code: '.then(res => res.json())',
    style: { top: '78%', right: '7%' },
    dur: 11,
  },
  {
    code: 'export default App;',
    style: { top: '88%', right: '4%' },
    dur: 9,
  },
  {
    code: "git commit -m 'ship it'",
    style: { top: '98%', right: '5%' },
    dur: 10,
  },
];

export default function CodeFragments() {
  return (
    <div className="code-frags" aria-hidden="true">
      {FRAGS.map((f, i) => (
        <motion.pre
          key={i}
          className={f.accent ? 'code-frag code-frag--accent' : 'code-frag'}
          style={f.style}
          animate={{ y: [0, -16, 0], rotate: [0, i % 2 ? 0.6 : -0.6, 0] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: (i % 10) * 1.7 }}
        >
          {f.code}
        </motion.pre>
      ))}
    </div>
  );
}
