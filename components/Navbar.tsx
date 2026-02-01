'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { type Locale, locales } from '@/i18n/routing';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lang: Locale) => {
    router.replace(pathname, { locale: lang });
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle anchor navigation - works from homepage or project pages
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMobileMenu();
    
    const anchor = href.replace('#', '');
    const isHomepage = pathname === '/' || pathname === '';
    
    if (isHomepage) {
      // On homepage: smooth scroll to section
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // On project page: navigate to homepage with anchor
      router.push(`/#${anchor}`);
    }
  };

  // CRITICAL: Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smart Scroll Hook
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle hash scrolling on page load (for navigation from project pages)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const anchor = window.location.hash.replace('#', '');
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [pathname]);

  const navLinks = [
    { name: t('links.expertise'), href: '#expertise', isAnchor: true },
    { name: t('links.missions'), href: '#missions', isAnchor: true },
    { name: t('links.about'), href: '#about', isAnchor: true },
    { name: t('links.blog'), href: '/blog', isAnchor: false },
  ];

  const languages = locales;

  return (
    <>
      {/* MOBILE MENU OVERLAY - OUTSIDE NAV, SIBLING ELEMENT */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000000',
            zIndex: 9998,
          }}
        >
          {/* Content Container */}
          <div 
            className="flex flex-col h-full pt-24 px-8 pb-8"
            style={{ backgroundColor: '#000000' }}
          >
            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center gap-1">
              {navLinks.map((link, index) => (
                link.isAnchor ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="group flex items-center py-4 border-b border-white/5 animate-fadeInLeft cursor-pointer"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <span className="text-xs font-mono text-primary/60 mr-4">0{index + 1}</span>
                    <span className="text-2xl font-light text-white group-hover:text-primary transition-colors duration-300">
                      {link.name}
                    </span>
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="group flex items-center py-4 border-b border-white/5 animate-fadeInLeft cursor-pointer"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <span className="text-xs font-mono text-primary/60 mr-4">0{index + 1}</span>
                    <span className="text-2xl font-light text-white group-hover:text-primary transition-colors duration-300">
                      {link.name}
                    </span>
                  </Link>
                )
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto space-y-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-gray-500" />
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`
                        px-4 py-2 rounded text-sm font-mono uppercase tracking-wider transition-all duration-300
                        ${locale === lang 
                          ? 'bg-primary text-white' 
                          : 'text-gray-500 hover:text-white'
                        }
                      `}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="https://www.cal.eu/elysene/15min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center w-full bg-white/5 border border-white/10 text-white px-6 py-4 rounded-lg font-medium text-base hover:bg-primary hover:border-primary transition-all duration-300"
              >
                {t('cta')}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR - Always on top when menu is open */}
      <nav
        className={`
          fixed top-0 left-0 right-0
          transition-all duration-500 ease-in-out
          ${isVisible || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          ${isScrolled && !isMobileMenuOpen ? 'backdrop-blur-md bg-black/70' : 'bg-transparent'}
        `}
        style={{ zIndex: 9999 }}
      >
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between h-20 md:h-24 pr-8 md:pr-10">
          
          {/* Logo Area */}
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2 md:gap-3 group z-10 pl-4 md:pl-4">
            <div className="w-8 h-8 md:w-10 md:h-10 relative shrink-0 flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt={t('logoAlt')}
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="hidden sm:block text-gray-400 font-light text-base md:text-lg tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-primary">
              ES.ENGINEERING
            </span>
          </Link>

          {/* Navigation Centrale - Desktop */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="relative text-gray-300 font-medium text-lg tracking-wide hover:text-white transition-colors duration-300 group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute bottom-[-4px] left-1/2 w-0 h-px bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-gray-300 font-medium text-lg tracking-wide hover:text-white transition-colors duration-300 group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute bottom-[-4px] left-1/2 w-0 h-px bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
                </Link>
              )
            ))}
          </div>

          {/* Utils (Droite) */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Sélecteur de Langue - Desktop */}
            <div className="hidden md:block relative group/lang">
              <div className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <Globe size={24} />
                <span className="font-medium text-base">{locale.toUpperCase()}</span>
                <ChevronDown size={20} className="transition-transform duration-300 group-hover/lang:rotate-180" />
              </div>

              {/* Menu Déroulant au Hover */}
              <div className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-md border border-gray-800 rounded-lg overflow-hidden shadow-xl opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="w-full px-6 py-3 text-base font-medium text-left text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton Premium - Desktop */}
            <a
              href="https://www.cal.eu/elysene/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex relative bg-black/40 backdrop-blur-sm px-7 py-3 items-center justify-center group/btn cursor-pointer border border-white/20 rounded-lg outline-none transition-colors overflow-hidden"
            >
              <span className="pointer-events-none absolute inset-0">
                <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-[width] duration-300 group-hover/btn:w-full"></span>
                <span className="absolute right-0 top-0 w-px h-0 bg-primary transition-[height] duration-300 delay-150 group-hover/btn:h-full"></span>
                <span className="absolute right-0 bottom-0 h-px w-0 bg-primary transition-[width] duration-300 delay-300 group-hover/btn:w-full"></span>
                <span className="absolute left-0 bottom-0 w-px h-0 bg-primary transition-[height] duration-300 delay-450 group-hover/btn:h-full"></span>
              </span>
              <div className="relative overflow-hidden flex items-center justify-center text-white text-base font-medium tracking-wide w-full">
                <div className="relative overflow-hidden h-[1.2em]">
                  <div className="flex flex-col transition-transform duration-400 group-hover/btn:-translate-y-1/2">
                    <span className="leading-[1.2em]">{t('cta')}</span>
                    <span className="leading-[1.2em] text-primary">{t('cta')}</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Hamburger Menu Button - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative flex items-center justify-center w-10 h-10 text-white"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col justify-center items-center w-6 h-6">
                <span 
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span 
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out mt-1.5 ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : ''
                  }`}
                />
                <span 
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out mt-1.5 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <style jsx global>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}
