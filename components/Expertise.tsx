'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

export default function Expertise() {
  const t = useTranslations('Expertise');
  const [titleVisible, setTitleVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  }, []);

  // Observer pour le titre
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Observer pour chaque carte individuellement
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => new Set(prev).add(index));
              }, 100);
              observer.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(cardRef);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const expertises = [
    {
      id: 1,
      title: t('card1.title'),
      accroche: t('card1.accroche'),
      description: t('card1.description')
    },
    {
      id: 2,
      title: t('card2.title'),
      accroche: t('card2.accroche'),
      description: t('card2.description')
    },
    {
      id: 3,
      title: t('card3.title'),
      accroche: t('card3.accroche'),
      description: t('card3.description')
    }
  ];

  return (
    <section 
      id="expertise"
      className="relative z-10 mt-32 md:mt-40 w-full max-w-[1400px] mx-auto px-6 md:px-10 mb-32"
    >
      
      {/* Header Section - Slide Up */}
      <div ref={titleRef} className={`mb-16 ${titleVisible ? 'animate-slideUp' : 'opacity-0'}`}>
        <p className="font-mono text-base text-gray-100 pointer-events-auto">{t('title')}</p>
      </div>

      {/* Grid de Cartes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {expertises.map((exp, index) => (
          <div
            key={exp.id}
            ref={(el) => setCardRef(el, index)}
            className={`expertise-card-container group flex flex-col relative overflow-hidden ${visibleCards.has(index) ? 'animate-pop-in' : 'opacity-0'}`}
            style={{
              animationDelay: visibleCards.has(index) ? `${(index % 3) * 200}ms` : '0ms',
              animationFillMode: 'forwards'
            }}
          >
            {/* Lumière Orange au sommet */}
            <div className="card-top-glow"></div>
            
            {/* Gradient Background Subtil */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <div className="p-8 flex flex-col h-full relative z-10">
                
                {/* --- BLOC 1 : HEADER (hauteur fixe) --- */}
                <div className="h-[90px] mb-6 flex flex-col justify-between">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-primary/90 border border-primary/30 px-2 py-0.5 rounded bg-primary/5">
                      0{exp.id}
                    </span>
                    <span className="h-px flex-1 bg-white/10 group-hover:bg-primary/40 transition-colors duration-500"></span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-medium text-[#6B7280] font-mono tracking-tight group-hover:text-primary transition-colors duration-300 leading-tight">
                    {exp.title}
                  </h3>
                </div>

                {/* --- BLOC 2 : ACCROCHE (hauteur ajustée) --- */}
                <div className="h-[100px] mb-8 flex items-start">
                  <p className="text-gray-100 text-base md:text-lg font-medium leading-snug border-l-2 border-primary/50 pl-4 py-1">
                    {exp.accroche}
                  </p>
                </div>

                {/* --- BLOC 3 : DESCRIPTION (Corps principal) --- */}
                <div className="flex-1">
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed font-sans">
                    {exp.description}
                  </p>
                </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
