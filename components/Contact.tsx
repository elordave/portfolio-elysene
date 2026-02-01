'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { Mail, ArrowRight, Calendar, Linkedin, Copy, Check, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
          // Petit délai pour éviter le flash si déjà dans la vue
          setTimeout(() => setIsVisible(true), 100); 
          observer.disconnect(); // On ne joue l'animation qu'une seule fois
        }
      },
      { threshold: 0.15 } // Déclenche quand 15% de l'élément est visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Définition des positions de départ
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

// --- COMPOSANT PRINCIPAL ---
export default function Contact() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [emailCopied, setEmailCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact@elysene.engineering');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
        // Reset to idle after 3 seconds
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  // Get button text based on status
  const getButtonText = () => {
    switch (formStatus) {
      case 'sending':
        return t('form.sending');
      case 'success':
        return t('form.success');
      case 'error':
        return t('form.error');
      default:
        return t('form.submit');
    }
  };

  return (
    <section id="contact" className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 mb-20 overflow-x-hidden">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        
        {/* COLONNE GAUCHE : FORMULAIRE */}
        <ScrollReveal direction="left" className="h-full">
          <div className="expertise-card-container group/card p-8 md:p-12 lg:p-16 flex flex-col relative overflow-hidden h-full">
            {/* Lumière Orange au sommet */}
            <div className="card-top-glow"></div>
              
            {/* Gradient Background Subtil */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full">
              <p className="font-mono text-base text-gray-100 mb-8">{t('title')}</p>
              
              <form onSubmit={handleSubmit} className="space-y-10 grow flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <input
                      type="text"
                      name="name"
                      placeholder={t('form.name')}
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-300 text-sm md:text-base"
                    />
                  </div>
                  <div className="group relative">
                    <input
                      type="text"
                      name="company"
                      placeholder={t('form.company')}
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-300 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group relative">
                    <input
                      type="email"
                      name="email"
                      placeholder={t('form.email')}
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-300 text-sm md:text-base"
                    />
                  </div>
                  <div className="group relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder={t('form.phone')}
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-300 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="group relative">
                  <textarea
                    name="message"
                    placeholder={t('form.message')}
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-300 resize-none text-sm md:text-base"
                  />
                </div>

                <div className="pt-6 flex justify-center">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`relative bg-transparent px-8 py-6 flex items-center justify-center group/btn cursor-pointer border rounded-md outline-none transition-all overflow-hidden ${
                      formStatus === 'success' 
                        ? 'border-primary bg-primary/10' 
                        : formStatus === 'error'
                        ? 'border-red-500/50 bg-red-500/10'
                        : 'border-white/20 hover:border-white/40'
                    } ${formStatus === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <span className="pointer-events-none absolute inset-0">
                      <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-[width] duration-300 group-hover/btn:w-full"></span>
                      <span className="absolute right-0 top-0 w-px h-0 bg-primary transition-[height] duration-300 delay-150 group-hover/btn:h-full"></span>
                      <span className="absolute right-0 bottom-0 h-px w-0 bg-primary transition-[width] duration-300 delay-300 group-hover/btn:w-full"></span>
                      <span className="absolute left-0 bottom-0 w-px h-0 bg-primary transition-[height] duration-300 delay-450 group-hover/btn:h-full"></span>
                    </span>
                    <div className={`relative overflow-hidden flex items-center gap-3 font-mono text-sm tracking-wide ${
                      formStatus === 'success' ? 'text-primary' : formStatus === 'error' ? 'text-red-400' : 'text-white'
                    }`}>
                      {formStatus === 'sending' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{getButtonText()}</span>
                        </>
                      ) : formStatus === 'success' ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>{getButtonText()}</span>
                        </>
                      ) : formStatus === 'error' ? (
                        <span>{getButtonText()}</span>
                      ) : (
                        <>
                          <div className="relative overflow-hidden h-[1.2em]">
                            <div className="flex flex-col transition-transform duration-400 group-hover/btn:-translate-y-1/2">
                              <span className="leading-[1.2em]">{getButtonText()}</span>
                              <span className="leading-[1.2em] text-primary">{getButtonText()}</span>
                            </div>
                          </div>
                          <div className="relative overflow-hidden w-5 h-5">
                            <div className="flex flex-col transition-transform duration-300 group-hover/btn:-translate-y-1/2">
                              <ArrowRight className="w-5 h-5" />
                              <ArrowRight className="w-5 h-5 text-primary" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ScrollReveal>

        {/* COLONNE DROITE : BOOKING & INFO */}
        <ScrollReveal direction="right" className="h-full">
          <div className="expertise-card-container group/card p-8 md:p-12 lg:p-16 flex flex-col justify-between min-h-[500px] relative overflow-hidden h-full">
            
            {/* Lumière Orange au sommet */}
            <div className="card-top-glow"></div>
              
            {/* Gradient Background Subtil */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Décoration subtile en fond */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20 rounded-2xl">
               <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="max-w-lg mx-auto text-center lg:text-left lg:mx-0">
                <h3 className="text-3xl md:text-5xl font-light text-white mb-6 md:mb-8 leading-tight">
                  {t.rich('info.title', {
                    br: () => <br />,
                    accent: (chunks) => <span className="text-primary font-normal">{chunks}</span>,
                    apos: "'"
                  })}
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 border-l-2 border-primary/30 pl-6 text-left">
                  {t('info.description')}
                </p>
                
                <div className="flex justify-center lg:justify-start">
                  <a 
                    href={process.env.NEXT_PUBLIC_CALENDAR_LINK || "https://cal.com"}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative bg-transparent px-8 py-6 flex items-center justify-center group/btn cursor-pointer border border-white/20 rounded-md outline-none transition-colors overflow-hidden"
                  >
                    <span className="pointer-events-none absolute inset-0">
                      <span className="absolute left-0 top-0 h-px w-0 bg-primary transition-[width] duration-300 group-hover/btn:w-full"></span>
                      <span className="absolute right-0 top-0 w-px h-0 bg-primary transition-[height] duration-300 delay-150 group-hover/btn:h-full"></span>
                      <span className="absolute right-0 bottom-0 h-px w-0 bg-primary transition-[width] duration-300 delay-300 group-hover/btn:w-full"></span>
                      <span className="absolute left-0 bottom-0 w-px h-0 bg-primary transition-[height] duration-300 delay-450 group-hover/btn:h-full"></span>
                    </span>
                    <div className="relative overflow-hidden flex items-center gap-3 text-white font-mono text-sm tracking-wide">
                      <div className="relative overflow-hidden h-[1.2em]">
                        <div className="flex flex-col transition-transform duration-400 group-hover/btn:-translate-y-1/2">
                          <span className="leading-[1.2em]">{t('info.cta')}</span>
                          <span className="leading-[1.2em] text-primary">{t('info.cta')}</span>
                        </div>
                      </div>
                      <div className="relative overflow-hidden w-5 h-5">
                         <div className="flex flex-col transition-transform duration-300 group-hover/btn:-translate-y-1/2">
                            <Calendar className="w-5 h-5" />
                            <Calendar className="w-5 h-5 text-primary" />
                         </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6 text-center lg:text-left">{t('info.contacts')}</p>
                <div className="flex flex-col gap-5 items-center lg:items-start">
                  <button 
                    onClick={handleCopyEmail}
                    className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                      <Mail className="w-4 h-4 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm md:text-base font-medium">contact@elysene.engineering</span>
                    <div className="flex items-center gap-2">
                      {emailCopied ? (
                        <>
                          <Check className="w-4 h-4 text-primary" />
                          <span className="text-xs font-mono text-primary">{t('info.copied')}</span>
                        </>
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </button>

                  <a 
                    href="https://www.linkedin.com/in/ely-sene/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-300 hover:text-white group transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                      <Linkedin className="w-4 h-4 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm md:text-base font-medium">linkedin.com/in/ely-sene</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}