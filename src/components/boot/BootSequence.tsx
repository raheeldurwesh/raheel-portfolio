'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_SEQUENCE } from '@/lib/constants';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'booting' | 'welcome' | 'done'>('booting');

  const typeText = useCallback(
    (text: string, onDone: () => void) => {
      let i = 0;
      setDisplayedText('');
      setIsTyping(true);

      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          onDone();
        }
      }, 30);

      return () => clearInterval(interval);
    },
    []
  );

  useEffect(() => {
    if (phase !== 'booting') return;

    const totalDuration = BOOT_SEQUENCE.reduce((sum, s) => sum + s.duration, 0);
    let elapsed = 0;

    const runSequence = async () => {
      for (let i = 0; i < BOOT_SEQUENCE.length; i++) {
        setCurrentLine(i);
        await new Promise<void>((resolve) => {
          typeText(BOOT_SEQUENCE[i].text, () => {
            elapsed += BOOT_SEQUENCE[i].duration;
            setProgress((elapsed / totalDuration) * 100);
            setTimeout(resolve, BOOT_SEQUENCE[i].duration);
          });
        });
      }
      setPhase('welcome');
    };

    runSequence();
  }, [phase, typeText]);

  useEffect(() => {
    if (phase === 'welcome') {
      const timer = setTimeout(() => {
        setPhase('done');
        setTimeout(onComplete, 800);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8 max-w-lg px-6">
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center bg-white/[0.03] backdrop-blur-xl">
                <motion.div
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-primary/20"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Terminal output */}
            <div className="w-full space-y-3">
              {BOOT_SEQUENCE.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: index <= currentLine ? 1 : 0,
                    y: index <= currentLine ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  {/* Status indicator */}
                  <div
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-300 ${
                      index < currentLine
                        ? 'bg-emerald-400'
                        : index === currentLine
                        ? 'bg-primary animate-pulse'
                        : 'bg-white/10'
                    }`}
                  />
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      index < currentLine
                        ? 'text-white/40'
                        : index === currentLine
                        ? 'text-white/90'
                        : 'text-white/10'
                    }`}
                  >
                    {index === currentLine ? displayedText : line.text}
                    {index === currentLine && isTyping && (
                      <span className="inline-block w-[2px] h-4 bg-primary ml-0.5 align-middle animate-blink" />
                    )}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-xs">
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, #2563EB, #06B6D4)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
