import { supabase } from '../supabaseClient';

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (signUpError) {
      console.error('Sign up error:', signUpError.message);
      throw signUpError;
    }

    return signUpData?.user;
  } catch (error: any) {
    console.error('Error fetching username:', error.message);
    return null;
  }
};

export const createProfile = async (username: string) => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error fetching session:', sessionError.message);
      throw sessionError;
    }

    const user = session?.user;

    if (!user) {
      console.error('No authenticated user found.');
      return null;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([
        { username, user_id: user.id } 
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError.message);
      throw profileError;
    }

    return { user, profile: profileData };
  } catch (error: any) {
    console.error('Error fetching username:', error.message);
    return null;
  }
}

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

// Sign out the current user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
