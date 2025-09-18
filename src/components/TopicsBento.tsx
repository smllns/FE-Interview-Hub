// grid for topics
import { Pointer } from 'lucide-react';
import PixelCard from './ui/pixelCard';
import { topicColors } from '@/lib/constants';

interface TopicsBentoProps {
  topics: string[];
  isDark: boolean;
  selectedTopic: string;
  onSelectedTopic: (level: string) => void;
}

export const TopicsBento: React.FC<TopicsBentoProps> = ({
  topics,
  isDark,
  selectedTopic,
  onSelectedTopic,
}) => {
  return (
    <div className='flex flex-col gap-6 px-4 py-10'>
      <div className='flex flex-col gap-6 lg:flex-row'>
        {topics.slice(0, 2).map((topic, idx) => {
          const colors = isDark
            ? topicColors[idx].dark
            : topicColors[idx].light;
          return (
            <PixelCard
              key={topic}
              noMaxW={true}
              colors={colors}
              onClick={() => onSelectedTopic(topic)}
              className={` flex-1 cursor-pointer 
    hover:bg-transparent transition-all duration-300
    ${
      selectedTopic === topic
        ? 'bg-indigo-200/30 dark:bg-green-200/20'
        : 'bg-black/5 dark:bg-white/5 '
    }`}
            >
              <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
                <h3 className='text-xl font-bold pb-4'>{topic}</h3>
                <div className='flex items-center gap-2 text-sm underline underline-offset-4 cursor-pointer'>
                  <span>Select</span>
                  <Pointer className='w-4 h-4' />
                </div>
              </div>
            </PixelCard>
          );
        })}
      </div>
      <div className='flex flex-col gap-6 lg:flex-row'>
        {topics.slice(2, 5).map((topic, idx) => {
          const colors = isDark
            ? topicColors[idx + 2].dark
            : topicColors[idx + 2].light;
          return (
            <PixelCard
              key={topic}
              noMaxW={true}
              colors={colors}
              onClick={() => onSelectedTopic(topic)}
              className={`cursor-pointer 
    hover:bg-transparent transition-all duration-300
    ${
      selectedTopic === topic
        ? 'bg-indigo-200/30 dark:bg-green-200/20'
        : 'bg-black/5 dark:bg-white/5 '
    }`}
            >
              <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-4'>
                <h3 className='text-xl font-bold pb-4'>{topic}</h3>
                <div className='flex items-center gap-2 text-sm underline underline-offset-4 cursor-pointer'>
                  <span>Select</span>
                  <Pointer className='w-4 h-4' />
                </div>
              </div>
            </PixelCard>
          );
        })}
      </div>
    </div>
  );
};
