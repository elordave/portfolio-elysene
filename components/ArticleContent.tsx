'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';

interface ArticleContentType {
  intro: string;
  section1_title: string;
  section1_text: string;
  section2_title: string;
  section2_text: string;
  section3_title: string;
  section3_text: string;
  conclusion_title: string;
  conclusion_text: string;
}

interface Article {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: ArticleContentType;
}

interface ArticleContentProps {
  article: Article;
  translations: {
    backBlog: string;
  };
}

export default function ArticleContent({ article, translations }: ArticleContentProps) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Header animation on mount
  useEffect(() => {
    const timer1 = setTimeout(() => setHeaderVisible(true), 100);
    const timer2 = setTimeout(() => setContentVisible(true), 400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative z-10 w-full pt-32 md:pt-40">
      {/* Header Section */}
      <header className="w-full max-w-3xl mx-auto px-6 md:px-10 mb-12 md:mb-16">
        {/* Back Button - Slot Machine Style */}
        <div 
          ref={headerRef}
          className={`mb-10 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Link 
            href="/blog"
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
                  {translations.backBlog}
                </span>
                <span className="leading-[1.4em] text-sm font-mono text-primary uppercase tracking-wider">
                  {translations.backBlog}
                </span>
              </div>
            </div>

            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/20"></span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
          </Link>
        </div>

        {/* Article Meta */}
        <div 
          className={`transition-all duration-1000 delay-100 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Date & Read Time */}
          <div className="flex items-center gap-4 mb-6 text-sm font-mono text-gray-500">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span>{article.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs font-mono text-white/70 bg-white/5 border border-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article 
        ref={contentRef}
        className={`w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-24 transition-all duration-1000 ${
          contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Intro - Centered */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-24">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
            {article.content.intro}
          </p>
        </div>

        {/* Section 1 - Left aligned */}
        <section className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="md:pr-8">
            <h2 className="text-xl md:text-2xl font-light text-primary mb-4 tracking-wide">
              {article.content.section1_title}
            </h2>
          </div>
          <div className="md:pl-8 border-l-2 border-primary/30">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed pl-6">
              {article.content.section1_text}
            </p>
          </div>
        </section>

        {/* Section 2 - Left title, right text */}
        <section className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="md:pr-8">
            <h2 className="text-xl md:text-2xl font-light text-primary mb-4 tracking-wide">
              {article.content.section2_title}
            </h2>
          </div>
          <div className="md:pl-8 border-l-2 border-primary/30">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed pl-6">
              {article.content.section2_text}
            </p>
          </div>
        </section>

        {/* Section 3 - Left aligned */}
        <section className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="md:pr-8">
            <h2 className="text-xl md:text-2xl font-light text-primary mb-4 tracking-wide">
              {article.content.section3_title}
            </h2>
          </div>
          <div className="md:pl-8 border-l-2 border-primary/30">
            <p className="text-base md:text-lg text-gray-300 leading-relaxed pl-6">
              {article.content.section3_text}
            </p>
          </div>
        </section>

        {/* Conclusion - Centered with glassmorphism */}
        <section className="mb-16 md:mb-24 max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl md:text-2xl font-light text-primary mb-6 tracking-wide">
            {article.content.conclusion_title}
          </h2>
          <p className="text-base md:text-lg text-gray-200 leading-relaxed">
            {article.content.conclusion_text}
          </p>
        </section>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-16 max-w-3xl mx-auto"></div>

        {/* Back to Blog CTA */}
        <div className="flex justify-center max-w-3xl mx-auto">
          <Link 
            href="/blog"
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
                  {translations.backBlog}
                </span>
                <span className="leading-[1.4em] text-sm font-mono text-primary uppercase tracking-wider">
                  {translations.backBlog}
                </span>
              </div>
            </div>

            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/20"></span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
          </Link>
        </div>
      </article>
    </div>
  );
}
