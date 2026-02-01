import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LegalContent from '@/components/LegalContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Legal' });
  
  return {
    title: `${t('title')} | ES.ENGINEERING`,
    description: t('editor_text').split('\n')[0]
  };
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'Legal' });
  
  const content = {
    title: t('title'),
    backHome: t('back_home'),
    sections: [
      { title: t('editor_title'), text: t('editor_text') },
      { title: t('host_title'), text: t('host_text') },
      { title: t('ip_title'), text: t('ip_text') },
    ]
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
        <LegalContent content={content} />
        <Footer />
      </div>
    </main>
  );
}
