'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE, OWNER } from '@/lib/constants';
import { IconSparkles } from '@/components/common/Icons';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="founder" className="relative" ref={sectionRef}>
      <div className="section-wrapper">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Left - Founder Profile */}
          <div className="lg:w-5/12 space-y-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="section-label inline-block"
            >
              04 Founder
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-display text-4xl md:text-6xl font-black gradient-text-white"
            >
              {OWNER.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-primary font-mono text-sm font-semibold tracking-wide"
            >
              {OWNER.role}
            </motion.p>

            {/* Mission Statement Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="card-glow-border p-6 relative overflow-hidden bg-white/[0.03]"
            >
              <div className="text-3xl text-primary font-serif mb-2">“</div>
              <p className="font-display text-xl md:text-2xl font-bold text-white leading-relaxed italic">
                {OWNER.missionStatement}
              </p>
              <div className="mt-4 text-xs font-mono text-white/40">
                — {OWNER.name}, Founder
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/60 leading-relaxed text-sm"
            >
              {OWNER.tagline}
            </motion.p>

            {/* Role Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {OWNER.subtitles.map((role) => (
                <span key={role} className="badge flex items-center gap-1.5">
                  <IconSparkles size={12} className="text-primary" />
                  <span>{role}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right - Product Evolution Timeline */}
          <div className="lg:w-7/12 w-full">
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold text-white">
                Product & Engineering Evolution
              </h3>
              <p className="text-white/40 text-xs font-mono mt-1">
                Milestones from first code to AI startups
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-cyan-400 to-transparent" />

              <div className="space-y-6">
                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative pl-10 group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-3">
                      <div className="w-[22px] h-[22px] rounded-full border border-white/20 bg-dark flex items-center justify-center group-hover:border-primary transition-colors duration-300">
                        <motion.div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            background:
                              index === TIMELINE.length - 1
                                ? 'linear-gradient(135deg, #3B82F6, #06B6D4)'
                                : 'rgba(255,255,255,0.4)',
                          }}
                          whileHover={{ scale: 1.5 }}
                        />
                      </div>
                    </div>

                    {/* Timeline Card */}
                    <div className="card-glow-border p-5 group-hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-display text-base font-bold text-white group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-mono text-primary tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
