'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Stats() {
  const t = useTranslations('stats');
  const items = t.raw('items') as { value: string; label: string }[];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">{item.value}</div>
              <div className="text-white/50 text-sm">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
