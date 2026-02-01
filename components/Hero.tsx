'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Script from 'next/script';

// --- COMPOSANT SLOT MACHINE UNITAIRE ---
function SlotDigit({ 
  value, 
  direction = 'up', 
  delay = 0 
}: { 
  value: number; 
  direction?: 'up' | 'down'; 
  delay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);

  // Génération de la bande de chiffres
  const { strip, finalIndex } = useMemo(() => {
    // Cycles réduits à 2 pour un mouvement moins chaotique
    const cycles = 2; 
    const baseDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let generatedStrip: number[] = [];
    
    if (direction === 'up') {
      for (let i = 0; i < cycles; i++) {
        generatedStrip = [...generatedStrip, ...baseDigits];
      }
      generatedStrip = [...generatedStrip, ...baseDigits.slice(0, value + 1)];
    } 
    else {
      const reversedDigits = [...baseDigits].reverse();
      for (let i = 0; i < cycles; i++) {
        generatedStrip = [...generatedStrip, ...reversedDigits];
      }
      const targetInReverse = reversedDigits.indexOf(value);
      generatedStrip = [...generatedStrip, ...reversedDigits.slice(0, targetInReverse + 1)];
    }

    return { strip: generatedStrip, finalIndex: generatedStrip.length - 1 };
  }, [value, direction]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarted(true);
    }, 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="slot-viewport">
      <div 
        ref={containerRef}
        className="slot-strip"
        style={{
          transform: isStarted ? `translateY(-${finalIndex * 100}%)` : 'translateY(0%)',
          // Vitesse très lente pour l'effet "cinématique"
          transitionDuration: '4500ms'
        }}
      >
        {strip.map((digit, i) => (
          <div key={i} className="slot-digit leading-none">{digit}</div>
        ))}
      </div>
    </div>
  );
}

// --- COMPTEUR 1M+ ---
function CounterMillions() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-7xl md:text-8xl font-medium text-white tracking-tighter inline-flex items-end overflow-hidden h-[1.1em]">
      {isVisible ? (
        <>
          <SlotDigit value={1} direction="up" />
          <span className="leading-none">M+</span>
        </>
      ) : <span className="opacity-0">1M+</span>}
    </div>
  );
}

// --- COMPTEUR 100% ---
function CounterPercent() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-7xl md:text-8xl font-medium text-white tracking-tighter inline-flex items-end overflow-hidden h-[1.1em]">
      {isVisible ? (
        <>
          <SlotDigit value={1} direction="up" delay={0} />
          <SlotDigit value={0} direction="down" delay={150} />
          <SlotDigit value={0} direction="up" delay={300} />
          <span className="leading-none">%</span>
        </>
      ) : <span className="opacity-0">100%</span>}
    </div>
  );
}

