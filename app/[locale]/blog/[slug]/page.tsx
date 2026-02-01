import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleContent from '@/components/ArticleContent';

// Valid article slugs
const validSlugs = ['big-data-rgpd'];

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  
  if (!validSlugs.includes(slug)) {
    return { title: 'Article Not Found' };
  }

  const t = await getTranslations({ locale, namespace: 'Articles' });
  
  return {
    title: `${t(`${slug}.title`)} | ES.ENGINEERING`,
    description: t(`${slug}.description`)
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  // Validate slug
  if (!validSlugs.includes(slug)) {
    notFound();
  }
  
  const t = await getTranslations({ locale, namespace: 'Articles' });
  const tBlog = await getTranslations({ locale, namespace: 'Blog' });
  
  // Get article data
  const article = {
    title: t(`${slug}.title`),
    description: t(`${slug}.description`),
    date: t(`${slug}.date`),
    readTime: t(`${slug}.read_time`),
    tags: t.raw(`${slug}.tags`) as string[],
    content: {
      intro: t(`${slug}.content.intro`),
      section1_title: t(`${slug}.content.section1_title`),
      section1_text: t(`${slug}.content.section1_text`),
      section2_title: t(`${slug}.content.section2_title`),
      section2_text: t(`${slug}.content.section2_text`),
      section3_title: t(`${slug}.content.section3_title`),
      section3_text: t(`${slug}.content.section3_text`),
      conclusion_title: t(`${slug}.content.conclusion_title`),
      conclusion_text: t(`${slug}.content.conclusion_text`),
    }
  };

  const translations = {
    backBlog: tBlog('back_blog')
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
        <ArticleContent article={article} translations={translations} />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
