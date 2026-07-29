'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/lib/constants';
import { IconClose, IconMail } from '@/components/common/Icons';

interface ProjectModalProps {
  project: Product | null;
  initialView?: 'case-study' | 'architecture';
  onClose: () => void;
}

export default function ProjectModal({ project, initialView = 'case-study', onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'case-study' | 'architecture'>(initialView);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent background scrolling when modal is open
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  useEffect(() => {
    setActiveTab(initialView);
  }, [initialView, project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl h-[85vh] max-h-[900px] grid bg-dark/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          style={{
            gridTemplateRows: 'auto 1fr auto',
            boxShadow: `0 0 50px rgba(${project.colorRgb}, 0.25)`,
          }}
        >
          {/* Header */}
          <div className="p-6 md:p-8 pb-4 border-b border-white/10 flex items-start justify-between bg-dark/95 z-20">
            <div>
              <span
                className="text-xs font-mono tracking-widest uppercase font-bold"
                style={{ color: project.color }}
              >
                Architecture & Deep Dive
              </span>
              <h2 className="font-display text-3xl font-bold text-white mt-1">
                {project.title}
              </h2>
              <p className="text-sm text-white/50">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition ml-4"
              aria-label="Close modal"
            >
              <IconClose size={16} />
            </button>
          </div>

          {/* Main Case Study Content */}
          <div 
            className="overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar"
            data-lenis-prevent="true"
          >
            {/* Tab Switcher */}
            {project?.caseStudy?.architecture && (
              <div className="flex bg-white/5 p-1 rounded-lg w-fit border border-white/10 mb-6">
                <button
                  onClick={() => setActiveTab('case-study')}
                  className={`px-4 py-1.5 text-xs font-mono font-bold rounded-md transition-all ${
                    activeTab === 'case-study' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  Case Study
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-4 py-1.5 text-xs font-mono font-bold rounded-md transition-all ${
                    activeTab === 'architecture' ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  Architecture
                </button>
              </div>
            )}

            {activeTab === 'architecture' && project?.caseStudy?.architecture ? (
              <section>
                <div className="bg-black/50 p-4 md:p-6 rounded-xl border border-white/5 overflow-x-auto custom-scrollbar shadow-inner">
                  <pre className="text-[10px] md:text-[11px] font-mono text-white/60 leading-tight">
                    {project.caseStudy.architecture}
                  </pre>
                </div>
              </section>
            ) : project?.caseStudy ? (
              <>
                <section>
                  <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-3">Overview</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{project.caseStudy.overview}</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section className="glass p-5 rounded-2xl border-l-2 border-red-500/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5" />
                    <h3 className="text-sm font-bold text-white mb-2 relative z-10">The Problem</h3>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">{project.caseStudy.problem}</p>
                  </section>
                  <section className="glass p-5 rounded-2xl border-l-2 border-emerald-500/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500/5" />
                    <h3 className="text-sm font-bold text-white mb-2 relative z-10">The Solution</h3>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">{project.caseStudy.solution}</p>
                  </section>
                </div>

                <section>
                  <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-3">Key Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.caseStudy.keyFeatures.map((feat, i) => (
                      <span key={i} className="px-3 py-1.5 glass rounded-full text-xs text-white/80 border border-white/5">
                        {feat}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-3">Technical Challenges</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{project.caseStudy.technicalChallenges}</p>
                </section>

                <section>
                  <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.caseStudy.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-mono font-bold rounded" style={{ color: project.color, backgroundColor: `rgba(${project.colorRgb}, 0.1)` }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="glass p-5 rounded-2xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(45deg, ${project.color}, transparent)` }} />
                  <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-2 relative z-10">Outcome</h3>
                  <p className="text-white relative z-10 leading-relaxed text-sm font-medium">{project.caseStudy.outcome}</p>
                </section>
              </>
            ) : (
              <p className="text-white/80 text-sm leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {/* Footer (Stats + Actions) */}
          <div className="shrink-0 p-6 md:p-8 pt-4 border-t border-white/10 bg-dark/95 z-20 space-y-4">
            {/* Key Metrics */}
            {project.stats && (
              <div className="grid grid-cols-3 gap-3">
                {project.stats.map((st) => (
                  <div key={st.label} className="glass p-3 rounded-xl text-center">
                    <div className="text-xl font-bold font-display" style={{ color: project.color }}>
                      {st.value}
                    </div>
                    <div className="text-[10px] text-white/40 mt-1">{st.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="btn-secondary text-xs py-2 px-4"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={onClose}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                }}
              >
                <IconMail size={14} />
                <span>Discuss Project</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
