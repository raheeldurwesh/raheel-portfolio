'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { OWNER } from '@/lib/constants';

import {
  IconTerminal,
  IconMail,
  IconLinkedin,
  IconGithub,
  IconInstagram,
  IconLayers,
  IconSparkles,
  IconGlobe,
  IconBot,
} from '@/components/common/Icons';

interface TerminalLine {
  type: 'input' | 'output' | 'system' | 'success';
  content: React.ReactNode;
}

const COMMAND_ICONS = {
  contact: IconMail,
  resume: IconSparkles,
  linkedin: IconLinkedin,
  github: IconGithub,
  instagram: IconInstagram,
  tableserve: IconGlobe,
  rexai: IconBot,
  projects: IconLayers,
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const inputRef = useRef<HTMLInputElement>(null);

  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: 'REX OS AI Terminal Interface v2.5' },
    { type: 'system', content: 'Type "contact", "linkedin", "github", "instagram", "tableserve", "rexai", or "projects"' },
  ]);
  const [currentInput, setCurrentInput] = useState('');

  const processCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { type: 'input', content: `> ${command}` }]);

    setTimeout(() => {
      switch (cmd) {
        case 'contact':
          setLines((prev) => [
            ...prev,
            { type: 'success', content: `📧 Direct Email: ${OWNER.email}` },
            { type: 'output', content: 'Feel free to send inquiries regarding AI projects, custom software development, or full-time roles.' },
          ]);
          break;

        case 'resume':
          setLines((prev) => [
            ...prev,
            { type: 'success', content: `📄 Resume Access: ${OWNER.name} — AI & Python Developer` },
            { type: 'output', content: 'Link generated: /resume.pdf (Press Download to open full CV)' },
          ]);
          break;

        case 'linkedin':
          window.open(OWNER.linkedin, '_blank');
          setLines((prev) => [
            ...prev,
            { type: 'success', content: <span>🔗 LinkedIn Profile: <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.linkedin}</a></span> },
          ]);
          break;

        case 'github':
          window.open(OWNER.github, '_blank');
          setLines((prev) => [
            ...prev,
            { type: 'success', content: <span>🐙 GitHub Repositories: <a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.github}</a></span> },
          ]);
          break;

        case 'instagram':
          window.open(OWNER.instagram, '_blank');
          setLines((prev) => [
            ...prev,
            { type: 'success', content: <span>📸 Instagram Profile: <a href={OWNER.instagram} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.instagram}</a></span> },
          ]);
          break;

        case 'tableserve':
          window.open('https://table-serve.vercel.app/', '_blank');
          setLines((prev) => [
            ...prev,
            { type: 'success', content: <span>🍽️ TableServe Platform: <a href="https://table-serve.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">https://table-serve.vercel.app/</a></span> },
          ]);
          break;

        case 'rexai':
        case 'rex':
          window.open('https://rex-ai-raheel.vercel.app/', '_blank');
          setLines((prev) => [
            ...prev,
            { type: 'success', content: <span>🤖 REX AI Web Engine: <a href="https://rex-ai-raheel.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">https://rex-ai-raheel.vercel.app/</a></span> },
          ]);
          break;

        case 'projects':
          setLines((prev) => [
            ...prev,
            { type: 'output', content: '01 — REX (AI Desktop Assistant)' },
            { type: 'output', content: '02 — TableServe (AI Restaurant SaaS: https://table-serve.vercel.app/)' },
            { type: 'output', content: '03 — REX AI (Web AI Engine: https://rex-ai-raheel.vercel.app/)' },
          ]);
          break;

        case 'clear':
        case 'cls':
          setLines([
            { type: 'system', content: 'Terminal cleared.' },
            { type: 'system', content: 'Type "contact", "linkedin", "github", "instagram", "tableserve", "rexai", or "projects"' },
          ]);
          break;

        default:
          setLines((prev) => [
            ...prev,
            {
              type: 'output',
              content: `Command not recognized: "${command}". Try: contact, linkedin, github, instagram, tableserve, rexai, projects`,
            },
          ]);
          break;
      }
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(currentInput);
    setCurrentInput('');
  };

  return (
    <section id="contact" className="relative" ref={sectionRef}>
      <div className="section-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label inline-block mb-6">06 Contact</span>
          <h2 className="font-display text-4xl md:text-6xl font-black gradient-text-white mt-4">
            AI Terminal Contact Console
          </h2>
          <p className="text-white/60 mt-4 max-w-lg mx-auto text-base">
            Execute commands directly or send a direct inquiry to discuss AI engineering collaborations.
          </p>
        </motion.div>

        {/* AI Command Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="card-glow-border overflow-hidden bg-black/90 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.04] border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <IconTerminal size={14} className="text-white/50 ml-2" />
                <span className="text-[11px] font-mono text-white/50">
                  rex-hq-contact ~ zsh
                </span>
              </div>
              <span className="text-[10px] font-mono text-primary">
                AUTHENTICATED ACCESS
              </span>
            </div>

            {/* Terminal Body */}
            <div
              className="p-6 font-mono text-xs space-y-2.5 max-h-[380px] overflow-y-auto leading-relaxed cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <AnimatePresence mode="popLayout">
                {lines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {line.type === 'input' && (
                      <span className="text-cyan-400 font-bold">{line.content}</span>
                    )}
                    {line.type === 'output' && (
                      <span className="text-white/70">{line.content}</span>
                    )}
                    {line.type === 'system' && (
                      <span className="text-primary/90">{line.content}</span>
                    )}
                    {line.type === 'success' && (
                      <span className="text-emerald-400 font-bold">{line.content}</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-primary font-bold">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type 'linkedin', 'github', 'instagram', 'tableserve', 'rexai'..."
                  className="flex-1 bg-transparent outline-none text-white caret-primary placeholder:text-white/30"
                  autoFocus={isInView}
                  aria-label="Terminal Contact Command"
                />
              </form>
            </div>

            {/* Command Bar quick pills */}
            <div className="px-5 py-3 bg-white/[0.02] border-t border-white/10 flex flex-wrap gap-2 items-center justify-between text-[11px] font-mono">
              <span className="text-white/40">Quick Commands:</span>
              <div className="flex flex-wrap gap-1.5">
                {(['contact', 'linkedin', 'github', 'instagram', 'tableserve', 'rexai', 'projects'] as const).map((cmd) => {
                  const CmdIcon = COMMAND_ICONS[cmd];
                  return (
                    <button
                      key={cmd}
                      onClick={() => processCommand(cmd)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.05] hover:bg-primary/20 text-white/80 hover:text-white border border-white/10 transition-colors"
                    >
                      <CmdIcon size={12} />
                      <span>{cmd}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
