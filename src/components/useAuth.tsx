'use client';
import { supabase } from '@/lib/supabaseClient';
import { User as SupabaseUser } from '@supabase/auth-js';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextValue {
  user: SupabaseUser | null;
  favourites: string[];
  refreshUser: () => void;
  refreshFavourites: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  favourites: [],
  refreshUser: () => {},
  refreshFavourites: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [favourites, setFavourites] = useState<string[]>([]);

  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user ?? null);
  };

  const refreshFavourites = useCallback(async () => {
    if (!user) {
      setFavourites([]);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('favourites')
      .eq('id', user.id)
      .single();

    if (!error && data?.favourites) {
      setFavourites(data.favourites);
    }
  }, [user]);

  useEffect(() => {
    refreshUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // loading favourites when user appears
  useEffect(() => {
    if (user) refreshFavourites();
  }, [user, refreshFavourites]);

  return (
    <AuthContext.Provider
      value={{ user, favourites, refreshUser, refreshFavourites }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
