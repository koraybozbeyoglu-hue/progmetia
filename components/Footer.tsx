'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  };

  const navLinks = [
    { href: '#services', label: tNav('services') },
    { href: '#process', label: tNav('process') },
    { href: '#pricing', label: tNav('pricing') },
    { href: '#faq', label: tNav('faq') },
    { href: '#contact', label: tNav('contact') },
  ];

  return (
    <footer className="border-t border-white/8 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <a href="#" className="flex items-center gap-2.5">
              <svg width="20" height="24" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerArc" x1="4" y1="3" x2="18" y2="13" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                  <filter id="footerGlow">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <line x1="4" y1="3" x2="4" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 3 C4 3 18 3 18 10.5 C18 18 4 18 4 18" stroke="url(#footerArc)" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="4" cy="3" r="2.5" fill="#60a5fa" filter="url(#footerGlow)" />
                <circle cx="4" cy="18" r="2.5" fill="#60a5fa" filter="url(#footerGlow)" />
                <circle cx="18" cy="10.5" r="1.8" fill="#818cf8" opacity="0.85" />
              </svg>
              <span className="text-lg font-bold text-white">
                Prog<span className="text-blue-400">metia</span>
              </span>
            </a>
            <p className="text-white/40 text-xs mt-1 max-w-xs">{t('description')}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={switchLocale}
            className="text-sm text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25"
          >
            {locale === 'tr' ? '🇬🇧 English' : '🇹🇷 Türkçe'}
          </button>
        </div>

        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Progmetia. {t('rights')}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">{t('privacy')}</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">{t('terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