// --- PAGE HERO ---
export default function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  // Gestion erreur Spline
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      const errorString = args[0]?.toString() || '';
      if (errorString.includes('started') || errorString.includes('undefined') || errorString.toLowerCase().includes('spline')) return;
      originalError.apply(console, args);
    };
    return () => { console.error = originalError; };
  }, []);

  // Observer la visibilité de la Hero section
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsHeroVisible(entry.isIntersecting);
      },
      { 
        threshold: 0,
        rootMargin: '100px 0px 100px 0px'
      }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause/Resume Spline
  useEffect(() => {
    if (!isSplineLoaded) return;

    const timeout = setTimeout(() => {
      const splineViewer = document.querySelector('spline-viewer') as HTMLElement;
      const canvas = document.querySelector('spline-viewer canvas') as HTMLCanvasElement;
      if (!splineViewer) return;

      if (isHeroVisible) {
        splineViewer.style.visibility = 'visible';
        splineViewer.style.pointerEvents = 'auto';
        if (canvas) canvas.style.willChange = 'transform';
      } else {
        splineViewer.style.visibility = 'hidden';
        splineViewer.style.pointerEvents = 'none';
        if (canvas) canvas.style.willChange = 'auto';
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [isSplineLoaded, isHeroVisible]);

  // --- LOGIQUE POUR MASQUER LE LOGO + PLAN B: FORCER OUVERTURE NOUVEL ONGLET ---
  useEffect(() => {
    // Fonction pour injecter le style de masquage (sans vérification d'existence)
    const injectHideStyle = (shadowRoot: ShadowRoot) => {
      // Supprimer l'ancien style s'il existe pour forcer la réinjection
      const existing = shadowRoot.querySelector('#force-hide-logo');
      if (existing) existing.remove();
      
      const style = document.createElement('style');
      style.id = 'force-hide-logo';
      style.textContent = `
        #logo, #branding, a, a[href*="spline"], 
        [id*="logo"], [class*="logo"], [class*="branding"],
        div[style*="position: absolute"][style*="bottom"],
        div[style*="position: absolute"][style*="right"] a {
          display: none !important;
          pointer-events: none !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
        }
      `;
      shadowRoot.appendChild(style);
    };

    // Fonction principale de nettoyage
    const nukeLogo = () => {
      const splineViewer = document.querySelector('spline-viewer');
      if (splineViewer && splineViewer.shadowRoot) {
        injectHideStyle(splineViewer.shadowRoot);
      }
    };

    // PLAN B: Intercepter les clics pour forcer l'ouverture dans un nouvel onglet
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const splineViewer = document.querySelector('spline-viewer');
      
      if (splineViewer && splineViewer.contains(target)) {
        // Vérifier si c'est un clic sur un lien dans le shadowRoot
        if (splineViewer.shadowRoot) {
          const path = e.composedPath();
          for (const el of path) {
            if (el instanceof HTMLAnchorElement && el.href) {
              e.preventDefault();
              e.stopPropagation();
              window.open(el.href, '_blank', 'noopener,noreferrer');
              return;
            }
          }
        }
      }
    };

    // Écouter les clics au niveau du document (capture phase)
    document.addEventListener('click', handleClick, true);

    // Lancer immédiatement
    nukeLogo();
    
    // Intervalle PERMANENT (toutes les 500ms) - ne s'arrête jamais
    const intervalId = setInterval(nukeLogo, 500);

    // Empêcher le scroll sur le canvas
    const setupCanvasScroll = () => {
      const canvas = document.querySelector('spline-viewer canvas') as HTMLCanvasElement;
      const handleWheel = (e: WheelEvent) => { e.stopPropagation(); window.scrollBy(0, e.deltaY); };
      if (canvas) {
        canvas.addEventListener('wheel', handleWheel, { passive: true });
        return () => canvas.removeEventListener('wheel', handleWheel);
      }
      return () => {};
    };
    const cleanupScroll = setupCanvasScroll();

    return () => { 
      clearInterval(intervalId);
      document.removeEventListener('click', handleClick, true);
      cleanupScroll();
    };
  }, [locale]); // Re-run when locale changes

  return (
    <>
      <Script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.12.29/build/spline-viewer.js"
        strategy="afterInteractive"
        onLoad={() => setIsSplineLoaded(true)}
      />

      <section ref={heroRef} className="relative w-full min-h-[120vh] overflow-visible bg-transparent">
        
        {/* LAYER 1: 3D Object - Hidden on mobile */}
        <div className="hidden md:block absolute inset-0 w-full h-full z-20 pointer-events-none overflow-visible">
          <div 
            className="spline-container absolute left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] overflow-visible"
            style={{ top: '300px' }}
          >
            <div dangerouslySetInnerHTML={{ __html: '<spline-viewer loading-anim-type="spinner-small-dark" url="https://prod.spline.design/ZlAhjYD5T6yDqzo1/scene.splinecode" style="width: 100%; height: 100%; pointer-events: auto;"></spline-viewer>' }} />
          </div>
        </div>

        {/* LAYER 2: Content Grid */}
        <div className="relative z-20 layout-grid hero-grid min-h-screen md:min-h-[120vh] pointer-events-none">
          
          {/* Left Content */}
          <div className="grid-col-3 flex flex-col px-6 md:pl-4 md:pr-0 pt-24 md:pt-40">
            <div className="relative z-20 bg-transparent">
              
              {/* 1. Hello World */}
              <div className="mb-6 md:mb-10 bg-transparent animate-slideUp">
                <p className="font-mono text-sm md:text-base text-gray-100 pointer-events-auto">{t('hello')}</p>
              </div>
              
              {/* 2. Nom */}
              <div className="mb-6 md:mb-10 bg-transparent md:-ml-2 animate-slideUp delay-100">
                <h1 className="text-[clamp(3rem,12vw,9rem)] leading-[0.85] font-semibold text-white tracking-tighter pointer-events-auto">
                  {t('name_first')} <span className="text-primary">{t('name_last')}</span>
                </h1>
              </div>
              
              {/* 3. Job */}
              <div className="mb-10 md:mb-20 bg-transparent animate-slideUp delay-200">
                <p className="text-xl md:text-3xl text-[#6B7280] font-semibold tracking-tight pointer-events-auto font-sans">
                {t('job')}
                </p>
              </div>
              
              {/* 4. Description */}
              <div className="max-w-lg bg-transparent animate-slideFromLeft delay-300">
                <p className="text-gray-300 text-base md:text-xl leading-relaxed pointer-events-auto">
                  {t.rich('description', {
                    highlight: (chunks) => <span className="highlight-word">{chunks}</span>,
                    apos: "'"
                  })}
                </p>
              </div>
              
            </div>
          </div>

          {/* Right Stats Column - Hidden on mobile, shown below on mobile */}
          <div className="hidden md:flex grid-col-1 flex-col pt-32 md:pt-40">
            
            {/* Top Stat - 1M+ */}
            <div className="h-[300px] flex flex-col border-b border-l border-border-grid bg-transparent">
              <div className="border-t border-border-grid pt-8 px-8 md:pt-10 md:px-10 bg-transparent animate-slideFromRight delay-500">
                <p className="font-mono text-xs text-gray-400 uppercase tracking-wider leading-relaxed pointer-events-auto">
                  {t.rich('stats_1', { br: () => <br /> })}
                </p>
              </div>
              <div className="mt-auto pb-8 pr-8 md:pb-10 md:pr-10 text-right bg-transparent animate-slideFromRight delay-600">
                <div className="pointer-events-auto">
                  <CounterMillions />
                </div>
              </div>
            </div>
            
            {/* Bottom Stat - 100% */}
            <div className="h-[300px] flex flex-col border-b border-l border-border-grid bg-transparent">
              <div className="pt-8 px-8 md:pt-10 md:px-10 bg-transparent animate-slideFromRight delay-700">
                <p className="font-mono text-xs text-gray-400 uppercase tracking-wider leading-relaxed pointer-events-auto">
                  {t.rich('stats_2', { br: () => <br /> })}
                </p>
              </div>
              <div className="mt-auto pb-8 pr-8 md:pb-10 md:pr-10 text-right bg-transparent animate-slideFromRight delay-800">
                <div className="pointer-events-auto">
                  <CounterPercent />
                </div>
              </div>
            </div>
            
          </div>

          {/* Mobile Stats Section - Stacked vertically */}
          <div className="md:hidden grid-col-1 flex flex-col gap-4 px-6 mt-12 pb-16">
            {/* Stat 1 - 1M+ */}
            <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5 animate-slideUp delay-500">
              <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider leading-relaxed pointer-events-auto">
                {t.rich('stats_1', { br: () => <br /> })}
              </p>
              <div className="pointer-events-auto text-5xl font-medium text-white tracking-tighter">
                1M+
              </div>
            </div>
            
            {/* Stat 2 - 100% */}
            <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5 animate-slideUp delay-600">
              <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider leading-relaxed pointer-events-auto">
                {t.rich('stats_2', { br: () => <br /> })}
              </p>
              <div className="pointer-events-auto text-5xl font-medium text-white tracking-tighter">
                100%
              </div>
            </div>
          </div>

        </div>

        <style jsx global>{`
          spline-viewer { 
            --logo-display: none !important; 
            cursor: default !important;
          }
          /* CSS Global de secours pour cibler les parties exposées */
          spline-viewer::part(logo) { 
            display: none !important; 
            pointer-events: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
          }
          spline-viewer canvas { 
            cursor: default !important;
          }
          body { overflow-y: auto !important; }
        `}</style>
      </section>
    </>
  );
}