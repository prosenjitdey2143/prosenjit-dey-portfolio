'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
const ScrollyCanvas = dynamic(() => import('@/components/ScrollyCanvas'), { 
  ssr: false,
  loading: () => <div style={{ height: '500vh', width: '100%', backgroundColor: '#121212' }} />
});
const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'));
const Projects = dynamic(() => import('@/components/Projects'));
const Services = dynamic(() => import('@/components/Services'));
import Header from '@/components/Header';
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-white/20" suppressHydrationWarning>
      <LoadingScreen />
      <Header />
      <ScrollyCanvas />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Footer />
    </main>
  );
}
