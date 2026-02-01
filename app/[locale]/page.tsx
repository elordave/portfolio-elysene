import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Missions from "@/components/Missions";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      {/* Background Grid Lines Layer - Persistent across sections (z-1) */}
      <div className="layout-grid-bg">
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
          <div className="h-full"></div>
      </div>

      {/* Main content (z-10) - 3D objects are at z-5, content at z-10+ */}
      <div className="w-full relative z-10">
        <Navbar />
        <Hero />
        <Expertise />
        <Missions />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
