import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PrivacyContent from '@/components/PrivacyContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  
  return {
    title: `${t('title')} | ES.ENGINEERING`,
    description: t('intro').substring(0, 160)
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  
  const content = {
    title: t('title'),
    backHome: t('back_home'),
    intro: t('intro'),
    sections: [
      { title: t('collection_title'), text: t('collection_text') },
      { title: t('cookies_title'), text: t('cookies_text') },
      { title: t('rights_title'), text: t('rights_text') },
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
        <PrivacyContent content={content} />
        <Footer />
      </div>
    </main>
  );
}
