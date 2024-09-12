import { supabase } from '../supabaseClient';

// Function to get the current user's username from the 'profiles' table
export const getUsernameFromCurrentUser = async (): Promise<string | null> => {
  try {
    // Get the current session (user)
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

    // Fetch the user's profile from the 'profiles' table using the user_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError.message);
      throw profileError;
    }

    // Return the username if found
    return profile?.username || null;
  } catch (error: any) {
    console.error('Error fetching username:', error.message);
    return null;
  }
};
