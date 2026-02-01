'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from '@/i18n/navigation';

interface ProjectContentProps {
  project: {
    title: string;
    client: string;
    service: string;
    industry: string;
    duration: string;
    role: string;
    context: string;
    value: string;
    tags: string[];
  };
  translations: {
    backToProjects: string;
    contextTitle: string;
    valueTitle: string;
    tagsTitle: string;
    meta: {
      client: string;
      service: string;
      industry: string;
      duration: string;
    };
  };
}

export default function ProjectContent({ project, translations }: ProjectContentProps) {
  const [titleVisible, setTitleVisible] = useState(false);
  const [metaVisible, setMetaVisible] = useState(false);
  const [contextVisible, setContextVisible] = useState(false);
  const [tagsVisible, setTagsVisible] = useState(false);
  const [valueVisible, setValueVisible] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Create intersection observer for each element
  const createObserver = useCallback((
    ref: React.RefObject<HTMLElement | null>,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    threshold = 0.2
  ) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return observer;
  }, []);

  useEffect(() => {
    // Trigger title animation on mount
    setTimeout(() => setTitleVisible(true), 100);
    setTimeout(() => setMetaVisible(true), 300);

    // Create observers for scroll-triggered animations
    const observers = [
      createObserver(contextRef, setContextVisible),
      createObserver(tagsRef, setTagsVisible),
      createObserver(valueRef, setValueVisible),
      createObserver(navRef, setNavVisible),
    ];

    return () => observers.forEach(obs => obs.disconnect());
  }, [createObserver]);

  // Metadata items for the bar
  const metaItems = [
    { label: translations.meta.client, value: project.client },
    { label: translations.meta.service, value: project.service },
    { label: translations.meta.industry, value: project.industry },
    { label: translations.meta.duration, value: project.duration },
  ];

  return (
    <div className="relative z-10 w-full">
      {/* Hero Section - Title */}
      <section className="min-h-[45vh] md:min-h-[65vh] flex flex-col justify-end pb-6 md:pb-10">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Title Block */}
          <div 
            ref={titleRef}
            className={`space-y-3 transition-all duration-1000 ease-out ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Role subtitle with // prefix */}
            <p className="text-sm md:text-base text-primary font-mono uppercase tracking-widest drop-shadow-lg">
              <span className="text-primary">{"// "}</span>{project.role}
            </p>
            
            {/* Main Title - Reduced size */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight drop-shadow-xl">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Metadata Bar - Glassmorphism Style - Full Width */}
      <section 
        ref={metaRef}
        className={`py-8 transition-all duration-700 delay-200 ${
          metaVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metaItems.map((item, index) => (
              <div 
                key={item.label}
                className="relative px-5 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: metaVisible ? 1 : 0,
                  transform: metaVisible ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-sm md:text-base font-medium text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section 
        ref={contextRef}
        className={`py-16 md:py-24 transition-all duration-700 ${
          contextVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-4xl">
            {/* Section Title - Keep original size */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 flex items-center justify-center bg-primary/20 border border-primary/40 rounded-lg text-primary font-mono text-sm font-bold">
                01
              </span>
              <h2 className="text-xl md:text-2xl font-mono text-white uppercase tracking-wider">
                {translations.contextTitle}
              </h2>
            </div>
            
            {/* Context Text - Increased size with relaxed line height */}
            <div className="relative pl-6 md:pl-8 border-l-2 border-primary/40">
              <p className="text-base md:text-lg text-gray-200 leading-7 md:leading-8 font-light drop-shadow-md">
                {project.context}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section 
        ref={tagsRef}
        className="py-12 md:py-16"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-4xl">
            {/* Section Title - Keep original size */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 flex items-center justify-center bg-primary/20 border border-primary/40 rounded-lg text-primary font-mono text-sm font-bold">
                02
              </span>
              <h2 className="text-xl md:text-2xl font-mono text-white uppercase tracking-wider">
                {translations.tagsTitle}
              </h2>
            </div>
            
            {/* Tags with staggered animation */}
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, index) => (
                <span 
                  key={tag}
                  className={`px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-xs font-mono text-white uppercase tracking-wider transition-all duration-500 hover:bg-primary/20 hover:border-primary/40 ${
                    tagsVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section 
        ref={valueRef}
        className={`py-16 md:py-24 transition-all duration-700 ${
          valueVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-4xl ml-auto">
            {/* Section Title - Keep original size */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-10 flex items-center justify-center bg-primary/20 border border-primary/40 rounded-lg text-primary font-mono text-sm font-bold">
                03
              </span>
              <h2 className="text-xl md:text-2xl font-mono text-white uppercase tracking-wider">
                {translations.valueTitle}
              </h2>
            </div>
            
            {/* Value Text - Increased size with relaxed line height */}
            <div className="relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-base md:text-lg text-white leading-7 md:leading-8 font-light">
                {project.value}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section - Slot Machine Style Button */}
      <section 
        ref={navRef}
        className={`py-16 md:py-24 transition-all duration-700 ${
          navVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <Link 
            href="/#missions"
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
                  {translations.backToProjects}
                </span>
                <span className="leading-[1.4em] text-sm font-mono text-primary uppercase tracking-wider">
                  {translations.backToProjects}
                </span>
              </div>
            </div>

            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/20"></span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
          </Link>
        </div>
      </section>
    </div>
  );
}
