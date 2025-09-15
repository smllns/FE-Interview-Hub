'use client';
import { useState } from 'react';
import { AnimatedSpan, Terminal, TypingAnimation } from './ui/terminal';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export function TerminalStarter() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();
  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={isExiting ? { y: -200, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (isExiting) router.push('/home');
      }}
      className='w-full  overflow-auto flex items-center justify-center'
    >
      <Terminal>
        <TypingAnimation>&gt; preparing-frontend-interview-env</TypingAnimation>

        <AnimatedSpan className='text-green-600 dark:text-green-500'>
          <span>✔ Loading HTML/CSS modules...</span>
        </AnimatedSpan>

        <AnimatedSpan className='text-green-600 dark:text-green-500'>
          <span>✔ Verifying JavaScript knowledge...</span>
        </AnimatedSpan>

        <AnimatedSpan className='text-green-600 dark:text-green-500'>
          <span>✔ Setting up React and Next.js questions...</span>
        </AnimatedSpan>

        <AnimatedSpan className='text-green-600 dark:text-green-500'>
          <span>✔ Initializing TypeScript checks...</span>
        </AnimatedSpan>

        <AnimatedSpan className='text-green-600 dark:text-green-500'>
          <span>✔ Tailwind CSS & design system validation...</span>
        </AnimatedSpan>

        <AnimatedSpan className='text-green-600 dark:text-green-500'>
          <span>✔ Motion/Animations modules loaded...</span>
        </AnimatedSpan>

        <AnimatedSpan className='text-blue-500'>
          <span>ℹ Ready to run interactive coding tasks</span>
        </AnimatedSpan>

        <TypingAnimation>
          ✅ Frontend Interview Environment initialized successfully!
        </TypingAnimation>

        <TypingAnimation>
          You may now start reviewing questions!
        </TypingAnimation>
        <AnimatedSpan>
          <button
            onClick={() => setIsExiting(true)}
            className='my-4 w-40 mx-auto cursor-pointer group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md  
  bg-gradient-to-r dark:from-[#041d04] dark:to-[#0f3d0f] from-[#f7fff7] to-[#f5fff5] 
  dark:border-[#00ff00] border-2 border-[#0f3d0f] 
  bg-transparent px-6 font-medium dark:text-[#00ff00] text-black transition-all duration-100 
  [box-shadow:5px_5px_#0f3d0f] dark:[box-shadow:5px_5px_#00ff00] 
  hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_#0f3d0f] dark:hover:[box-shadow:0px_0px_#00ff00]'
          >
            Learn More
          </button>
        </AnimatedSpan>
      </Terminal>
    </motion.div>
  );
}
