'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const SKY_STARS = [
  { x: 8, y: 10, r: 1.2, d: 0.0 }, { x: 22, y: 6, r: 0.8, d: 0.4 },
  { x: 38, y: 14, r: 1.5, d: 0.8 }, { x: 52, y: 4, r: 1.0, d: 0.2 },
  { x: 67, y: 17, r: 0.8, d: 1.0 }, { x: 82, y: 8, r: 1.5, d: 0.6 },
  { x: 14, y: 32, r: 0.8, d: 0.5 }, { x: 33, y: 26, r: 1.2, d: 0.9 },
  { x: 48, y: 38, r: 0.8, d: 0.1 }, { x: 63, y: 22, r: 1.5, d: 0.7 },
  { x: 76, y: 35, r: 0.8, d: 0.3 }, { x: 91, y: 28, r: 1.2, d: 1.1 },
  { x: 5, y: 48, r: 0.8, d: 0.6 }, { x: 94, y: 52, r: 1.2, d: 0.8 },
];

type ChatbotTx = { userMsg: string; aiReply: string; aiStatic: string; placeholder: string };
type ContentTx = { generating: string; placeholder: string; button: string; done: string };
type WorkflowTx = { label: string };
type LLMTx = { title: string; q1: string; a1: string; q2: string; a2: string; placeholder: string };
type ConsultingTx = { efficiency: string; cost: string };
type CustomTx = { deploying: string; deployed: string };

function ChatbotMockup({ hovered, tx }: { hovered: boolean; tx: ChatbotTx }) {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'replied'>('idle');

  useEffect(() => {
    if (hovered) {
      setPhase('typing');
      const t = setTimeout(() => setPhase('replied'), 1100);
      return () => clearTimeout(t);
    } else {
      setPhase('idle');
    }
  }, [hovered]);

  return (
    <div className="w-full h-full flex flex-col justify-end p-5 gap-2.5">
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-xs text-white/60">U</div>
        <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs text-white/70 max-w-[78%]">
          {tx.userMsg}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'typing' && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-xs text-blue-400 font-bold">AI</div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
          </motion.div>
        )}
        {phase === 'replied' && (
          <motion.div
            key="reply"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-xs text-blue-400 font-bold">AI</div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs text-white/80 max-w-[78%]">
              {tx.aiReply}
            </div>
          </motion.div>
        )}
        {phase === 'idle' && (
          <motion.div
            key="ai-static"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-xs text-blue-400 font-bold">AI</div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs text-white/80 max-w-[78%]">
              {tx.aiStatic}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white/30">{tx.placeholder}</div>
        <motion.div
          className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400"
          animate={hovered ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.4, repeat: hovered ? Infinity : 0, repeatDelay: 0.8 }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
        </motion.div>
      </div>
    </div>
  );
}

function ContentMockup({ hovered, tx }: { hovered: boolean; tx: ContentTx }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6">
      <div className="w-full aspect-video rounded-xl border border-white/8 relative overflow-hidden">
        {/* Night sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04040f] via-[#0b0e2e] to-[#1a0f40]" />

        {/* Aurora band */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-2/5 rounded-b-xl"
          style={{ background: 'linear-gradient(to top, rgba(79,70,229,0.25), rgba(139,92,246,0.12), transparent)' }}
          animate={{ opacity: hovered ? 0.9 : 0.5 }}
          transition={{ duration: 2 }}
        />

        {/* Stars */}
        {SKY_STARS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2 }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2 + s.d, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
          />
        ))}

        {/* Moon */}
        <motion.div
          className="absolute rounded-full bg-[#fff8d0]"
          style={{ right: '18%', top: '12%', width: 26, height: 26 }}
          animate={{
            boxShadow: hovered
              ? '0 0 0 3px rgba(255,248,200,0.15), 0 0 28px 12px rgba(255,220,80,0.28)'
              : '0 0 0 2px rgba(255,248,200,0.07), 0 0 14px 4px rgba(255,220,80,0.14)',
          }}
          transition={{ duration: 1.5 }}
        />

        {/* Cloud 1 */}
        <motion.div
          className="absolute top-[40%] rounded-full bg-white/[0.06] blur-sm"
          style={{ left: '6%', width: 76, height: 20 }}
          animate={{ x: hovered ? 18 : 0, opacity: hovered ? 0.55 : 0.25 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        />

        {/* Cloud 2 */}
        <motion.div
          className="absolute top-[58%] rounded-full bg-white/[0.05] blur-sm"
          style={{ right: '8%', width: 58, height: 15 }}
          animate={{ x: hovered ? -12 : 0, opacity: hovered ? 0.45 : 0.18 }}
          transition={{ duration: 3.5, ease: 'easeInOut' }}
        />

        {/* Shooting star */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="shoot"
              className="absolute rounded-full"
              style={{
                width: 42, height: 1.5, top: '20%', left: '15%',
                rotate: -25,
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.85))',
              }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: [0, 1, 0], x: 64 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Done badge */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.0, duration: 0.35 }}
              className="absolute bottom-2 right-2 bg-black/60 border border-white/10 rounded px-2 py-0.5 text-[10px] text-white/60"
            >
              {tx.done}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full flex items-center gap-2">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/30">{tx.placeholder}</div>
        <motion.div
          className="px-3 py-2 bg-white/8 border border-white/12 rounded-lg text-xs text-white/60 font-medium"
          animate={hovered ? { backgroundColor: 'rgba(59,130,246,0.2)', borderColor: 'rgba(59,130,246,0.3)' } : {}}
          transition={{ duration: 0.3 }}
        >
          {tx.button}
        </motion.div>
      </div>
    </div>
  );
}

