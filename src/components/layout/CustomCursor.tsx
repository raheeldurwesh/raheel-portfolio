'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  const trailX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.8 });
  const trailY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.8 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[data-cursor-hover]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering ? 'transparent' : 'white',
          border: isHovering ? '1.5px solid white' : 'none',
        }}
      />

      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className="w-[60px] h-[60px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  );
}
