'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '@/lib/constants';

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({
  value,
  suffix,
  duration = 2,
  isActive,
}: {
  value: number;
  suffix: string;
  duration?: number;
  isActive: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isActive, value, duration]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ============================================
// STATS SECTION
// ============================================
export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section className="relative" ref={sectionRef}>
      <div className="section-wrapper">
        {/* Divider */}
        <div className="divider-glow mb-20" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass-card p-6 md:p-8 text-center group"
            >
              {/* Value */}
              <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-3">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isActive={isInView}
                />
              </div>

              {/* Label */}
              <p className="text-sm text-white/40 font-medium">
                {stat.label}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-glow mt-20" />
      </div>
    </section>
  );
}
