'use client';

import dynamic from 'next/dynamic';
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const ScrollyCanvas = dynamic(() => import('@/components/ScrollyCanvas'), { ssr: false });
const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'));
const Projects = dynamic(() => import('@/components/Projects'));
const Services = dynamic(() => import('@/components/Services'));
const Header = dynamic(() => import('@/components/Header'));
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
