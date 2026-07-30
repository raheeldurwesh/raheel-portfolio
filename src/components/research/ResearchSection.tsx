'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { RESEARCH_ARTICLES } from '@/lib/constants';
import { IconArrowRight, IconClose, IconCode } from '@/components/common/Icons';

export default function ResearchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedArticle, setSelectedArticle] = useState<(typeof RESEARCH_ARTICLES)[0] | null>(null);

  return (
    <section id="research" className="relative" ref={sectionRef}>
      <div className="section-wrapper">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="section-label mb-6 inline-block">05 Research</span>
          <h2 className="font-display text-4xl md:text-6xl font-black gradient-text-white mt-4">
            AI Research & Notes
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto text-base">
            Technical writing, Python engineering blueprints, Machine Learning notes, and architectural deep-dives.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_ARTICLES.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              onClick={() => setSelectedArticle(article)}
              className="card-glow-border p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-4">
                  <span className="text-primary font-semibold uppercase flex items-center gap-1.5">
                    <IconCode size={12} className="text-primary" />
                    <span>{article.category}</span>
                  </span>
                  <span>{article.date} • {article.readTime}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug mb-3">
                  {article.title}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-3">
                  {article.snippet}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white transition-colors">
                <span>Read Technical Note</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  <IconArrowRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-dark/95 border border-white/15 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl z-10 font-sans"
            >
              <div className="flex items-center justify-between text-xs font-mono text-primary mb-3">
                <span className="flex items-center gap-1.5">
                  <IconCode size={13} />
                  <span>{selectedArticle.category}</span>
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-white/40 hover:text-white p-1 rounded-md transition"
                  aria-label="Close article"
                >
                  <IconClose size={16} />
                </button>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                {selectedArticle.title}
              </h2>
              <div className="text-xs font-mono text-white/40 mb-6">
                Published {selectedArticle.date} • {selectedArticle.readTime}
              </div>
              <div className="text-white/70 text-sm leading-relaxed space-y-4 font-mono bg-white/[0.03] p-5 rounded-2xl border border-white/10">
                <p>{selectedArticle.snippet}</p>
                <p>
                  This research paper explores architectural design choices, optimization techniques, and performance considerations for modern AI software engineering.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="btn-primary text-xs"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
