'use client';

import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/elordave", label: t('social.github') },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/ely-sene/", label: t('social.linkedin') },
    { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/", label: t('social.twitter') },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:contact@elysene.engineering", label: t('social.email') },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full bg-black text-white overflow-hidden">
      
      {/* BLOC PRINCIPAL */}
      <div className="border-t border-white/10">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
            
            {/* GAUCHE : BRANDING */}
            <div className="relative flex flex-col justify-center overflow-hidden lg:min-h-[320px] border-l border-white/10">
              

              {/* Contenu Branding (Style Navbar mais scale up) */}
              <div className="relative z-10 px-6 md:px-12 lg:pl-32 py-12 md:py-20 lg:py-0">
                <div className="flex items-center gap-4 md:gap-6 group justify-center lg:justify-start">
                   <div className="w-12 h-12 md:w-20 md:h-20 relative shrink-0 flex items-center justify-center">
                     <Image
                       src="/logo.svg"
                       alt={t('logoAlt')}
                       width={80}
                       height={80}
                       className="transition-transform duration-300 group-hover:scale-110"
                     />
                   </div>
                   <span className="text-gray-400 font-light text-xl md:text-4xl lg:text-5xl tracking-[0.15em] md:tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-primary">
                     ES.ENGINEERING
                   </span>
                </div>
              </div>
            </div>

            {/* DROITE : GRILLE UNIFIÉE */}
            <div className="grid grid-cols-3 w-full lg:w-auto bg-black border-l border-white/10">
              {/* Row 1: Github, Linkedin, Twitter */}
              {socialLinks.slice(0, 3).map((link, i) => (
                <a 
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative flex items-center justify-center w-full lg:w-40 h-20 md:h-40 border-r border-b border-white/10 overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[180%] pb-[180%] rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"></div>
                  </div>
                  <div className="relative z-10 text-gray-400 group-hover:text-black transition-colors duration-300">
                    {link.icon}
                  </div>
                </a>
              ))}

              {/* Row 2: Mail, Empty (Gray), Arrow */}
              {/* Mail */}
              <a 
                href={socialLinks[3].href}
                aria-label={socialLinks[3].label}
                className="group relative flex items-center justify-center w-full lg:w-40 h-20 md:h-40 border-r border-b border-white/10 overflow-hidden"
              >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[180%] pb-[180%] rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"></div>
                  </div>
                  <div className="relative z-10 text-gray-400 group-hover:text-black transition-colors duration-300">
                    {socialLinks[3].icon}
                  </div>
              </a>

              {/* Empty Slot (Grayed out) */}
              <div className="w-full lg:w-40 h-20 md:h-40 border-r border-b border-white/10 bg-white/5"></div>

              {/* Back to Top Button (Shifted to right) */}
              <button 
                onClick={scrollToTop}
                aria-label={t('backToTop')}
                className="group relative flex items-center justify-center w-full lg:w-40 h-20 md:h-40 border-r border-b border-white/10 hover:bg-white/5 transition-colors duration-300 overflow-hidden"
              >
                 <div className="h-6 overflow-hidden">
                   <div className="flex flex-col items-center transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
                      <div className="flex items-center justify-center h-6">
                          <ArrowUp className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex items-center justify-center h-6">
                          <ArrowUp className="w-5 h-5 text-primary" />
                      </div>
                   </div>
                 </div>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* BARRE COPYRIGHT */}
      <div className="border-t border-white/10 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono text-gray-600 uppercase tracking-widest">
            {t('copyright', { year: currentYear })}
          </p>
          <div className="flex gap-6">
            <Link href="/legal" className="text-xs font-mono text-gray-600 hover:text-white transition-colors uppercase">{t('mentions')}</Link>
            <Link href="/privacy" className="text-xs font-mono text-gray-600 hover:text-white transition-colors uppercase">{t('privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
