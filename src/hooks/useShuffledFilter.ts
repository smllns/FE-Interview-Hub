import { useEffect, useState } from 'react';
import { shuffleArray } from '@/lib/shuffleArray';

export function useShuffledFilter<T>(
  items: T[],
  key?: keyof T,
  value?: T[keyof T] | null
) {
  const [shuffled, setShuffled] = useState<T[]>([]);

  useEffect(() => {
    if (!items || items.length === 0) {
      setShuffled([]);
      return;
    }

    let filtered = items;

    if (key && value) {
      filtered = items.filter((item) => item[key] === value);
    }

    setShuffled(shuffleArray(filtered));
  }, [items, key, value]);

  return shuffled;
}
