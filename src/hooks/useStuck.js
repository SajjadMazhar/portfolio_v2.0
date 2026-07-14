import { useEffect, useState } from 'react';

// Tracks whether a `position: sticky` element's live top offset has
// scrolled at or below `threshold` (px from the viewport top) — true once
// it's pinned there (threshold === its CSS `top`), or earlier if a larger
// threshold is passed to react before it reaches full pin.
export function useStuck(ref, threshold = 0) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null;
    const check = () => {
      raf = null;
      setStuck(el.getBoundingClientRect().top <= threshold + 0.5);
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [ref, threshold]);

  return stuck;
}
