'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '@/lib/audioSFX';

interface BootSequenceProps {
  onComplete: () => void;
}

// 12 Authentic 90° & 45° Zigzag PCB Copper Circuit Traces
const ZIGZAG_TRACES = [
  // Top Right
  {
    path: 'M 500 360 V 240 H 680 V 160 H 860',
    points: [[500, 360], [500, 240], [680, 240], [680, 160], [860, 160]],
    end: [860, 160],
  },
  {
    path: 'M 640 450 H 760 V 320 H 920',
    points: [[640, 450], [760, 450], [760, 320], [920, 320]],
    end: [920, 320],
  },
  {
    path: 'M 600 380 L 720 260 H 840 V 120',
    points: [[600, 380], [720, 260], [840, 260], [840, 120]],
    end: [840, 120],
  },

  // Top Left
  {
    path: 'M 500 360 V 240 H 320 V 160 H 140',
    points: [[500, 360], [500, 240], [320, 240], [320, 160], [140, 160]],
    end: [140, 160],
  },
  {
    path: 'M 360 450 H 240 V 320 H 80',
    points: [[360, 450], [240, 450], [240, 320], [80, 320]],
    end: [80, 320],
  },
  {
    path: 'M 400 380 L 280 260 H 160 V 120',
    points: [[400, 380], [280, 260], [160, 260], [160, 120]],
    end: [160, 120],
  },

  // Bottom Left
  {
    path: 'M 500 640 V 760 H 320 V 840 H 140',
    points: [[500, 640], [500, 760], [320, 760], [320, 840], [140, 840]],
    end: [140, 840],
  },
  {
    path: 'M 360 550 H 240 V 680 H 80',
    points: [[360, 550], [240, 550], [240, 680], [80, 680]],
    end: [80, 680],
  },
  {
    path: 'M 400 620 L 280 740 H 160 V 880',
    points: [[400, 620], [280, 740], [160, 740], [160, 880]],
    end: [160, 880],
  },

  // Bottom Right
  {
    path: 'M 500 640 V 760 H 680 V 840 H 860',
    points: [[500, 640], [500, 760], [680, 760], [680, 840], [860, 840]],
    end: [860, 840],
  },
  {
    path: 'M 640 550 H 760 V 680 H 920',
    points: [[640, 550], [760, 550], [760, 680], [920, 680]],
    end: [920, 680],
  },
  {
    path: 'M 600 620 L 720 740 H 840 V 880',
    points: [[600, 620], [720, 740], [840, 740], [840, 880]],
    end: [840, 880],
  },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('ALIGNING CHIPSET WITH PCB SOCKET...');
  const [isFitted, setIsFitted] = useState(false);
  const [isPowered, setIsPowered] = useState(false);
  const [phase, setPhase] = useState<'booting' | 'welcome' | 'done'>('booting');

  useEffect(() => {
    if (phase !== 'booting') return;

    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 3 + 1.8;
      currentProgress += increment;

      if (currentProgress >= 15 && !isFitted) {
        setIsFitted(true);
        soundFX.playClick();
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusText('CHIPSET ENERGIZED — ZIGZAG POWER DISPATCHED 360°');
        setIsPowered(true);
        soundFX.playWarp();
        clearInterval(interval);

        setTimeout(() => {
          setPhase('welcome');
          setTimeout(() => {
            setPhase('done');
            setTimeout(onComplete, 600);
          }, 800);
        }, 600);
      } else {
        setProgress(Math.floor(currentProgress));
        if (currentProgress > 75) {
          setStatusText('SYSTEM CLOCK SYNCHRONIZED ACROSS PCB');
        } else if (currentProgress > 45) {
          setStatusText('SPREADING POWER VIA ZIGZAG PCB TRACES...');
        } else if (currentProgress > 20) {
          setStatusText('SOCKET ENGAGED — DISPATCHING ZIGZAG POWER...');
        }
      }
    }, 40);

    return () => clearInterval(interval);
  }, [phase, isFitted, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#04080D] text-white overflow-hidden select-none"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* PCB Motherboard Background Grid Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 75%),
                  linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 24px 24px, 24px 24px',
              }}
            />
          </div>

          {/* ZIGZAG PCB COPPER TRACE NETWORK */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg className="w-full h-full max-w-6xl max-h-6xl opacity-80" viewBox="0 0 1000 1000" fill="none">
              <defs>
                <linearGradient id="traceGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="traceGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* 12 Authentic 90° & 45° Zigzag Circuit Trace Lines */}
              {ZIGZAG_TRACES.map((trace, i) => {
                const isEven = i % 2 === 0;
                const strokeColor = isFitted
                  ? isEven
                    ? 'url(#traceGradCyan)'
                    : 'url(#traceGradEmerald)'
                  : '#1E293B';

                // Extract x and y coordinates array for energy animation
                const xCoords = trace.points.map((p) => p[0]);
                const yCoords = trace.points.map((p) => p[1]);

                return (
                  <g key={`zigzag-${i}`}>
                    {/* PCB Zigzag Copper Trace Path */}
                    <path
                      d={trace.path}
                      stroke={strokeColor}
                      strokeWidth={isFitted ? '2.5' : '1.5'}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={isFitted ? 'none' : '4 4'}
                    />

                    {/* Solder Joints at each Zigzag Bend */}
                    {trace.points.map((pt, pIdx) => (
                      <circle
                        key={`pt-${i}-${pIdx}`}
                        cx={pt[0]}
                        cy={pt[1]}
                        r={pIdx === trace.points.length - 1 ? '5' : '3'}
                        fill={isFitted ? (isEven ? '#00E5FF' : '#10B981') : '#334155'}
                        className="transition-colors duration-500"
                      />
                    ))}

                    {/* Traveling Energy Pulse Dot moving along Zigzag points when fitted */}
                    {isFitted && (
                      <motion.circle
                        r="4.5"
                        fill={isEven ? '#00E5FF' : '#10B981'}
                        initial={{ cx: xCoords[0], cy: yCoords[0], opacity: 0 }}
                        animate={{
                          cx: xCoords,
                          cy: yCoords,
                          opacity: [0, 1, 1, 0.8, 0],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          delay: i * 0.09,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Top PCB Telemetry HUD */}
          <div className="w-full max-w-5xl px-8 pt-8 flex items-center justify-between z-10 font-mono text-[11px] tracking-widest text-white/60">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isFitted ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'
                }`}
              />
              <span>PCB_SOCKET: {isFitted ? 'FITTED & ZIGZAG POWER ACTIVE' : 'WAITING FOR CHIPSET'}</span>
            </div>
            <div className="hidden sm:block">SOCKET_TYPE: LGA-1700 NEURAL</div>
            <div>RAILS: {isPowered ? '1.20V OK' : '0.00V'}</div>
          </div>

          {/* Central Assembly: PCB Socket + Descending Chipset + 360 Shockwaves */}
          <div className="relative flex flex-col items-center justify-center my-auto z-10">

            {/* 360° SPREADING POWER SHOCKWAVE EXPANSION RINGS */}
            {isFitted && (
              <>
                <motion.div
                  initial={{ scale: 0.3, opacity: 1 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-cyan-400 bg-cyan-500/10 pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.3, opacity: 0.8 }}
                  animate={{ scale: 4.2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: 'easeOut' }}
                  className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-emerald-400 bg-emerald-500/10 pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.3, opacity: 0.6 }}
                  animate={{ scale: 5.0, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.4, ease: 'easeOut' }}
                  className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-blue-400 bg-blue-500/5 pointer-events-none"
                />
              </>
            )}

            {/* PCB Socket Container (Base on Motherboard) */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-3xl bg-[#080E17] border-2 border-emerald-500/40 p-4 shadow-2xl flex items-center justify-center backdrop-blur-2xl">

              {/* Outer Metallic PCB Socket Mounting Brackets */}
              <div className="absolute inset-2 border border-dashed border-amber-500/30 rounded-2xl pointer-events-none" />

              {/* Corner Locking Clamps */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400" />

              {/* PCB Contact Pin Matrix (Underneath the Chipset) */}
              <div className="w-full h-full rounded-xl bg-[#04070D] border border-emerald-500/20 p-3 grid grid-cols-8 gap-1 opacity-70">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-colors duration-500 ${
                      isFitted ? 'bg-cyan-400/80 shadow-sm shadow-cyan-400' : 'bg-amber-500/40'
                    }`}
                  />
                ))}
              </div>

              {/* THE CHIPSET (Descends and FITS into the PCB Socket) */}
              <motion.div
                initial={{ scale: 1.35, y: -45, opacity: 0 }}
                animate={
                  isFitted
                    ? { scale: 0.92, y: 0, opacity: 1 }
                    : { scale: 1.25, y: -20, opacity: 0.95 }
                }
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 22,
                }}
                className="absolute inset-4 rounded-2xl bg-[#0B1021] border-2 border-cyan-400/60 p-4 flex flex-col items-center justify-between shadow-2xl backdrop-blur-xl z-20"
                style={{
                  boxShadow: isFitted
                    ? '0 0 50px rgba(0, 229, 255, 0.6), inset 0 0 25px rgba(0, 229, 255, 0.4)'
                    : '0 20px 40px rgba(0, 0, 0, 0.8)',
                }}
              >
                {/* Chipset Contact Pins along perimeter */}
                <div className="absolute -top-2 left-6 right-6 flex justify-between">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`t-${i}`} className="w-1.5 h-2.5 bg-gradient-to-b from-amber-400 to-cyan-400 rounded-t-sm" />
                  ))}
                </div>
                <div className="absolute -bottom-2 left-6 right-6 flex justify-between">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`b-${i}`} className="w-1.5 h-2.5 bg-gradient-to-t from-amber-400 to-cyan-400 rounded-b-sm" />
                  ))}
                </div>
                <div className="absolute -left-2 top-6 bottom-6 flex flex-col justify-between">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`l-${i}`} className="w-2.5 h-1.5 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-l-sm" />
                  ))}
                </div>
                <div className="absolute -right-2 top-6 bottom-6 flex flex-col justify-between">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`r-${i}`} className="w-2.5 h-1.5 bg-gradient-to-l from-amber-400 to-cyan-400 rounded-r-sm" />
                  ))}
                </div>

                {/* Silicon Interior Die & Core */}
                <div className="w-full h-full rounded-xl bg-[#060914] border border-cyan-500/30 flex flex-col items-center justify-between p-3 relative overflow-hidden">

                  {/* Silicon texture grid */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.8) 1px, transparent 0)',
                      backgroundSize: '10px 10px',
                    }}
                  />

                  {/* Header text */}
                  <div className="z-10 text-[8px] font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isFitted ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span>NEURAL CHIPSET // REX-V4</span>
                  </div>

                  {/* Central Energy Nucleus */}
                  <div className="relative my-auto flex items-center justify-center">
                    <motion.div
                      className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-cyan-400/60"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-600 shadow-lg flex items-center justify-center"
                      animate={
                        isFitted
                          ? {
                              scale: [0.95, 1.1, 0.95],
                              boxShadow: [
                                '0 0 10px rgba(0,229,255,0.6)',
                                '0 0 30px rgba(0,229,255,1)',
                                '0 0 10px rgba(0,229,255,0.6)',
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <span className="text-white font-mono text-[10px] font-bold">AI</span>
                    </motion.div>
                  </div>

                  {/* Serial Footer */}
                  <div className="z-10 text-[7px] font-mono text-white/50 tracking-widest">
                    LGA-1700 // 5.2 GHz
                  </div>
                </div>

                {/* Electrical Spark Lock Pulse Effect on Socket Fitting */}
                {isFitted && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-2xl border-2 border-cyan-400 bg-cyan-400/20 pointer-events-none"
                  />
                )}
              </motion.div>

            </div>

            {/* Power Telemetry & Progress Readout */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="text-center">
                <motion.div
                  key={progress}
                  initial={{ opacity: 0.8, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center justify-center gap-2"
                >
                  <span className="gradient-text font-display">POWERING CHIPSET</span>
                  <span className="text-cyan-400">{progress}%</span>
                </motion.div>

                <p className="font-mono text-xs text-emerald-400/90 tracking-widest uppercase mt-1">
                  {statusText}
                </p>
              </div>

              {/* Progress Bar Container */}
              <div className="w-64 sm:w-80 h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-emerald-500/30 shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-600 shadow-lg shadow-cyan-400/50"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                />
              </div>
            </div>

          </div>

          {/* Bottom Telemetry Footer */}
          <div className="w-full max-w-5xl px-8 pb-8 flex items-center justify-between z-10 font-mono text-[10px] text-white/40 tracking-widest">
            <div>MOTHERBOARD: PCB_v4.2</div>
            <div className="hidden sm:block">ZIGZAG POWER DISPATCH: ACTIVE</div>
            <div>RAHEEL PARVEZ DURWESH</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
