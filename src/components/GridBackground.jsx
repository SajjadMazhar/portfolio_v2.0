import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CanvasTexture } from 'three';

// Live WebGL version of the ZenG perspective grid backdrop: a wireframe
// floor drifting very slowly toward the viewer with a gentle ripple,
// plus sparse floating particles. Falls back to the static CSS grid
// (.zg-grid-bg) when reduced motion is preferred or WebGL is missing.

const GRID_SIZE = 90;
const DIVISIONS = 44;
const SPACING = GRID_SIZE / DIVISIONS;
const DRIFT_SPEED = 0.35; // world units / s — very slow
const RIPPLE_AMP = 0.4;
const PARALLAX = 0.026; // ≈ 1.5° max tilt, radians

const THEMES = {
  dark: {
    line: '#ffffff',
    lineOpacity: 0.05,
    dust: '#ffffff',
    dustOpacity: 0.12,
    accent: '#3bea6d',
    accentOpacity: 0.3,
    glyphOpacity: 0.1,
    glyphAccentOpacity: 0.3,
  },
  light: {
    line: '#000000',
    lineOpacity: 0.06,
    dust: '#000000',
    dustOpacity: 0.1,
    accent: '#3bea6d',
    accentOpacity: 0.4,
    glyphOpacity: 0.12,
    glyphAccentOpacity: 0.45,
  },
};

// Grid as explicit line segments (no plane-wireframe diagonals), with
// each line subdivided so the ripple can bend it.
function buildGridPositions() {
  const pts = [];
  const half = GRID_SIZE / 2;
  for (let i = 0; i <= DIVISIONS; i++) {
    const a = -half + i * SPACING;
    for (let j = 0; j < DIVISIONS; j++) {
      const b0 = -half + j * SPACING;
      const b1 = b0 + SPACING;
      pts.push(b0, 0, a, b1, 0, a); // line along X
      pts.push(a, 0, b0, a, 0, b1); // line along Z
    }
  }
  return new Float32Array(pts);
}

function Grid({ colors }) {
  const geomRef = useRef(null);
  const groupRef = useRef(null);
  const base = useMemo(buildGridPositions, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const drift = (t * DRIFT_SPEED) % SPACING;
    groupRef.current.position.z = drift;

    const pos = geomRef.current.attributes.position;
    const arr = pos.array;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const z = base[i * 3 + 2];
      arr[i * 3 + 1] =
        RIPPLE_AMP * Math.sin(x * 0.16 + t * 0.22) * Math.sin((z + drift) * 0.16 + t * 0.18);
    }
    pos.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, -3.5, 0]}>
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute attach="attributes-position" args={[base.slice(), 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={colors.line} transparent opacity={colors.lineOpacity} />
      </lineSegments>
    </group>
  );
}

// Soft round sprite so points render as dots, not squares.
let dotTexture;
function getDotTexture() {
  if (!dotTexture) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.6)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    dotTexture = new CanvasTexture(c);
  }
  return dotTexture;
}

function Particles({ color, opacity, count, size }) {
  const geomRef = useRef(null);
  const seed = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = Math.random() * 14 - 3;
      arr[i * 3 + 2] = -Math.random() * 40 + 4;
    }
    return arr;
  }, [count]);
  const speeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = 0.15 + Math.random() * 0.3;
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    const pos = geomRef.current.attributes.position;
    const arr = pos.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt;
      if (arr[i * 3 + 1] > 11) arr[i * 3 + 1] = -3;
    }
    pos.needsUpdate = true;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" args={[seed.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        map={getDotTexture()}
      />
    </points>
  );
}

// Code symbols drifting through the scene like slow embers.
const GLYPHS = ['{ }', '</>', '=>', ';', '( )', '[ ]', '&&', '===', '#', '$_', '::', 'fn', '<div>', '/* */'];

let glyphTextures;
function getGlyphTextures() {
  if (!glyphTextures) {
    glyphTextures = GLYPHS.map((glyph) => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 128;
      const ctx = c.getContext('2d');
      ctx.font = '500 56px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff'; // tinted per-sprite via material color
      ctx.fillText(glyph, 128, 64);
      return new CanvasTexture(c);
    });
  }
  return glyphTextures;
}

function CodeGlyphs({ colors }) {
  const groupRef = useRef(null);
  const items = useMemo(() => {
    const textures = getGlyphTextures();
    return Array.from({ length: 26 }, (_, i) => ({
      tex: textures[i % textures.length],
      accent: i % 4 === 0,
      x: (Math.random() - 0.5) * 56,
      y: Math.random() * 13 - 3,
      z: -Math.random() * 38 + 3,
      s: 0.5 + Math.random() * 0.9,
      speed: 0.12 + Math.random() * 0.25,
      sway: 0.5 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((spr, i) => {
      const it = items[i];
      spr.position.y += it.speed * dt;
      if (spr.position.y > 11) spr.position.y = -3.5;
      spr.position.x = it.x + Math.sin(t * 0.3 + it.phase) * it.sway;
      spr.material.rotation = Math.sin(t * 0.4 + it.phase) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {items.map((it, i) => (
        <sprite key={i} position={[it.x, it.y, it.z]} scale={[it.s * 2, it.s, 1]}>
          <spriteMaterial
            map={it.tex}
            color={it.accent ? colors.accent : colors.dust}
            transparent
            opacity={it.accent ? colors.glyphAccentOpacity : colors.glyphOpacity}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}

function Scene({ theme }) {
  const colors = THEMES[theme] || THEMES.dark;
  const parallaxRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Canvas has pointer-events: none, so track the pointer on window.
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(() => {
    const g = parallaxRef.current;
    g.rotation.x += (mouse.current.y * PARALLAX - g.rotation.x) * 0.04;
    g.rotation.y += (mouse.current.x * PARALLAX - g.rotation.y) * 0.04;
  });

  return (
    <group ref={parallaxRef}>
      <Grid colors={colors} />
      <Particles color={colors.dust} opacity={colors.dustOpacity} count={60} size={0.09} />
      <Particles color={colors.accent} opacity={colors.accentOpacity} count={20} size={0.07} />
      <CodeGlyphs colors={colors} />
    </group>
  );
}

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function GridBackground({ theme }) {
  const [live] = useState(
    () =>
      supportsWebGL() &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  if (!live) return <div className="zg-grid-bg" />;

  return (
    <div className="canvas-bg" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 5.5, 13], fov: 55, near: 0.1, far: 120 }}
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 0, -12);
          gl.setClearColor(0x000000, 0); // transparent — page bg shows through
        }}
      >
        <Scene theme={theme} />
      </Canvas>
    </div>
  );
}
