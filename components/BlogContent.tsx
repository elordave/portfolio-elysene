'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogContentProps {
  articles: Article[];
  translations: {
    title: string;
    subtitle: string;
    backHome: string;
    readMore: string;
  };
}

export default function BlogContent({ articles, translations }: BlogContentProps) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>(new Array(articles.length).fill(false));
  
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Header animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setHeaderVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Staggered card animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setCardsVisible(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150); // Staggered delay
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, [articles.length]);

  return (
    <div className="relative z-10 w-full pt-32 md:pt-40">
      {/* Header Section */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-10 mb-16 md:mb-24">
        {/* Back Button - Slot Machine Style */}
        <div 
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link 
            href="/"
            className="relative inline-flex items-center py-3 group"
          >
            {/* Arrow Icon with Slot Effect */}
            <div className="relative overflow-hidden w-5 h-5 mr-4">
              <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-1/2">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="block shrink-0"
                >
                  <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"/>
                </svg>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 20 20" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="block shrink-0"
                >
                  <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                </svg>
              </div>
            </div>

            {/* Text with Slot Effect */}
            <div className="relative overflow-hidden h-[1.4em]">
              <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-1/2">
                <span className="leading-[1.4em] text-sm font-mono text-white uppercase tracking-wider">
                  {translations.backHome}
                </span>
                <span className="leading-[1.4em] text-sm font-mono text-primary uppercase tracking-wider">
                  {translations.backHome}
                </span>
              </div>
            </div>

            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/20"></span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
          </Link>
        </div>

        {/* Title & Subtitle */}
        <div 
          className={`space-y-4 transition-all duration-1000 delay-200 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
            {translations.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl">
            {translations.subtitle}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <div
              key={article.slug}
              ref={el => { cardRefs.current[index] = el; }}
              className={`transition-all duration-700 ${
                cardsVisible[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <Link 
                href={`/blog/${article.slug}`}
                className="group block relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500"
              >
                {/* Animated Border */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl">
                  <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-[width] duration-300 group-hover:w-full"></span>
                  <span className="absolute right-0 top-0 w-px h-0 bg-primary transition-[height] duration-300 delay-150 group-hover:h-full"></span>
                  <span className="absolute right-0 bottom-0 h-px w-0 bg-primary transition-[width] duration-300 delay-300 group-hover:w-full"></span>
                  <span className="absolute left-0 bottom-0 w-px h-0 bg-primary transition-[height] duration-300 delay-450 group-hover:h-full"></span>
                </span>
                
                {/* Static Border */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10"></span>

                {/* Content Layout */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left: Content */}
                  <div className="flex-1">
                    {/* Date & Read Time */}
                    <div className="flex items-center gap-4 mb-3 text-sm font-mono text-gray-500">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                      <span>{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-base leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  {/* Right: Read More CTA */}
                  <div className="flex items-center text-primary font-medium text-sm md:ml-8 shrink-0 group-hover:translate-x-2 transition-transform duration-300">
                    <span>{translations.readMore}</span>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      className="ml-2"
                    >
                      <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
