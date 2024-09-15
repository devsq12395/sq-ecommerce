import { supabase } from '../supabaseClient';

const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error fetching session:', sessionError.message);
      throw sessionError;
    }

    const userId = session?.user?.id;

    if (!userId) {
      console.error('No user is currently logged in.');
      return null;
    }

    return userId;
  } catch (error: any) {
    console.error('Error fetching user:', error.message);
    return null;
  }
};

export const getUsernameFromCurrentUser = async (): Promise<string | null> => {
  try {
    const userId = await getCurrentUserId();

    if (!userId) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError.message);
      throw profileError;
    }

    return profile?.username || null;
  } catch (error: any) {
    console.error('Error fetching username:', error.message);
    return null;
  }
};

export const getAvatarFromCurrentUser = async (): Promise<string | null> => {
  try {
    const userId = await getCurrentUserId();

    if (!userId) return null;

    const { data: avatar, error: avatarError } = await supabase
      .from('avatars')
      .select('avatar_url')
      .eq('user_id', userId)
      .single();

    if (avatarError) {
      console.error('Error fetching avatar:', avatarError.message);
      throw avatarError;
    }

    return avatar?.avatar_url || null;
  } catch (error: any) {
    console.error('Error fetching avatar URL:', error.message);
    return null;
  }
};
