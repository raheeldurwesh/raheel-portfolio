'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OWNER, PROJECTS, ENGINEERING_STACK } from '@/lib/constants';

interface TerminalMessage {
  id: string;
  type: 'user' | 'system' | 'error' | 'success';
  content: string | React.ReactNode;
}

export default function RexTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalMessage[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'REX AI Terminal v2.5 Online. Type "help" for available commands.',
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const userMsg: TerminalMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `> ${inputVal}`,
    };

    let responseMsg: TerminalMessage;

    switch (cmd) {
      case 'help':
      case '?':
      case 'commands':
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: (
            <div className="space-y-1">
              <p className="text-primary font-bold">Available Commands:</p>
              <p><span className="text-cyan-400">help</span> - List all commands</p>
              <p><span className="text-cyan-400">about</span> - Learn about {OWNER.name}</p>
              <p><span className="text-cyan-400">projects</span> - List featured AI projects</p>
              <p><span className="text-cyan-400">tableserve</span> - TableServe SaaS live link</p>
              <p><span className="text-cyan-400">rexai</span> - REX AI Web Engine live link</p>
              <p><span className="text-cyan-400">linkedin</span> - LinkedIn profile</p>
              <p><span className="text-cyan-400">github</span> - GitHub profile</p>
              <p><span className="text-cyan-400">instagram</span> - Instagram profile</p>
              <p><span className="text-cyan-400">contact</span> - Contact info & social links</p>
              <p><span className="text-cyan-400">clear</span> - Clear terminal buffer</p>
            </div>
          ),
        };
        break;

      case 'about':
      case 'whoami':
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: `${OWNER.name} | ${OWNER.role}\n${OWNER.tagline}`,
        };
        break;

      case 'projects':
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: (
            <div className="space-y-2">
              <p className="text-blue-400 font-bold">Featured Projects:</p>
              {PROJECTS.map((p) => (
                <div key={p.id} className="border-l-2 border-primary/50 pl-2">
                  <p className="font-bold text-white">{p.title} <span className="text-xs text-white/50">({p.subtitle})</span></p>
                  <p className="text-xs text-white/70">{p.description}</p>
                </div>
              ))}
            </div>
          ),
        };
        break;

      case 'rex':
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'success',
          content: (
            <div className="space-y-1 text-xs">
              <p className="text-blue-400 font-bold">REX AI Desktop Assistant</p>
              <p>• 120+ Voice Commands for Desktop Automation</p>
              <p>• Built with 6,600+ Lines of Python Code</p>
              <p>• Integrations: WhatsApp, Telegram, Email, Weather, Focus Mode, OCR</p>
              <p>• Web Engine: https://rex-ai-raheel.vercel.app/</p>
            </div>
          ),
        };
        break;

      case 'rexai':
        window.open('https://rex-ai-raheel.vercel.app/', '_blank');
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'success',
          content: (
            <span>🤖 REX AI Web Platform: <a href="https://rex-ai-raheel.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">https://rex-ai-raheel.vercel.app/</a></span>
          ),
        };
        break;

      case 'tableserve':
        window.open('https://table-serve.vercel.app/', '_blank');
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'success',
          content: (
            <span>🍽️ TableServe Restaurant SaaS Platform: <a href="https://table-serve.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">https://table-serve.vercel.app/</a></span>
          ),
        };
        break;

      case 'linkedin':
        window.open(OWNER.linkedin, '_blank');
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'success',
          content: (
            <span>🔗 LinkedIn: <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.linkedin}</a></span>
          ),
        };
        break;

      case 'github':
        window.open(OWNER.github, '_blank');
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'success',
          content: (
            <span>🐙 GitHub: <a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.github}</a></span>
          ),
        };
        break;

      case 'instagram':
        window.open(OWNER.instagram, '_blank');
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'success',
          content: (
            <span>📸 Instagram: <a href={OWNER.instagram} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.instagram}</a></span>
          ),
        };
        break;

      case 'skills':
      case 'stack':
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: (
            <div className="space-y-2">
              <p className="text-primary font-bold">Engineering Stack:</p>
              {ENGINEERING_STACK.map((stack, i) => (
                <div key={i}>
                  <span className="text-cyan-400 font-bold">{stack.category}:</span>{' '}
                  <span className="text-gray-300">{stack.chips.join(', ')}</span>
                </div>
              ))}
            </div>
          ),
        };
        break;

      case 'contact':
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: (
            <div className="space-y-1 text-xs">
              <p className="text-emerald-400 font-bold">Contact & Profiles:</p>
              <p>🐙 GitHub: <a href={OWNER.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.github}</a></p>
              <p>🔗 LinkedIn: <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.linkedin}</a></p>
              <p>📸 Instagram: <a href={OWNER.instagram} target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">{OWNER.instagram}</a></p>
              <p>🤖 REX AI: <a href="https://rex-ai-raheel.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">https://rex-ai-raheel.vercel.app/</a></p>
              <p>🍽️ TableServe: <a href="https://table-serve.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-400">https://table-serve.vercel.app/</a></p>
            </div>
          ),
        };
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        responseMsg = {
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: `Command not recognized: "${cmd}". Type "help" for a list of available commands.`,
        };
        break;
    }

    setHistory((prev) => [...prev, userMsg, responseMsg]);
    setInputVal('');
  };

  return (
    <>
      {/* Trigger floating button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-dark/90 hover:bg-dark border border-primary/40 text-white px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md font-mono text-xs cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse group-hover:bg-cyan-400" />
        <span className="gradient-text font-bold">&gt;_ REX AI Terminal</span>
      </motion.button>

      {/* Terminal Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-full max-w-lg bg-dark/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-white/60 text-[11px] ml-2">rex-ai-terminal ~ zsh</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Output History Area */}
            <div className="p-4 h-72 overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-white/10">
              {history.map((msg) => (
                <div key={msg.id} className="leading-relaxed">
                  {msg.type === 'user' && (
                    <span className="text-cyan-400 font-bold">{msg.content}</span>
                  )}
                  {msg.type === 'system' && (
                    <div className="text-white/80 whitespace-pre-wrap">{msg.content}</div>
                  )}
                  {msg.type === 'success' && (
                    <div className="text-green-400 whitespace-pre-wrap">{msg.content}</div>
                  )}
                  {msg.type === 'error' && (
                    <span className="text-red-400">{msg.content}</span>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Command Input Form */}
            <form onSubmit={handleCommand} className="flex items-center border-t border-white/10 px-4 py-2.5 bg-black/40">
              <span className="text-blue-400 mr-2 font-bold">&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type command ('help', 'projects', 'skills')..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-white/30"
                autoFocus
              />
              <button type="submit" className="text-primary hover:text-cyan-400 font-bold text-xs">
                ENTER
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
