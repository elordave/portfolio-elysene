'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';

interface Section {
  title: string;
  text: string;
}

interface LegalContentProps {
  content: {
    title: string;
    backHome: string;
    sections: Section[];
  };
}

export default function LegalContent({ content }: LegalContentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Helper to render text with newlines
  const renderText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="relative z-10 w-full pt-32 md:pt-40 pb-24">
      <div className="w-full max-w-3xl mx-auto px-6 md:px-10">
        {/* Back Button - Slot Machine Style */}
        <div 
          className={`mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
                  {content.backHome}
                </span>
                <span className="leading-[1.4em] text-sm font-mono text-primary uppercase tracking-wider">
                  {content.backHome}
                </span>
              </div>
            </div>

            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/20"></span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
          </Link>
        </div>

        {/* Title */}
        <h1 
          className={`text-4xl md:text-5xl font-light text-white mb-16 tracking-tight transition-all duration-1000 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {content.title}
        </h1>

        {/* Sections */}
        <div className="space-y-12">
          {content.sections.map((section, index) => (
            <section 
              key={index}
              className={`transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                {section.title}
              </h2>
              <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                {renderText(section.text)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
