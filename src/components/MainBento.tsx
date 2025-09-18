// grid on main page
'use client';

import { features } from '@/lib/constants';
import { BentoCard, BentoGrid } from './ui/bentoGrid';

export function MainBento() {
  return (
    <BentoGrid className='lg:grid-rows-3 px-4 py-10'>
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
