'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <main className="min-h-screen bg-background text-white relative overflow-hidden">
      {/* Background Grid Lines Layer */}
      <div className="layout-grid-bg">
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* 404 Large Text */}
        <h1 className="text-[12rem] md:text-[20rem] font-mono font-bold text-white/5 leading-none select-none">
          {t('title')}
        </h1>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* Subtitle */}
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
            {t('subtitle')}
          </h2>

          {/* Message */}
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-md">
            {t('message')}
          </p>

          {/* Back Home Button - Slot Machine Style */}
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
                  {t('back_home')}
                </span>
                <span className="leading-[1.4em] text-sm font-mono text-primary uppercase tracking-wider">
                  {t('back_home')}
                </span>
              </div>
            </div>

            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-full h-px bg-white/20"></span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 ease-out group-hover:w-full"></span>
          </Link>
        </div>
      </div>
    </main>
  );
}
