import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogContent from '@/components/BlogContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  
  return {
    title: `${t('title')} | ES.ENGINEERING`,
    description: t('subtitle')
  };
}

// Available articles - add more slugs here as you create articles
const articleSlugs = ['big-data-rgpd'];

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const tArticles = await getTranslations({ locale, namespace: 'Articles' });
  
  // Build articles data
  const articles = articleSlugs.map(slug => ({
    slug,
    title: tArticles(`${slug}.title`),
    description: tArticles(`${slug}.description`),
    date: tArticles(`${slug}.date`),
    readTime: tArticles(`${slug}.read_time`),
    tags: tArticles.raw(`${slug}.tags`) as string[]
  }));

  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    backHome: t('back_home'),
    readMore: t('read_more')
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

      {/* Main Content */}
      <div className="relative z-10">
        <BlogContent articles={articles} translations={translations} />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
