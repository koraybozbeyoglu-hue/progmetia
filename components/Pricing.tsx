'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const ANNUAL_DISCOUNT = 0.8;

function getAnnualPrice(monthlyStr: string): string {
  const num = parseInt(monthlyStr.replace(/[^0-9]/g, ''), 10);
  if (isNaN(num)) return monthlyStr;
  const annual = Math.round(num * ANNUAL_DISCOUNT);
  return monthlyStr.startsWith('€') ? `€${annual.toLocaleString('de-DE')}` : `$${annual.toLocaleString()}`;
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const plans = t.raw('plans') as { name: string; price: string; description: string; features: string[] }[];
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">{t('title').split(' ')[0]} </span>
            <span className="text-blue-400">{t('title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-white/50 mb-8">{t('subtitle')}</p>

          {/* Monthly / Annually toggle */}
          <div className="inline-flex items-center bg-white/6 border border-white/10 rounded-full p-1 gap-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                !annual ? 'bg-white/15 text-white' : 'text-white/45 hover:text-white/70'
              }`}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                annual ? 'bg-white/15 text-white' : 'text-white/45 hover:text-white/70'
              }`}
            >
              {t('annually')}
              <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/25 px-1.5 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, index) => {
            const isPopular = index === 1;
            const displayPrice = annual ? getAnnualPrice(plan.price) : plan.price;

            return (
              <motion.div
                key={index}
                className={`relative flex flex-col p-7 rounded-2xl border transition-all duration-200 ${
                  isPopular
                    ? 'bg-white/8 border-blue-500/30 shadow-xl shadow-blue-500/10'
                    : 'bg-white/4 border-white/8 hover:border-white/15 hover:bg-white/6'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-t-2xl" />
                )}

                <div className="mb-2">
                  <h3 className={`font-medium text-sm mb-4 ${isPopular ? 'text-blue-400' : 'text-white/60'}`}>
                    {plan.name}
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={annual ? 'annual' : 'monthly'}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-end gap-1.5 mb-1"
                    >
                      <span className="text-4xl font-bold text-white">{displayPrice}</span>
                      <span className="text-white/35 text-sm mb-1.5">/{t('monthly').toLowerCase()}</span>
                    </motion.div>
                  </AnimatePresence>
                  {annual && (
                    <p className="text-xs text-green-400/80">{t('billedAnnually')}</p>
                  )}
                </div>

                <a
                  href="#contact"
                  className={`text-center py-3 rounded-xl font-medium text-sm transition-all duration-200 mt-4 mb-6 ${
                    isPopular
                      ? 'bg-white/12 text-white border border-white/20 hover:bg-white/18'
                      : 'bg-white/6 text-white/80 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {t('choose')} <span className={isPopular ? 'text-blue-400' : 'text-white/40'}>{t('choosePlan')}</span>
                </a>

                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-white/60">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-blue-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-center text-white/30 text-sm mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          {t('cancel')}
        </motion.p>
      </div>
    </section>
  );
}
