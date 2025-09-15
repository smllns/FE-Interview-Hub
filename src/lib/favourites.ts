import { supabase } from './supabaseClient';

export const addFavorite = async (userId: string, questionId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('favourites')
    .eq('id', userId)
    .single();

  if (error) return { error };

  const updated = [...(data?.favourites || []), questionId];

  return await supabase
    .from('profiles')
    .update({ favourites: updated })
    .eq('id', userId);
};

export const removeFavorite = async (userId: string, questionId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('favourites')
    .eq('id', userId)
    .single();

  if (error) return { error };

  const updated = (data?.favourites || []).filter(
    (id: string) => id !== questionId
  );

  const { data: updatedData, error: updateError } = await supabase
    .from('profiles')
    .update({ favourites: updated })
    .eq('id', userId)
    .select();

  return { data: updatedData, error: updateError };
};
