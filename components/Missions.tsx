'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Missions() {
  const t = useTranslations('Missions');
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

  const missions = [
    {
      id: 1,
      slug: 'monitoring-big-data',
      category: t('card1.category'),
      title: t('card1.title'),
      size: 'large',
      delay: 0,
      imgSrc: '/stream.webp'
    },
    {
      id: 2,
      slug: 'cloud-data-migration',
      category: t('card2.category'),
      title: t('card2.title'),
      size: 'small',
      delay: 400,
      imgSrc: '/bigdata.webp'
    },
    {
      id: 3,
      slug: 'saas-esg-genai',
      category: t('card3.category'),
      title: t('card3.title'),
      size: 'small',
      delay: 800,
      imgSrc: '/saas.webp'
    },
    {
      id: 4,
      slug: 'bi-governance-security',
      category: t('card4.category'),
      title: t('card4.title'),
      size: 'large',
      delay: 1200,
      imgSrc: '/secu.webp'
    }
  ];

  return (
    <section 
      id="missions"
      className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 mb-32"
    >
      {/* Title Section */}
      <div ref={titleRef} className={`mb-12 ${titleVisible ? 'animate-slideUp' : 'opacity-0'}`}>
        <p className="font-mono text-base text-gray-100">{t('title')}</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-8 md:gap-y-12 auto-rows-[300px] md:auto-rows-[400px]">
        {missions.map((mission, index) => (
          <div
            key={mission.id}
            ref={(el) => setCardRef(el, index)}
            className={`
              flex flex-col group
              ${mission.size === 'large' ? 'md:col-span-3' : 'md:col-span-2'}
              ${visibleCards.has(index) ? 'animate-pop-in' : 'opacity-0'}
            `}
            style={{
              animationDelay: visibleCards.has(index) ? `${(index % 2) * 300}ms` : '0ms',
              animationFillMode: 'forwards'
            }}
          >
            {/* Header: Title & Badge (Outside the card) */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-4 px-1">
              <h3 className="text-base md:text-xl font-medium text-[#6B7280] font-mono tracking-tight leading-tight sm:max-w-[70%]">
                {mission.title}
              </h3>
              <span className="self-start sm:self-auto px-3 py-1 md:px-4 md:py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] md:text-xs uppercase tracking-widest font-mono text-gray-200 shadow-[0_0_10px_rgba(255,255,255,0.05)] whitespace-nowrap">
                {mission.category}
              </span>
            </div>

            {/* Card Container (Dark Box) */}
            <div className="relative flex-1 group/card rounded-2xl overflow-hidden">
                
                {/* Image Container */}
                <div className="relative w-full h-full bg-[#0B0E14] border border-white/10 overflow-hidden">
                    {/* Background Image Placeholder */}
                    <div className="absolute inset-0 bg-[#151515] transition-transform duration-700 group-hover/card:scale-105">
                        <img 
                          src={mission.imgSrc} 
                          alt={mission.title}
                          className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-500 transform group-hover/card:scale-105"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 pointer-events-none"></div>
                    </div>
                </div>

                {/* Button Container (Outside/Corner) */}
                <div className="absolute bottom-0 right-0 z-20">
                  {/* Link to project page */}
                  <Link 
                    href={`/projects/${mission.slug}`}
                    className="bg-background px-8 py-6 rounded-tl-2xl flex items-center justify-center group/btn cursor-pointer border-none outline-none transition-colors"
                  >
                    {/* Inner Content Wrapper */}
                    <div className="relative overflow-hidden flex items-center gap-3 text-white font-mono text-sm tracking-wide pb-3">
                      
                      {/* Slot Machine Text Container */}
                      <div className="relative overflow-hidden h-[1.2em]">
                        <div className="flex flex-col transition-transform duration-400 group-hover/btn:-translate-y-1/2">
                          <span className="leading-[1.2em]">{t('cta')}</span>
                          <span className="leading-[1.2em] text-primary">{t('cta')}</span>
                        </div>
                      </div>

                      {/* Slot Machine Arrow Container */}
                      <div className="relative overflow-hidden w-[12px] h-[12px]">
                          <div className="flex flex-col transition-transform duration-300 group-hover/btn:-translate-y-1/2">
                          <svg 
                              width="12" 
                              height="12" 
                              viewBox="0 0 12 12" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className="block"
                          >
                              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <svg 
                              width="12" 
                              height="12" 
                              viewBox="0 0 12 12" 
                              fill="none" 
                              xmlns="http://www.w3.org/2000/svg"
                              className="block text-primary"
                          >
                              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          </div>
                      </div>

                      {/* Animated Underline */}
                      <span className="absolute bottom-0 left-0 w-full h-px bg-white/20"></span>
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 ease-out group-hover/btn:w-full"></span>
                    </div>
                  </Link>
                </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
