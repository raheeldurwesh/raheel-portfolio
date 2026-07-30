'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { PRODUCTS, Product } from '@/lib/constants';
import ProjectModal from './ProjectModal';
import {
  IconCheck,
  IconExternalLink,
  IconGithub,
  IconLayers,
  IconBot,
  IconGlobe,
  IconRocket,
} from '@/components/common/Icons';

// ============================================
// VOICE WAVE ANIMATION (for REX)
// ============================================
function VoiceWave({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: [8, Math.random() * 32 + 8, 8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// STREAMING TEXT ANIMATION (for REX AI)
// ============================================
function StreamingText() {
  const lines = [
    'Analyzing your query...',
    'Searching knowledge base...',
    'Generating response with AI...',
    'Here is your comprehensive answer about machine learning algorithms.',
  ];

  return (
    <div className="font-mono text-xs space-y-2 text-white/60">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.8, duration: 0.4 }}
          className="flex items-start gap-2"
        >
          <span className="text-primary mt-0.5">▸</span>
          <span>{line}</span>
        </motion.div>
      ))}
      <motion.span
        className="inline-block w-2 h-4 bg-primary/60"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </div>
  );
}

// ============================================
// ANALYTICS WIDGET (for TableServe)
// ============================================
function AnalyticsWidget() {
  const bars = [65, 85, 45, 90, 70, 55, 95, 60, 80, 75];
  return (
    <div className="flex items-end gap-1.5 h-16">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-3 rounded-t-sm"
          style={{
            background: `linear-gradient(to top, rgba(6, 182, 212, 0.3), rgba(6, 182, 212, 0.8))`,
          }}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ============================================
// FEATURE BADGE (WITH SVG ICON)
// ============================================
function FeatureBadge({
  label,
  color,
  delay,
}: {
  label: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
      style={{
        background: `rgba(${color}, 0.08)`,
        border: `1px solid rgba(${color}, 0.15)`,
        color: `rgb(${color})`,
      }}
    >
      <IconCheck size={12} style={{ color: `rgb(${color})` }} />
      {label}
    </motion.span>
  );
}

// ============================================
// PROJECT CARD
// ============================================
interface ProjectCardProps {
  project: Product;
  index: number;
  onSelect: (view: 'case-study' | 'architecture') => void;
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      id={project.id}
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative scroll-mt-28"
    >
      <div
        className={`flex flex-col ${
          isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } gap-8 lg:gap-16 items-center`}
      >
        {/* Visual side */}
        <div className="w-full lg:w-1/2">
          <div
            className="relative card-glow-border p-8 overflow-hidden group shadow-2xl"
            style={{
              borderColor: `rgba(${project.colorRgb}, 0.15)`,
            }}
          >
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at ${
                  isReversed ? 'left' : 'right'
                } center, rgba(${project.colorRgb}, 0.15) 0%, transparent 70%)`,
              }}
            />

            {/* Content based on project */}
            <div className="relative z-10">
              {project.id === 'rex' && (
                <div className="space-y-6">
                  {/* Fake dashboard */}
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-mono text-white/40">
                        REX ACTIVE — LISTENING
                      </span>
                    </div>
                    <VoiceWave color={project.color} />
                  </div>
                  {/* System stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {(project.stats || []).map((stat, i) => (
                      <div key={i} className="glass rounded-lg p-3 text-center">
                        <div
                          className="text-lg font-bold font-display"
                          style={{ color: project.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-white/40 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.id === 'tableserve' && (
                <div className="space-y-6">
                  {/* Analytics */}
                  <div className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-white/40">
                        LIVE ANALYTICS
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-emerald-400">Real-time</span>
                      </div>
                    </div>
                    <AnalyticsWidget />
                  </div>
                  {/* Order cards */}
                  <div className="space-y-2">
                    {['Table 4 — 3 items', 'Table 7 — 1 item', 'Table 2 — 5 items'].map(
                      (order, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={isInView ? { x: 0, opacity: 1 } : {}}
                          transition={{ delay: 0.8 + i * 0.15 }}
                          className="glass rounded-lg px-4 py-3 flex items-center justify-between"
                        >
                          <span className="text-xs text-white/60">{order}</span>
                          <span
                            className="text-[10px] px-2 py-1 rounded-full"
                            style={{
                              background: `rgba(${project.colorRgb}, 0.1)`,
                              color: project.color,
                            }}
                          >
                            {['Preparing', 'New', 'Ready'][i]}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              )}

              {project.id === 'rexai' && (
                <div className="space-y-6">
                  {/* Browser mockup */}
                  <div className="glass rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="glass rounded-md px-3 py-1 text-[10px] font-mono text-white/30">
                          rexai.app/chat
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <StreamingText />
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {(project.stats || []).map((stat, i) => (
                      <div key={i} className="glass rounded-lg p-3 text-center">
                        <div
                          className="text-lg font-bold font-display"
                          style={{ color: project.color }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-[10px] text-white/40 mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content side */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Project number */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono tracking-widest"
            style={{ color: project.color }}
          >
            PROJECT 0{index + 1}
          </motion.span>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-4xl md:text-5xl font-bold gradient-text-white"
          >
            {project.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg font-medium"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/50 leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {project.features.map((feature, i) => (
              <FeatureBadge
                key={feature.label}
                label={feature.label}
                color={project.colorRgb}
                delay={0.6 + i * 0.03}
              />
            ))}
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            {project.buttons.map((btn) => {
              const isGithub = btn.label.toLowerCase().includes('github');
              const isArch = btn.label.toLowerCase().includes('architecture');
              const isDemo = btn.label.toLowerCase().includes('demo');
              return (
                <a
                  key={btn.label}
                  href={btn.href}
                  onClick={(e) => {
                    if (btn.href === '#' || isArch || btn.label.toLowerCase().includes('case study')) {
                      e.preventDefault();
                      onSelect(isArch ? 'architecture' : 'case-study');
                    }
                  }}
                  className={
                    btn.variant === 'primary' ? 'btn-primary' : 'btn-secondary'
                  }
                  style={
                    btn.variant === 'primary'
                      ? {
                          background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                        }
                      : {}
                  }
                  data-cursor-hover
                >
                  <span>{btn.label}</span>
                  {isGithub ? (
                    <IconGithub size={14} />
                  ) : isArch ? (
                    <IconLayers size={14} />
                  ) : isDemo ? (
                    <IconRocket size={14} />
                  ) : (
                    <IconExternalLink size={14} />
                  )}
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// PROJECTS SECTION
// ============================================
export default function ProjectsSection({
  selectedProjectId,
}: {
  selectedProjectId?: string | null;
}) {
  const [modalState, setModalState] = useState<{ project: Product; view: 'case-study' | 'architecture' } | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai' | 'web'>('all');

  useEffect(() => {
    if (selectedProjectId) {
      setActiveCategory('all');
    }
  }, [selectedProjectId]);

  const filteredProjects = PRODUCTS.filter((p) => {
    if (activeCategory === 'ai') return p.id === 'rex' || p.id === 'rexai';
    if (activeCategory === 'web') return p.id === 'tableserve' || p.id === 'rexai';
    return true;
  });

  return (
    <section id="products" className="relative">
      <div className="section-wrapper">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-block">02 Products</span>
          <h2 className="font-display text-4xl md:text-6xl font-black gradient-text-white mt-4">
            Flagship Product Showcase
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto text-base">
            Not generic portfolio cards. Each product is a fully engineered AI ecosystem.
          </p>

          {/* Interactive Category Filter Pills with SVG Icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            {[
              { id: 'all', label: 'All Flagship Products', icon: IconLayers },
              { id: 'ai', label: 'AI & Automation', icon: IconBot },
              { id: 'web', label: 'SaaS & Web Platforms', icon: IconGlobe },
            ].map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as 'all' | 'ai' | 'web')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 border border-primary'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <IconComponent size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects */}
        <div className="space-y-32 lg:space-y-48">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={(view) => setModalState({ project, view })}
            />
          ))}
        </div>
      </div>

      {/* Deep-Dive Architecture Modal */}
      <ProjectModal
        project={modalState?.project || null}
        initialView={modalState?.view || 'case-study'}
        onClose={() => setModalState(null)}
      />
    </section>
  );
}
