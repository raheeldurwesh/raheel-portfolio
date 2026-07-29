'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFX } from '@/lib/audioSFX';
import { OWNER, ENGINEERING_STACK, PRODUCTS } from '@/lib/constants';
import { IconClose, IconBot } from '@/components/common/Icons';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const PRESET_PROMPTS = [
  ' What is REX AI?',
  '⚡ Show Core Skills',
  '💼 Is Raheel Available?',
  '🚀 How was TableServe built?',
];

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello! I am Raheel's Portfolio AI Assistant. Ask me anything about projects, skills, or collaborations!`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    soundFX.playClick();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    // Simulate AI thinking & response
    setTimeout(() => {
      let aiResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('rex') || lower.includes('assistant')) {
        aiResponse = `REX is Raheel's flagship AI Desktop Assistant! Built with 6,600+ lines of Python, featuring 120+ voice commands, WhatsApp/Telegram automation, OCR, and smart focus mode.`;
      } else if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) {
        const topSkills = ENGINEERING_STACK.flatMap((cat) => cat.chips).slice(0, 7).join(', ');
        aiResponse = `Core Engineering Stack: Python, React, Next.js, FastAPI, Supabase, OpenAI APIs. Stack includes: ${topSkills}.`;
      } else if (lower.includes('avail') || lower.includes('hire') || lower.includes('contact')) {
        aiResponse = `${OWNER.name} is available for AI engineering and software development projects! Reach out directly via ${OWNER.email}.`;
      } else if (lower.includes('tableserve')) {
        aiResponse = `TableServe is an AI-powered QR contactless dining platform featuring real-time kitchen display synchronization, dynamic ordering, and automated menu translation.`;
      } else {
        aiResponse = `Thanks for asking! Raheel specializes in ${OWNER.tagline}. Check out the Products section or reach out via the Contact form for custom AI solutions!`;
      }

      soundFX.playSuccess();
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse },
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          soundFX.playWarp();
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-dark-50/90 hover:bg-dark border border-primary/40 text-white rounded-full shadow-2xl backdrop-blur-xl group cursor-pointer"
        data-cursor-hover
      >
        <div className="relative flex items-center justify-center w-3 h-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
        </div>
        <span className="text-xs font-mono font-bold gradient-text flex items-center gap-1.5">
          <IconBot size={14} className="text-primary" />
          <span>Interactive AI Core</span>
        </span>
      </motion.button>

      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-22 right-6 z-40 w-full max-w-sm bg-dark/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  <IconBot size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">
                    Portfolio AI Copilot
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Online & Interactive
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsOpen(false);
                }}
                className="text-white/40 hover:text-white p-1 rounded-md hover:bg-white/10 transition"
                aria-label="Close AI chat"
              >
                <IconClose size={14} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="p-4 h-72 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-white/[0.06] text-white/90 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.06] text-white/50 text-xs px-3 py-2 rounded-2xl rounded-bl-none flex items-center gap-1">
                    <span>AI is typing</span>
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-white/[0.02] border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
              {PRESET_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  onMouseEnter={() => soundFX.playHover()}
                  className="shrink-0 text-[10px] font-mono text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-full transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center px-3 py-2.5 bg-black/40 border-t border-white/10"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about AI, projects..."
                className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                className="ml-2 text-xs font-bold text-primary hover:text-cyan-400 font-mono transition-colors"
              >
                SEND
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
