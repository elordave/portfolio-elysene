'use client';

import { useState, useEffect, useRef, memo } from 'react';
import Script from 'next/script';

// Loading skeleton component
function Scene3DSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black/20 overflow-hidden">
      <div className="relative w-full h-full">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 animate-pulse" />
        
        {/* Centered loading indicator */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
            <div className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full animate-spin" />
          </div>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Loading 3D...
          </p>
        </div>
        
        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>
    </div>
  );
}

interface Scene3DProps {
  url: string;
  className?: string;
}

// Scene3D component using spline-viewer web component (same as Hero)
const Scene3D = memo(function Scene3D({ url, className = '' }: Scene3DProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);

  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Reset loaded state when URL changes (for navigation between projects)
  useEffect(() => {
    setIsLoaded(false);
  }, [url]);

  // Detect when spline-viewer canvas is ready
  useEffect(() => {
    if (!scriptLoaded || !containerRef.current) return;

    const checkLoaded = () => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer) {
        const checkCanvas = () => {
          const shadow = viewer.shadowRoot;
          if (shadow) {
            const canvas = shadow.querySelector('canvas');
            if (canvas && mountedRef.current) {
              setIsLoaded(true);
              return true;
            }
          }
          return false;
        };

        if (!checkCanvas()) {
          const interval = setInterval(() => {
            if (checkCanvas()) {
              clearInterval(interval);
            }
          }, 200);

          // Fallback after 10 seconds
          setTimeout(() => {
            clearInterval(interval);
            if (mountedRef.current) setIsLoaded(true);
          }, 10000);
        }
      }
    };

    const timeout = setTimeout(checkLoaded, 100);
    return () => clearTimeout(timeout);
  }, [scriptLoaded, url]);

  // Hide Spline branding (same technique as Hero)
  useEffect(() => {
    if (!scriptLoaded || !containerRef.current) return;

    const injectHideStyle = (shadowRoot: ShadowRoot) => {
      const existingStyle = shadowRoot.getElementById('hide-logo-style');
      if (existingStyle) existingStyle.remove();

      const style = document.createElement('style');
      style.id = 'hide-logo-style';
      style.textContent = `
        #logo, #branding, a, a[href*="spline"], 
        [id*="logo"], [class*="logo"], [class*="branding"],
        div[style*="position: absolute"][style*="bottom"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      shadowRoot.appendChild(style);
    };

    const nukeLogo = () => {
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer?.shadowRoot) {
        injectHideStyle(viewer.shadowRoot);
      }
    };

    nukeLogo();
    
    const viewer = containerRef.current?.querySelector('spline-viewer');
    let observer: MutationObserver | null = null;

    if (viewer?.shadowRoot) {
      observer = new MutationObserver(nukeLogo);
      observer.observe(viewer.shadowRoot, { childList: true, subtree: true });
    }

    const interval = setInterval(nukeLogo, 500);

    return () => {
      observer?.disconnect();
      clearInterval(interval);
    };
  }, [scriptLoaded, url]);

  return (
    <div className={`relative ${className}`}>
      {/* Load spline-viewer script (same version as Hero) */}
      <Script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.12.29/build/spline-viewer.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Show skeleton until loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <Scene3DSkeleton />
        </div>
      )}
      
      {/* Spline viewer - using dangerouslySetInnerHTML like Hero */}
      <div 
        ref={containerRef}
        key={url}
        className={`w-full h-full transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        dangerouslySetInnerHTML={{ 
          __html: `<spline-viewer loading-anim-type="spinner-small-dark" url="${url}" style="width: 100%; height: 100%; pointer-events: auto;"></spline-viewer>` 
        }}
      />

      {/* Global CSS to hide branding (same as Hero) */}
      <style jsx global>{`
        spline-viewer { 
          --logo-display: none !important; 
          cursor: default !important;
        }
        spline-viewer::part(logo) { 
          display: none !important; 
          pointer-events: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        spline-viewer canvas { 
          cursor: default !important;
        }
      `}</style>
    </div>
  );
});

export default Scene3D;
export { Scene3DSkeleton };
