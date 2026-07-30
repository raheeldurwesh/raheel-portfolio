'use client';

import { motion } from 'framer-motion';
import { OWNER, NAV_LINKS } from '@/lib/constants';
import { IconGithub, IconLinkedin, IconInstagram } from '@/components/common/Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5">
      <div className="section-wrapper !py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <span className="font-display text-lg font-semibold">
              R<span className="gradient-text">.</span>
            </span>
            <span className="text-xs text-white/30 font-mono">
              © {currentYear} {OWNER.name}
            </span>
          </div>

          {/* Center - Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono"
                data-cursor-hover
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={OWNER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/40 hover:text-white border border-white/10 transition-colors"
                aria-label="GitHub Profile"
              >
                <IconGithub size={15} />
              </a>
              <a
                href={OWNER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/40 hover:text-white border border-white/10 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <IconLinkedin size={15} />
              </a>
              <a
                href={OWNER.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/40 hover:text-white border border-white/10 transition-colors"
                aria-label="Instagram Profile"
              >
                <IconInstagram size={15} />
              </a>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-white/25 font-mono">
                Built with Next.js + Three.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
