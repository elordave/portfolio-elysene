'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Cloud, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  Repeat, 
  ExternalLink, 
  Award
} from 'lucide-react';


// --- COMPOSANT INTERNE DE GESTION D'ANIMATION ---
interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'bottom';
  className?: string;
  delay?: number;
}

const ScrollReveal = ({ children, direction = 'bottom', className = '', delay = 0 }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 100); 
          observer.disconnect();
        }
      },
      { threshold: 0.15 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const transforms = {
    left: '-translate-x-[100px]',
    right: 'translate-x-[100px]',
    bottom: 'translate-y-[50px]',
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1500ms] ease-[cubic-bezier(0.2,1,0.3,1)] ${className} ${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0' 
          : `opacity-0 ${transforms[direction]}`
      }`}
    >
      {children}
    </div>
  );
};


export default function About() {
  const t = useTranslations('About');
  
  // --- DONNÉES ---
  const features = [
    {
      icon: <Cloud className="w-4 h-4" />,
      text: t.rich('features.1', { strong: (chunks) => <strong>{chunks}</strong> })
    },
    {
      icon: <Zap className="w-4 h-4" />,
      text: t.rich('features.2', { strong: (chunks) => <strong>{chunks}</strong> })
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      text: t.rich('features.3', { strong: (chunks) => <strong>{chunks}</strong> })
    },
    {
      icon: <Terminal className="w-4 h-4" />,
      text: t.rich('features.4', { strong: (chunks) => <strong>{chunks}</strong> })
    },
    {
      icon: <Repeat className="w-4 h-4" />,
      text: t.rich('features.5', { strong: (chunks) => <strong>{chunks}</strong> })
    }
  ];

  const certifications = t.raw('certifications') as {
    category: string;
    items: { name: string; link: string }[];
  }[];

  return (
    <section 
      id="about"
      className="relative z-10 w-full max-w-[1200px] mx-auto px-6 mb-24 overflow-hidden overflow-x-hidden"
    >
      {/* Header Section */}
      <ScrollReveal direction="bottom">
        <div className="mb-6">
          <p className="font-mono text-base text-gray-100">{t('title')}</p>
        </div>
      </ScrollReveal>

      <div className="flex flex-col gap-6">
        
        {/* LIGNE 1 & 2 : PHOTO/STATS (Gauche) + BIO/STACK (Droite) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* COL GAUCHE : PHOTO + STATS */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* PHOTO -> DIRECTION GAUCHE VERS DROITE */}
            <ScrollReveal direction="left">
              <div className="relative rounded-xl overflow-hidden group">
                 <div className="aspect-[5/4] w-full relative">
                   <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                   
                   <img 
                     src="/profil.webp" 
                     alt={t('profileAlt')}
                     className="absolute inset-0 w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 z-0"
                   />
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"></div>
                 </div>
              </div>
            </ScrollReveal>

            {/* STATS -> DIRECTION GAUCHE VERS DROITE */}
            <ScrollReveal direction="left" delay={200}>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                  {/* Carte 1 : Certifications */}
                  <div className="expertise-card-container group p-4 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[100px]">
                      <div className="card-top-glow"></div>
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                      
                      <div className="relative z-10 flex flex-col items-center">
                        <span className="text-2xl font-bold text-white group-hover:text-primary transition-colors mb-1">10+</span>
                        <span className="text-sm font-mono text-gray-400 uppercase tracking-wider">{t('certifications_count')}</span>
                      </div>
                  </div>

                  {/* Carte 2 : Stack */}
                  <div className="expertise-card-container group p-4 flex flex-col justify-center items-center text-center relative overflow-hidden min-h-[100px]">
                      <div className="card-top-glow"></div>
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                      <div className="relative z-10 flex flex-col items-center">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">{t('stack')}</span>
                        <span className="text-lg font-bold text-white group-hover:text-primary transition-colors">{t('stack_desc')}</span>
                      </div>
                  </div>

                  {/* Carte 3 : Grands Comptes */}
                  <div className="expertise-card-container group p-4 flex flex-col justify-center items-center text-center relative overflow-hidden col-span-2 min-h-[90px]">
                      <div className="card-top-glow"></div>
                      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                      
                      <div className="relative z-10 flex flex-col items-center w-full">
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">{t('grands_comptes')}</span>
                        <div className="flex items-center gap-6 justify-center">
                            <div className="flex items-center gap-3">
                                <img src="/edf-2.svg" alt={t('edfAlt')} className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                                <span className="text-base font-bold text-white">{t('edfLabel')}</span>
                            </div>
                            <div className="h-5 w-px bg-white/10"></div>
                            <div className="flex items-center gap-3">
                                <img src="/geodis-3.svg" alt={t('geodisAlt')} className="h-7 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                                <span className="text-base font-bold text-white">{t('geodisLabel')}</span>
                            </div>
                        </div>
                      </div>
                  </div>
              </div>
            </ScrollReveal>

          </div>

          {/* COL DROITE : BIO + STACK */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* BLOC BIO -> DIRECTION DROITE VERS GAUCHE */}
            <ScrollReveal direction="right">
              <div className="expertise-card-container group p-8 relative overflow-hidden">
                <div className="card-top-glow"></div>
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="relative z-10">
                  <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
                    {t.rich('bio', {
                      emphasis: (chunks) => <span className="font-semibold text-white">{chunks}</span>,
                      apos: "'"
                    })}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* BLOC STACK -> DIRECTION DROITE VERS GAUCHE */}
            <ScrollReveal direction="right" delay={200}>
              <div className="expertise-card-container group p-8 relative overflow-hidden">
                 <div className="card-top-glow"></div>
                 <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                 <div className="relative z-10">
                   <h3 className="font-mono text-sm font-bold text-primary mb-6 flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-4">
                     {t('stack_title')}
                   </h3>
                   <ul className="space-y-4">
                     {features.map((feat, i) => (
                       <li key={i} className="flex items-center gap-4 text-sm text-gray-300 group/item">
                         <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded bg-white/5 border border-white/10 text-gray-400 group-hover/item:bg-primary group-hover/item:text-white group-hover/item:border-primary transition-all duration-300">
                            {feat.icon}
                         </div>
                        <span className="leading-relaxed pt-0">{feat.text}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* LIGNE 3 : CERTIFICATIONS LISTE COMPLÈTE */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((domain, i) => (
              /* DISSOCIATION DES EFFETS : 
                 i = 0 (Dataiku) -> direction="left" (Gauche vers Droite)
                 i = 1 (Cloud)   -> direction="right" (Droite vers Gauche) 
              */
              <ScrollReveal 
                key={i} 
                direction={i === 0 ? 'left' : 'right'} 
                delay={300}
                className="h-full"
              >
                <div className="expertise-card-container group p-6 relative overflow-hidden flex flex-col items-start h-full">
                  <div className="card-top-glow"></div>
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  <div className="relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3 w-full">
                      <Award className="w-5 h-5 text-primary" />
                      <h4 className="font-mono text-sm font-bold text-gray-200 uppercase tracking-wide">
                        {domain.category}
                      </h4>
                    </div>
                    <ul className="flex flex-col gap-2 w-full text-left">
                      {domain.items.map((cert, j) => (
                        <li key={j} className="w-full">
                          <a 
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link flex items-start gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/40 group-hover/link:bg-primary transition-colors shrink-0"></span>
                            <span className="leading-snug">{cert.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 mt-0.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
        </div>

        {/* LIGNE 4 : FOOTER IMPACT -> DIRECTION BAS VERS HAUT */}
        <ScrollReveal direction="bottom" delay={400}>
          <div className="relative rounded-xl overflow-hidden p-5 md:p-6 flex items-center justify-center border border-white/10 bg-white/5">
            <div className="relative z-10 w-full text-center md:text-left flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-sm md:text-base text-gray-300 font-light leading-relaxed text-center text-white">
                  {t.rich('footer_text', {
                    br: () => <br className="hidden md:block" />,
                    accent: (chunks) => <span className="font-bold text-white mx-1">{chunks}</span>,
                    apos: "'"
                  })}
                </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}