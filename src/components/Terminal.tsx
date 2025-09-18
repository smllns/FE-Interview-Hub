// terminal component used on first page
'use client';
import { useState } from 'react';
import { AnimatedSpan, Terminal, TypingAnimation } from './ui/terminal';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { terminalMessages } from '@/lib/constants';

export function TerminalStarter() {
  const [isExiting, setIsExiting] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={isExiting ? { y: -200, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (isExiting) router.push('/home');
      }}
      className='w-full overflow-auto flex items-center justify-center'
    >
      <Terminal>
        <TypingAnimation>&gt; preparing-frontend-interview-env</TypingAnimation>

        {terminalMessages.map((msg, idx) => (
          <AnimatedSpan key={idx} className={msg.color}>
            <span>{msg.text}</span>
          </AnimatedSpan>
        ))}

        <TypingAnimation>
          ✅ Frontend Interview Environment initialized successfully!
        </TypingAnimation>

        {/* button with it's own animation logic  */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: terminalMessages.length * 1.1 }}
          onAnimationComplete={() => setButtonVisible(true)}
          className='flex justify-center'
        >
          <button
            disabled={!buttonVisible}
            onClick={() => setIsExiting(true)}
            className={`${
              !buttonVisible ? 'cursor-wait' : 'cursor-pointer'
            } my-4 w-40 mx-auto px-6 font-medium cursor-pointer group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md transition-all duration-100 bg-gradient-to-r dark:from-[#041d04] dark:to-[#0f3d0f] from-[#f7fff7] to-[#f5fff5] dark:border-[#00ff00] border-2 border-[#0f3d0f] dark:text-[#00ff00] text-black [box-shadow:5px_5px_#0f3d0f] dark:[box-shadow:5px_5px_#00ff00] hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_#0f3d0f] dark:hover:[box-shadow:0px_0px_#00ff00]`}
          >
            Learn More
          </button>
        </motion.div>
      </Terminal>
    </motion.div>
  );
}
