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
            <a href="#" className="text-lg font-bold text-white">
              Prog<span className="text-blue-400">metia</span>
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
