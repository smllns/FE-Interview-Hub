'use client';
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from './useAuth';
import AuthModal from './AuthModal';
import AuthDrawer from './AuthDrawer';
import { addFavorite, removeFavorite } from '@/lib/favourites';
interface LikeButtonProps {
  questionId: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ questionId }) => {
  const { user, favourites, refreshFavourites } = useAuth();
  const isInitiallyLiked = favourites.includes(questionId);
  const [liked, setLiked] = useState(isInitiallyLiked);

  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLiked(isInitiallyLiked);
  }, [isInitiallyLiked]);

  const handleClick = async () => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    setLoading(true);
    if (!liked) {
      const { error } = await addFavorite(user.id, questionId);
      if (!error) {
        setLiked(true);
        refreshFavourites();
      }
    } else {
      const { error } = await removeFavorite(user.id, questionId);
      if (!error) {
        setLiked(false);
        refreshFavourites();
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <div className='relative group inline-block'>
        <button
          disabled={loading}
          onClick={handleClick}
          className={`
            rounded-lg p-2 font-bold bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 cursor-pointer
            ${
              liked
                ? 'dark:text-red-400 text-red-500'
                : 'dark:text-white text-black'
            }
            flex items-center justify-center
          `}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart
            className='w-5 h-5'
            fill={liked ? 'currentColor' : 'none'}
            strokeWidth={2}
          />
        </button>

        {/* Tooltip */}
        <span className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded dark:bg-black dark:text-white bg-white text-black border border-black/20 dark:border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
          {liked ? 'Remove from favourites' : 'Add to favourites'}
        </span>
      </div>
      {authOpen && (
        <>
          {typeof window !== 'undefined' && window.innerWidth >= 1024 ? (
            <AuthModal open={authOpen} setOpen={setAuthOpen} />
          ) : (
            <AuthDrawer open={authOpen} setOpen={setAuthOpen} />
          )}
        </>
      )}
    </div>
  );
};
