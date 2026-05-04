'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

const inputClass =
  'w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/40 focus:bg-white/6 transition-all duration-200';

export default function Contact() {
  const t = useTranslations('contact');

  const titleWords = t('title').split(' ');
  const titleMain = titleWords.slice(0, -1).join(' ');
  const titleHighlight = titleWords[titleWords.length - 1];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    const body = `İsim: ${name}\nE-posta: ${email}\nTelefon: ${phone}\n\nMesaj:\n${message}`;
    window.location.href = `mailto:${t('emailValue')}?subject=İletişim: ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — headline + contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-12 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              {t('title')}
            </h2>

            {/* Email */}
            <div className="pb-7 mb-7 border-b border-white/8">
              <p className="text-white/40 text-sm mb-2">{t('email')}:</p>
              <a
                href={`mailto:${t('emailValue')}`}
                className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-200"
              >
                {t('emailValue')}
              </a>
            </div>

            {/* Phone */}
            <div>
              <p className="text-white/40 text-sm mb-2">{t('phone')}:</p>
              <a
                href={`tel:${t('phoneValue')}`}
                className="text-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-200"
              >
                {t('phoneValue')}
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <div>
              <label className="block text-sm text-white/60 mb-1.5">{t('nameLabel')}</label>
              <input name="name" type="text" placeholder={t('namePlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">{t('emailLabel')}</label>
              <input name="email" type="email" placeholder={t('emailPlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">{t('phoneLabel')}</label>
              <input name="phone" type="tel" placeholder={t('phonePlaceholder')} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">{t('messageLabel')}</label>
              <textarea
                name="message"
                rows={5}
                placeholder={t('messagePlaceholder')}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-white text-[#090910] font-semibold px-8 py-3 rounded-xl hover:bg-white/90 active:scale-95 transition-all duration-200 text-sm"
              >
                {t('submit')}
              </button>
            </div>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