const APP_ICONS = [
  // Slack
  <svg key="slack" viewBox="0 0 24 24" className="w-3 h-3 fill-current text-purple-400"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zm2.521-10.123a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>,
  // Gmail
  <svg key="gmail" viewBox="0 0 24 24" className="w-3 h-3 fill-current text-red-400"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>,
  // Notion
  <svg key="notion" viewBox="0 0 24 24" className="w-3 h-3 fill-current text-white/70"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>,
  // Discord
  <svg key="discord" viewBox="0 0 24 24" className="w-3 h-3 fill-current text-indigo-400"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>,
  // GitHub
  <svg key="github" viewBox="0 0 24 24" className="w-3 h-3 fill-current text-white/60"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
];

function WorkflowMockup({ hovered, tx }: { hovered: boolean; tx: WorkflowTx }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-28 h-28 rounded-full border-2 border-blue-400/40"
          animate={{ rotate: 360 }}
          transition={{ duration: hovered ? 4 : 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-20 h-20 rounded-full border border-blue-400/20"
          animate={{ rotate: -360 }}
          transition={{ duration: hovered ? 3 : 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute flex flex-col items-center"
          animate={hovered ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 0.6, repeat: hovered ? Infinity : 0, repeatDelay: 0.4 }}
        >
          <span className="text-2xl font-bold text-white">100+</span>
          <span className="text-white/50 text-xs">{tx.label}</span>
        </motion.div>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-lg bg-white/8 border border-white/15 flex items-center justify-center"
            style={{ transform: `rotate(${deg}deg) translateX(56px) rotate(-${deg}deg)` }}
            animate={hovered ? {
              boxShadow: ['0 0 0px rgba(96,165,250,0)', '0 0 8px rgba(96,165,250,0.6)', '0 0 0px rgba(96,165,250,0)'],
              borderColor: ['rgba(255,255,255,0.15)', 'rgba(96,165,250,0.5)', 'rgba(255,255,255,0.15)'],
            } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
          >
            {APP_ICONS[i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LLMMockup({ hovered, tx }: { hovered: boolean; tx: LLMTx }) {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    if (hovered) {
      const t = setTimeout(() => setShowSecond(true), 600);
      return () => clearTimeout(t);
    } else {
      setShowSecond(false);
    }
  }, [hovered]);

  return (
    <div className="w-full h-full flex flex-col justify-center p-5 gap-2">
      <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-blue-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {tx.title}
      </div>
      <div className="space-y-1.5">
        <div className="bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-xs text-white/60">{tx.q1}</div>
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <motion.div className="w-2 h-2 rounded-full bg-blue-400" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
          <div className="text-xs text-white/70">{tx.a1}</div>
        </div>
      </div>

      <AnimatePresence>
        {showSecond && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1.5"
          >
            <div className="bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-xs text-white/60">{tx.q2}</div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <motion.div className="w-2 h-2 rounded-full bg-blue-400" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
              </div>
              <div className="text-xs text-white/70">{tx.a2}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 mt-auto">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/30">{tx.placeholder}</div>
        <motion.div
          className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center"
          animate={hovered ? { backgroundColor: 'rgba(59,130,246,0.3)' } : {}}
        >
          <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" /></svg>
        </motion.div>
      </div>
    </div>
  );
}

function ConsultingMockup({ hovered, tx }: { hovered: boolean; tx: ConsultingTx }) {
  const points = [10, 22, 18, 35, 30, 48, 42, 60, 55, 72];
  const max = Math.max(...points);
  const w = 240;
  const h = 80;
  const pts = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * h}`).join(' ');

  return (
    <div className="w-full h-full flex flex-col justify-center p-5 gap-3">
      <div className="flex gap-3">
        <motion.div
          className="flex-1 bg-white/5 border border-white/8 rounded-xl p-3"
          animate={hovered ? { borderColor: 'rgba(74,222,128,0.3)', backgroundColor: 'rgba(74,222,128,0.05)' } : { borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.05)' }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-xs text-white/40 mb-1">{tx.efficiency}</div>
          <div className="text-lg font-bold text-green-400">+103%</div>
        </motion.div>
        <motion.div
          className="flex-1 bg-white/5 border border-white/8 rounded-xl p-3"
          animate={hovered ? { borderColor: 'rgba(96,165,250,0.3)', backgroundColor: 'rgba(96,165,250,0.05)' } : { borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.05)' }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-xs text-white/40 mb-1">{tx.cost}</div>
          <div className="text-lg font-bold text-blue-400">-67%</div>
        </motion.div>
      </div>
      <div className="bg-white/5 border border-white/8 rounded-xl p-3">
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
          <motion.polyline
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            points={pts}
            initial={{ pathLength: 0.6, opacity: 0.6 }}
            animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0.6, opacity: 0.6 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {points.map((p, i) => (
            i === points.length - 1 && (
              <motion.circle
                key={i}
                cx={(i / (points.length - 1)) * w}
                cy={h - (p / max) * h}
                r="4"
                fill="#60a5fa"
                animate={hovered ? { r: 6, opacity: 1 } : { r: 4, opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              />
            )
          ))}
        </svg>
      </div>
    </div>
  );
}

function CustomAIMockup({ hovered, tx }: { hovered: boolean; tx: CustomTx }) {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (hovered) {
      const t = setTimeout(() => setShowResult(true), 700);
      return () => clearTimeout(t);
    } else {
      setShowResult(false);
    }
  }, [hovered]);

  return (
    <div className="w-full h-full flex flex-col justify-center p-5 gap-2">
      <div className="bg-black/30 border border-white/8 rounded-xl p-3 font-mono text-xs space-y-1.5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="text-blue-400">{'const'} <span className="text-white">model</span> <span className="text-white/50">= await</span> <span className="text-green-400">AI.build</span><span className="text-white/50">({'{'}</span></div>
        <div className="text-white/50 pl-4">task: <span className="text-yellow-300/70">"custom-solution"</span>,</div>
        <div className="text-white/50 pl-4">data: <span className="text-yellow-300/70">yourData</span>,</div>
        <div className="text-white/50">{'}'}<span className="text-white/30">)</span></div>

        <AnimatePresence>
          {showResult ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-green-400/90 flex items-center gap-1 mt-1"
            >
              ✓ <span className="text-white/60">{tx.deployed}</span>
            </motion.div>
          ) : (
            <motion.div
              key="blink"
              className="text-green-400/80 flex items-center gap-1 mt-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ▸ <span className="text-white/50">{tx.deploying}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Services() {
  const t = useTranslations('services');
  const m = useTranslations('mockups');
  const items = t.raw('items') as { title: string; description: string }[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const titleWords = t('title').split(' ');
  const lastWord = titleWords.pop();
  const firstWords = titleWords.join(' ');

  const txList = [
    { userMsg: m('chatbot.userMsg'), aiReply: m('chatbot.aiReply'), aiStatic: m('chatbot.aiStatic'), placeholder: m('chatbot.placeholder') },
    { generating: m('content.generating'), placeholder: m('content.placeholder'), button: m('content.button'), done: m('content.done') },
    { label: m('workflow.label') },
    { title: m('llm.title'), q1: m('llm.q1'), a1: m('llm.a1'), q2: m('llm.q2'), a2: m('llm.a2'), placeholder: m('llm.placeholder') },
    { efficiency: m('consulting.efficiency'), cost: m('consulting.cost') },
    { deploying: m('custom.deploying'), deployed: m('custom.deployed') },
  ] as const;

  return (
    <section id="services" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {firstWords} <span className="text-blue-400">{lastWord}</span>
          </h2>
        </motion.div>

        {/* Row 1: 2 large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.slice(0, 2).map((item, index) => {
            const isHovered = hoveredIndex === index;
            const tx = txList[index];
            return (
              <motion.div
                key={index}
                className="rounded-2xl bg-white/4 border border-white/8 transition-colors duration-300 overflow-hidden flex flex-col cursor-default"
                style={{ borderColor: isHovered ? 'rgba(59,130,246,0.3)' : undefined }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="h-52 border-b border-white/6">
                  {index === 0 && <ChatbotMockup hovered={isHovered} tx={tx as ChatbotTx} />}
                  {index === 1 && <ContentMockup hovered={isHovered} tx={tx as ContentTx} />}
                </div>
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Row 2: 4 smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {items.slice(2).map((item, index) => {
            const cardIndex = index + 2;
            const isHovered = hoveredIndex === cardIndex;
            const tx = txList[cardIndex];
            return (
              <motion.div
                key={index}
                className="rounded-2xl bg-white/4 border border-white/8 transition-colors duration-300 overflow-hidden flex flex-col cursor-default"
                style={{ borderColor: isHovered ? 'rgba(59,130,246,0.3)' : undefined }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
                onMouseEnter={() => setHoveredIndex(cardIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="h-40 border-b border-white/6">
                  {cardIndex === 2 && <WorkflowMockup hovered={isHovered} tx={tx as WorkflowTx} />}
                  {cardIndex === 3 && <LLMMockup hovered={isHovered} tx={tx as LLMTx} />}
                  {cardIndex === 4 && <ConsultingMockup hovered={isHovered} tx={tx as ConsultingTx} />}
                  {cardIndex === 5 && <CustomAIMockup hovered={isHovered} tx={tx as CustomTx} />}
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-sm mb-1.5">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
