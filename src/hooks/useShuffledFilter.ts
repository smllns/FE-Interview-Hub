// hook for randomly shuffling questions
import { useEffect, useRef, useState } from 'react';
import { shuffleArray } from '@/lib/shuffleArray';

export function useShuffledFilter<T>(
  items: T[],
  key?: keyof T,
  value?: T[keyof T] | null
) {
  const [shuffled, setShuffled] = useState<T[]>([]);
  const prevItemsKey = useRef<string | null>(null);

  useEffect(() => {
    if (!items || items.length === 0) {
      setShuffled([]);
      prevItemsKey.current = null;
      return;
    }

    let filtered = items;
    if (key && value !== undefined && value !== null) {
      filtered = items.filter((item) => item[key] === value);
    }

    const currentKey = JSON.stringify(filtered.map((item) => item));

    if (prevItemsKey.current !== currentKey) {
      prevItemsKey.current = currentKey;
      setShuffled(shuffleArray(filtered));
    }
  }, [items, key, value]);

  return shuffled;
}
