'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { soundFX } from '@/lib/audioSFX';
import { IconVolume, IconVolumeX } from '@/components/common/Icons';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundFX.getMuted());
  }, []);

  const toggleSound = () => {
    const nextMute = soundFX.toggleMute();
    setIsMuted(nextMute);
    if (!nextMute) soundFX.playClick();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = NAV_LINKS.map((link) => link.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundFX.playClick();
    setIsMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'py-5 bg-gradient-to-b from-dark/90 via-dark/40 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#dashboard');
            }}
            onMouseEnter={() => soundFX.playHover()}
            className="relative group"
            data-cursor-hover
          >
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              R
              <span className="gradient-text">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div
            className={`hidden md:flex items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'glass-strong'
                : 'bg-transparent'
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  onMouseEnter={() => soundFX.playHover()}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-300"
                  data-cursor-hover
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-white/[0.06]"
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {link.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls & Status */}
          <div className="hidden md:flex items-center gap-3">
            {/* Sound SFX Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => soundFX.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/60 hover:text-white text-xs font-mono transition-colors"
              title="Toggle Interactive Sound Effects"
            >
              {isMuted ? (
                <>
                  <IconVolumeX size={14} className="text-red-400" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <IconVolume size={14} className="text-emerald-400" />
                  <span>SFX On</span>
                </>
              )}
            </button>

            <div className="w-px h-4 bg-white/10 mx-1" />

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/40 font-mono">Available</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
            data-cursor-hover
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={{
                  rotate: isMobileOpen ? 45 : 0,
                  y: isMobileOpen ? 6 : 0,
                }}
                className="block w-5 h-[1.5px] bg-white/80 origin-center"
              />
              <motion.span
                animate={{ opacity: isMobileOpen ? 0 : 1 }}
                className="block w-5 h-[1.5px] bg-white/80"
              />
              <motion.span
                animate={{
                  rotate: isMobileOpen ? -45 : 0,
                  y: isMobileOpen ? -6 : 0,
                }}
                className="block w-5 h-[1.5px] bg-white/80 origin-center"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-dark-50 border-l border-white/5 p-8 pt-24"
            >
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-white bg-white/[0.05]'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-12 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/40 font-mono">
                  Available for work
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
