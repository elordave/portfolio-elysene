import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProjectScene3D from '@/components/ui/ProjectScene3D';
import ProjectContent from '@/components/ProjectContent';

// Project slugs mapping
const projectKeys: Record<string, string> = {
  'monitoring-big-data': 'monitoring',
  'cloud-data-migration': 'cloud',
  'saas-esg-genai': 'saas',
  'bi-governance-security': 'governance'
};

const validSlugs = Object.keys(projectKeys);

// Spline 3D Scene URL
const SPLINE_URL = 'https://prod.spline.design/rDI30eeanSrDHZ3j/scene.splinecode';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  
  if (!validSlugs.includes(slug)) {
    return { title: 'Project Not Found' };
  }

  const projectKey = projectKeys[slug];
  const t = await getTranslations({ locale, namespace: 'Projects' });
  
  return {
    title: `${t(`${projectKey}.title`)} | ES.ENGINEERING`,
    description: t(`${projectKey}.context`).substring(0, 160)
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  // Validate slug
  if (!validSlugs.includes(slug)) {
    notFound();
  }
  
  const projectKey = projectKeys[slug];
  const t = await getTranslations({ locale, namespace: 'Projects' });
  
  // Get project data with new metadata
  const project = {
    title: t(`${projectKey}.title`),
    client: t(`${projectKey}.client`),
    service: t(`${projectKey}.service`),
    industry: t(`${projectKey}.industry`),
    duration: t(`${projectKey}.duration`),
    role: t(`${projectKey}.role`),
    context: t(`${projectKey}.context`),
    value: t(`${projectKey}.value`),
    tags: t.raw(`${projectKey}.tags`) as string[]
  };

  // Get translations for static text
  const translations = {
    backToProjects: t('backToProjects'),
    contextTitle: t('contextTitle'),
    valueTitle: t('valueTitle'),
    tagsTitle: t('tagsTitle'),
    meta: {
      client: t('meta.client'),
      service: t('meta.service'),
      industry: t('meta.industry'),
      duration: t('meta.duration'),
    }
  };

  return (
    <main className="min-h-screen bg-background text-white">
      {/* Background Grid Lines Layer */}
      <div className="layout-grid-bg">
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
        <div className="h-full"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* 3D Background - Fixed, covers entire viewport - Hidden on mobile */}
      <div className="hidden md:block fixed inset-0 z-0">
        <ProjectScene3D 
          url={SPLINE_URL}
          className="w-full h-full"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Content - Scrollable over 3D */}
      <div className="relative z-10">
        <ProjectContent project={project} translations={translations} />

        {/* Contact & Footer - Solid background */}
        <div className="relative z-20 bg-background">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-[1400px] mx-auto" />
          <div className="pt-20">
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
