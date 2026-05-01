'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const TOOL_ICONS = [
  { label: 'ChatGPT', color: 'text-green-400', bg: 'bg-green-500/15 border-green-500/25',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.412-.663zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg> },
  { label: 'Notion', color: 'text-white/70', bg: 'bg-white/8 border-white/15',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933z"/></svg> },
  { label: 'Slack', color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/25',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zm2.521-10.123a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg> },
  { label: 'GitHub', color: 'text-white/60', bg: 'bg-white/6 border-white/12',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { label: 'Discord', color: 'text-indigo-400', bg: 'bg-indigo-500/15 border-indigo-500/25',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.033.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg> },
  { label: 'Gmail', color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/25',
    icon: <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg> },
];

function AnalyzeMockup({ hovered }: { hovered: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-5">
      <div className="relative w-full max-w-[220px]">
        <div className="grid grid-cols-3 gap-2.5">
          {TOOL_ICONS.map((tool, i) => (
            <motion.div
              key={tool.label}
              className={`aspect-square rounded-xl border flex items-center justify-center ${tool.bg} ${tool.color}`}
              animate={hovered ? {
                scale: [1, 1.12, 1],
                boxShadow: ['0 0 0px rgba(96,165,250,0)', '0 0 10px rgba(96,165,250,0.3)', '0 0 0px rgba(96,165,250,0)'],
              } : { scale: 1 }}
              transition={{ duration: 0.7, repeat: hovered ? Infinity : 0, delay: i * 0.12, repeatDelay: 0.3 }}
            >
              {tool.icon}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={hovered ? { opacity: [0, 0.3, 0] } : { opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

function BuildMockup({ hovered }: { hovered: boolean }) {
  const [activeLine, setActiveLine] = useState(3);

  useEffect(() => {
    if (!hovered) { setActiveLine(3); return; }
    let line = 3;
    const interval = setInterval(() => {
      line = line >= 6 ? 3 : line + 1;
      setActiveLine(line);
    }, 400);
    return () => clearInterval(interval);
  }, [hovered]);

  const lines = [
    { n: 1, code: '<html lang="en">', color: 'text-white/50' },
    { n: 2, code: '  <head>', color: 'text-white/50' },
    { n: 3, code: '    <meta charset="UTF-8">', color: 'text-white/70' },
    { n: 4, code: '    <meta name="viewport"', color: 'text-white/50' },
    { n: 5, code: '      content="width=device-', color: 'text-white/50' },
    { n: 6, code: '      width, initial-', color: 'text-white/50' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full bg-black/40 border border-white/8 rounded-xl overflow-hidden font-mono text-xs">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/6">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <div className="flex gap-1 ml-2">
            {['HTML', 'React', 'CSS'].map((tab, i) => (
              <div key={tab} className={`px-2 py-0.5 rounded text-[10px] ${i === 0 ? 'bg-white/15 text-white/80' : 'text-white/35'}`}>{tab}</div>
            ))}
          </div>
        </div>
        <div className="p-3 space-y-0.5">
          {lines.map(line => (
            <motion.div
              key={line.n}
              className={`flex gap-2 px-1.5 py-0.5 rounded transition-colors ${activeLine === line.n ? 'bg-blue-500/15' : ''}`}
              animate={activeLine === line.n ? { backgroundColor: 'rgba(59,130,246,0.15)' } : { backgroundColor: 'rgba(0,0,0,0)' }}
            >
              <span className="text-white/20 w-3 shrink-0">{line.n}</span>
              <span className={line.color}>{line.code}</span>
              {activeLine === line.n && hovered && (
                <motion.span
                  className="text-blue-400 ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >|</motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const METRICS = [
  { label: 'Software speed', value: '+38%', color: 'text-green-400' },
  { label: 'Workflow efficiency', value: '+25%', color: 'text-blue-400' },
  { label: 'Operational cost', value: '-11%', color: 'text-green-400' },
];

function MaintainMockup({ hovered }: { hovered: boolean }) {
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (hovered) {
      const t = setTimeout(() => setShowUpdate(true), 700);
      return () => clearTimeout(t);
    } else {
      setShowUpdate(false);
    }
  }, [hovered]);

  return (
    <div className="w-full h-full flex flex-col justify-center p-5 gap-2">
      {METRICS.map((m, i) => (
        <motion.div
          key={m.label}
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/4 border border-white/6"
          animate={hovered ? { borderColor: 'rgba(96,165,250,0.2)', backgroundColor: 'rgba(255,255,255,0.06)' } : {}}
          transition={{ duration: 0.3, delay: i * 0.08 }}
        >
          <span className="text-xs text-white/55">{m.label}</span>
          <motion.span
            className={`text-xs font-semibold ${m.color}`}
            animate={hovered ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
          >
            {m.value}
          </motion.span>
        </motion.div>
      ))}
      <AnimatePresence>
        {showUpdate && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20"
          >
            <span className="text-xs text-white/70">Update available</span>
            <div className="px-2 py-0.5 bg-blue-500/30 border border-blue-500/40 rounded text-[10px] text-blue-300 font-medium flex items-center gap-1">
              Update ↑
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const stepMockups = [AnalyzeMockup, BuildMockup, MaintainMockup];

export default function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as { number: string; title: string; description: string }[];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const titleWords = t('title').split(' ');
  const lastWord = titleWords.pop();
  const firstWords = titleWords.join(' ');

  return (
    <section id="process" className="py-28 px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const Mockup = stepMockups[index];
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                className="rounded-2xl bg-white/4 border border-white/8 overflow-hidden flex flex-col transition-colors duration-300 cursor-default"
                style={{ borderColor: isHovered ? 'rgba(59,130,246,0.3)' : undefined }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.12 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="h-48 border-b border-white/6">
                  <Mockup hovered={isHovered} />
                </div>
                <div className="p-6">
                  <div className="text-xs text-white/30 font-mono mb-2">{step.number}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
