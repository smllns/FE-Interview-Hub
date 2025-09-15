import PixelCard from './ui/pixelCard';
import { Baby, Pointer, Puzzle, Star } from 'lucide-react';

const levels = [
  {
    Icon: Baby,
    name: 'Beginner',
    description: 'Easy questions for getting started.',
    colorsLight: '#f87171,#fbbf24,#34d399',
    colorsDark: '#f8717179,#fbbf2479,#34d3997d',
  },
  {
    Icon: Puzzle,
    name: 'Middle',
    description: 'Intermediate questions to level up.',
    colorsLight: '#60a5fa,#a78bfa,#f472b6',
    colorsDark: '#60a5fa80,#a78bfa80,#f472b680',
  },
  {
    Icon: Star,
    name: 'Senior',
    description: 'Advanced questions for experts.',
    colorsLight: '#facc15,#22d3ee,#8b5cf6',
    colorsDark: '#facc1579,#22d3ee7d,#8b5cf67d',
  },
];

interface DifficultyBentoProps {
  isDark: boolean;
  selectedDifficulty: string;
  onSelectedDifficulty: (level: string) => void;
}

export const DifficultyBento: React.FC<DifficultyBentoProps> = ({
  isDark,
  selectedDifficulty,
  onSelectedDifficulty,
}) => {
  return (
    <div className='grid grid-cols-1 gap-6  py-10 lg:grid-cols-3'>
      {levels.map((level) => (
        <PixelCard
          key={level.name}
          colors={isDark ? level.colorsDark : level.colorsLight}
          onClick={() => onSelectedDifficulty(level.name.toLowerCase())}
          className={`cursor-pointer 
    hover:bg-transparent transition-all duration-300
    ${
      selectedDifficulty === level.name.toLowerCase()
        ? 'bg-rose-200/30 dark:bg-indigo-500/20'
        : 'bg-black/5 dark:bg-white/5 '
    }`}
        >
          <div className='absolute inset-0 flex flex-col justify-center items-center p-4 text-center'>
            <div className='px-4 py-8 rounded-xl flex flex-col justify-center items-center'>
              <level.Icon className='h-12 w-12 mb-2' />
              <h3 className='text-xl font-bold pb-2'>{level.name}</h3>
              <p className='text-sm pb-4'>{level.description}</p>
              <div className='flex items-center gap-2 text-sm underline underline-offset-4 cursor-pointer'>
                <span>Select</span>
                <Pointer className='w-4 h-4' />
              </div>
            </div>
          </div>
        </PixelCard>
      ))}
    </div>
  );
};
