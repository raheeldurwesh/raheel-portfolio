'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, PRODUCTS, OWNER } from '@/lib/constants';
import { THEMES, applyTheme } from '@/lib/themeManager';
import { soundFX } from '@/lib/audioSFX';
import { IconSearch, IconMail, IconVolume, IconVolumeX } from '@/components/common/Icons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (id: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundFX.playWarp();
        if (isOpen) {
          onClose();
        } else {
          // Open trigger handled by parent or state toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavigation = useCallback(
    (href: string) => {
      soundFX.playClick();
      onClose();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [onClose]
  );

  const handleThemeChange = (themeId: string) => {
    soundFX.playSuccess();
    applyTheme(themeId);
    onClose();
  };

  const handleCopyEmail = () => {
    soundFX.playSuccess();
    navigator.clipboard.writeText(OWNER.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredNav = NAV_LINKS.filter((l) =>
    l.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredProjects = PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.subtitle.toLowerCase().includes(query.toLowerCase())
  );
  const filteredThemes = THEMES.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl bg-dark/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden font-sans z-10 backdrop-blur-xl"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              <IconSearch size={16} className="text-white/40 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, search project, or switch theme..."
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-white/40"
                autoFocus
              />
              <kbd className="text-[10px] font-mono text-white/40 bg-white/10 px-2 py-1 rounded">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="p-3 max-h-96 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {/* Navigation Section */}
              {filteredNav.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-primary uppercase tracking-wider mb-1.5 px-2">
                    Navigation
                  </div>
                  <div className="space-y-1">
                    {filteredNav.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        onMouseEnter={() => soundFX.playHover()}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/[0.06] flex items-center justify-between transition-colors"
                      >
                        <span>Jump to {item.label}</span>
                        <span className="text-[10px] text-white/40 font-mono">
                          {item.href}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {filteredProjects.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-primary uppercase tracking-wider mb-1.5 px-2">
                    Featured Projects
                  </div>
                  <div className="space-y-1">
                    {filteredProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          soundFX.playClick();
                          if (onSelectProject) onSelectProject(p.id);
                          onClose();
                          const el = document.getElementById('products');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        onMouseEnter={() => soundFX.playHover()}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:text-white hover:bg-white/[0.06] flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                          <span className="font-semibold text-white">
                            {p.title}
                          </span>
                          <span className="text-[11px] text-white/40">
                            — {p.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] text-cyan-400 font-mono">
                          View
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Theme Switcher Section */}
              {filteredThemes.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono text-primary uppercase tracking-wider mb-1.5 px-2">
                    Color Theme Accents
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {filteredThemes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleThemeChange(t.id)}
                        onMouseEnter={() => soundFX.playHover()}
                        className="text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:text-white hover:bg-white/[0.06] flex items-center gap-2.5 transition-colors border border-white/5"
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                          style={{ background: t.previewBg }}
                        />
                        <span className="truncate">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div>
                <div className="text-[11px] font-mono text-primary uppercase tracking-wider mb-1.5 px-2">
                  Quick Actions
                </div>
                <div className="space-y-1">
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={() => soundFX.playHover()}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/[0.06] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <IconMail size={14} className="text-primary" />
                      <span>Copy Contact Email ({OWNER.email})</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {copied ? 'COPIED!' : 'COPY'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      const muted = soundFX.toggleMute();
                      if (!muted) soundFX.playClick();
                      onClose();
                    }}
                    onMouseEnter={() => soundFX.playHover()}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/[0.06] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {soundFX.getMuted() ? (
                        <IconVolumeX size={14} className="text-red-400" />
                      ) : (
                        <IconVolume size={14} className="text-emerald-400" />
                      )}
                      <span>Toggle UI Sound Effects</span>
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {soundFX.getMuted() ? 'MUTED' : 'ACTIVE'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-white/40 font-mono">
              <span>Use Ctrl + K anytime to open palette</span>
              <span>Antigravity AI Interactive Hub</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
