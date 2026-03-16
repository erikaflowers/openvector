import { useEffect, useRef } from 'react';

/**
 * Tracks mouse position via a ref (not state) for performance.
 * The canvas render loop reads from the ref directly — no React re-renders.
 * Falls back to center of viewport when no mouse events have fired (mobile/touch).
 */
export function useMousePosition() {
  const position = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    hasMouseMoved: false,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      position.current.x = e.clientX;
      position.current.y = e.clientY;
      position.current.hasMouseMoved = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        position.current.x = e.touches[0].clientX;
        position.current.y = e.touches[0].clientY;
        position.current.hasMouseMoved = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return position;
}
