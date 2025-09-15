import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<typeof Link> {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        'grid w-full sm:auto-rows-[22rem] grid-cols-3 gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <Link
    href={href}
    className={cn(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
      'transform-gpu bg-background [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
      'transition-all duration-300 hover:bg-black/[.03] dark:hover:bg-neutral-800/10',

      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className='p-4'>
      <div className='pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10'>
        <Icon className='h-12 w-12 origin-left transform-gpu text-black dark:text-white transition-all duration-300 ease-in-out group-hover:scale-75' />
        <h3 className='text-xl font-semibold text-black dark:text-white'>
          {name}
        </h3>
        <p className='max-w-lg text-black dark:text-neutral-300'>
          {description}
        </p>
      </div>

      <div
        className={cn(
          'lg:hidden pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
        )}
      >
        <span className='relative flex items-center justify-center'>
          {cta}
          <ArrowRight className='ms-2 h-4 w-4 rtl:rotate-180' />
          <span className='absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full' />
        </span>
      </div>
    </div>

    <div
      className={cn(
        'hidden lg:flex pointer-events-none absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
      )}
    >
      <span className='relative flex items-center justify-center'>
        {cta}
        <ArrowRight className='ms-2 h-4 w-4 rtl:rotate-180' />
        <span className='absolute bottom-0 left-0 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full' />
      </span>
    </div>

    <div className='pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10' />
  </Link>
);

export { BentoCard, BentoGrid };
