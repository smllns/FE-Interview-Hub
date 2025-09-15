import { TerminalStarter } from '@/components/Terminal';
import { AnimatedThemeToggler } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className='relative h-svh flex items-center justify-center'>
      <div className='absolute top-4 right-4'>
        <AnimatedThemeToggler />
      </div>
      <TerminalStarter />
    </div>
  );
}
