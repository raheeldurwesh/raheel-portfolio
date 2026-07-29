'use client';

import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

import BootSequence from '@/components/boot/BootSequence';
import Navbar from '@/components/layout/Navbar';
import CustomCursor from '@/components/layout/CustomCursor';
import Footer from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import { loadSavedTheme } from '@/lib/themeManager';

// Dynamic imports for performance (heavy 3D components)
const HeroScene = dynamic(() => import('@/components/hero/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-dark flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  ),
});

const ProjectsSection = dynamic(
  () => import('@/components/projects/ProjectsSection'),
  { ssr: false }
);

const AboutSection = dynamic(
  () => import('@/components/about/AboutSection'),
  { ssr: false }
);

const TechSection = dynamic(
  () => import('@/components/tech/TechSection'),
  { ssr: false }
);

const StatsSection = dynamic(
  () => import('@/components/stats/StatsSection'),
  { ssr: false }
);

const ContactSection = dynamic(
  () => import('@/components/contact/ContactSection'),
  { ssr: false }
);

const ResearchSection = dynamic(
  () => import('@/components/research/ResearchSection'),
  { ssr: false }
);

export default function HomePage() {
  const [isBooted, setIsBooted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const handleBootComplete = useCallback(() => {
    setIsBooted(true);
  }, []);

  const handleProjectClick = useCallback((id: string) => {
    setSelectedProject(id);
    const el = document.getElementById(id) || document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Boot sequence */}
      <AnimatePresence>
        {!isBooted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Custom cursor (desktop only) */}
      {isBooted && <CustomCursor />}

      {/* Main content */}
      {isBooted && (
        <SmoothScrollProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Navbar />

            <main>
              {/* 01 Dashboard */}
              <HeroScene onProjectClick={handleProjectClick} />

              {/* 02 Products */}
              <ProjectsSection />

              {/* 03 Engineering */}
              <TechSection />

              {/* 04 Founder */}
              <AboutSection />

              {/* 05 Research */}
              <ResearchSection />

              {/* 06 Contact */}
              <ContactSection />
            </main>

            <Footer />
          </motion.div>
        </SmoothScrollProvider>
      )}
    </>
  );
}
