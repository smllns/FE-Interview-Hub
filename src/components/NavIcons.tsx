// action icons for navigarion
import { usePathname, useRouter } from 'next/navigation';
import { Settings, Heart, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedThemeToggler } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export const NavIcons = ({
  onLoginClick,
  wrapperClass,
  iconStyles,
}: {
  onLoginClick: () => void;
  wrapperClass?: boolean;
  iconStyles?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const iconClass = (active: boolean) =>
    cn(
      iconStyles ? '' : 'cursor-pointer transition z-10 hover:scale-110',
      active && iconStyles
        ? ''
        : active
        ? 'text-green-400 dark:text-red-400'
        : iconStyles
        ? ''
        : 'text-white'
    );

  return (
    <div
      className={`flex items-center ${
        wrapperClass ? 'w-full justify-end gap-3' : 'gap-4'
      }`}
    >
      {user ? (
        <>
          {iconStyles ? (
            <>
              <div
                className={`
                  rounded-2xl px-4 py-3
                  ${
                    pathname === '/settings'
                      ? 'bg-green-500 text-black dark:bg-green-400 '
                      : 'dark:text-black  bg-black/80 dark:bg-white '
                  }
                `}
              >
                <Settings onClick={() => router.push('/settings')} />
              </div>
              <div
                className={`
                  rounded-2xl px-4 py-3
                  ${
                    pathname === '/favourites'
                      ? 'bg-pink-400 text-black dark:bg-pink-300 '
                      : 'dark:text-black  bg-black/80 dark:bg-white '
                  }
                `}
              >
                <Heart onClick={() => router.push('/favourites')} />
              </div>
            </>
          ) : (
            <>
              <Settings
                className={iconClass(pathname === '/settings')}
                onClick={() => router.push('/settings')}
              />

              <Heart
                className={iconClass(pathname === '/favourites')}
                onClick={() => router.push('/favourites')}
              />
            </>
          )}
        </>
      ) : iconStyles ? (
        <div
          className={` rounded-2xl px-4 py-3  dark:text-black  bg-black/80 dark:bg-white`}
        >
          <UserRound onClick={onLoginClick} />
        </div>
      ) : (
        <UserRound className={iconClass(false)} onClick={onLoginClick} />
      )}
      <AnimatedThemeToggler
        className={`text-white ${
          iconStyles
            ? 'dark:text-black rounded-2xl bg-black/80 dark:bg-white px-4 py-3'
            : 'z-10 cursor-pointer transition hover:scale-110'
        }`}
      />
    </div>
  );
};
