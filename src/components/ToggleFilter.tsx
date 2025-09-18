// toggle component for mode selections
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ToggleFilterProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  title: string;
  colors?: string;
}

const ToggleFilter: React.FC<ToggleFilterProps> = ({
  options,
  selected,
  onChange,
  title,
  colors,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className='flex flex-col items-center gap-4 mb-4 w-fit '>
      <span className='font-bold'>{title}</span>
      <div
        className={cn(
          'relative flex items-center justify-center space-x-2 rounded-full px-2 py-1',
          colors ? colors : 'bg-black/40 dark:bg-white/20',
          ' shadow-[0_0_24px_rgba(34,42,53,0.06),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(34,42,53,0.04),_0_0_4px_rgba(34,42,53,0.08),_0_16px_68px_rgba(47,48,55,0.05),_0_1px_0_rgba(255,255,255,0.1)_inset]'
        )}
      >
        {options.map((option, idx) => {
          const isSelected = selected === option;
          const isHovered = hovered === idx;

          return (
            <button
              key={option}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onChange(option)}
              className={cn(
                'relative px-4 py-2 rounded-xl transition-colors text-sm font-bold cursor-pointer',
                'text-neutral-100 dark:text-neutral-100',
                isSelected ? 'font-bold' : 'opacity-70 hover:opacity-100'
              )}
            >
              {(isSelected || isHovered) && (
                <motion.div
                  layoutId={`${option}-${isSelected ? 'selected' : 'hovered'}`}
                  initial={false}
                  className='absolute inset-0 h-full w-full rounded-full dark:bg-white/10 bg-black/10'
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className='relative z-10'>
                {option[0].toUpperCase() + option.slice(1)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleFilter;
