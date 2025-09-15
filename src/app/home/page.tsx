'use client';
import NavigationBar from '@/components/Navbar';
import FaultyTerminal from '@/components/ui/backgrounds/heroBg';
import { ChevronsDown } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MainBento } from '@/components/MainBento';
import { useScrollTo } from '@/hooks/useScrollTo';
import Footer from '@/components/Footer';

const HomePage = () => {
  const bentoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  const scrollToBento = useScrollTo(bentoRef);
  return (
    <>
      <div className='relative w-full h-screen '>
        <div className='absolute w-full top-10 z-20 px-4'>
          <NavigationBar />
        </div>
        <div
          className='
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8
    min-[320px]:text-4xl min-[320px]:min-w-[250px] sm:min-w-[500px] md:min-w-[745px] md:text-6xl z-10 font-bold text-white text-center px-4
    bg-black/50 dark:bg-white/20 rounded-xl'
          style={{
            backdropFilter: 'blur(10px)',
            boxShadow:
              '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
          }}
        >
          Ace Your Frontend Interview Here
          <motion.div
            className='mx-auto py-4 w-10 h-10 cursor-pointer'
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            onClick={scrollToBento}
          >
            <ChevronsDown className='text-white w-10 h-10' />
          </motion.div>
        </div>

        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={1.5}
        />
      </div>
      <div ref={bentoRef} className='min-h-screen flex justify-center'>
        <MainBento />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
