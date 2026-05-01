'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === 'tr' ? 'en' : 'tr';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  };

  const navLinks = [
    { href: '#services', label: t('services') },
    { href: '#process', label: t('process') },
    { href: '#pricing', label: t('pricing') },
    { href: '#faq', label: t('faq') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-lg font-bold tracking-tight text-white">
          Prog<span className="text-blue-400">metia</span>
        </a>

        {/* Center nav links in pill */}
        <div
          className={`hidden md:flex items-center gap-1 px-4 py-2 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-black/60 backdrop-blur-md border-white/10'
              : 'bg-black/40 backdrop-blur-sm border-white/8'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors duration-200 px-3 py-1 rounded-full hover:bg-white/8"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="text-sm text-white/60 hover:text-white transition-colors px-2 py-1 rounded border border-white/15 hover:border-white/30"
          >
            {locale === 'tr' ? 'EN' : 'TR'}
          </button>
          <a
            href="#contact"
            className="hidden md:inline-flex text-sm bg-white text-[#090910] hover:bg-white/90 font-medium px-5 py-2 rounded-lg transition-colors duration-200"
          >
            {t('getStarted')}
          </a>
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/8 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="text-sm text-white/70 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            className="text-sm bg-white text-[#090910] font-medium px-5 py-2 rounded-lg text-center">
            {t('getStarted')}
          </a>
        </div>
      )}
    </nav>
  );
}
