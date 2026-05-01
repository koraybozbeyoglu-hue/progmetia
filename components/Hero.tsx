'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

function BlobCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Blob color: exact match from Halo pixel sampling rgb(80, 176, 250)
    const BLOB_COLOR = '80, 176, 250';
    const BG = '#0a0a0a';

    const blobs = [
      { x: 0.15, y: 0.25, r: 0.80, speedX: 0.48, speedY: 0.32, phase: 0 },
      { x: 0.85, y: 0.30, r: 0.75, speedX: 0.36, speedY: 0.52, phase: 2.1 },
      { x: 0.50, y: 0.85, r: 0.70, speedX: 0.56, speedY: 0.40, phase: 4.3 },
    ];

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = (now: number) => {
      const t = now * 0.001;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      blobs.forEach(blob => {
        const cx = (blob.x + Math.sin(t * blob.speedX + blob.phase) * 0.18) * w;
        const cy = (blob.y + Math.cos(t * blob.speedY + blob.phase) * 0.14) * h;
        const radius = blob.r * Math.min(w, h);

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${BLOB_COLOR}, 0.75)`);
        grad.addColorStop(0.3, `rgba(${BLOB_COLOR}, 0.55)`);
        grad.addColorStop(0.6, `rgba(${BLOB_COLOR}, 0.25)`);
        grad.addColorStop(1, `rgba(${BLOB_COLOR}, 0)`);

        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * 1.2, radius * 0.9, t * 0.03, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';
      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'blur(75px)', opacity: 0.95 }}
    />
  );
}

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20 bg-[#0a0a0a]">
      <BlobCanvas />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {t('headline')}
        </motion.h1>

        <motion.p
          className="text-white/80 text-lg md:text-xl mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          <a
            href="#services"
            className="px-7 py-3 rounded-lg text-sm font-medium text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/8 transition-all duration-200"
          >
            {t('services')}
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-lg text-sm font-medium bg-white/12 text-white border border-white/25 hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
          >
            {t('cta')} →
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
