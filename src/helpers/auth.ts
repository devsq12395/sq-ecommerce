import { supabase } from '../supabaseClient';

// Sign up with email and password
export const signUpWithEmail = async (email: string, password: string, username: string) => {
  // Sign up the user
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (signUpError) {
    console.error('Sign up error:', signUpError.message);
    throw signUpError;
  }

  const user = signUpData?.user;

  // If user is created, insert a new profile into the 'profiles' table
  if (user) {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([
        { username, user_id: user.id } // Insert username and user_id (from Supabase user)
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError.message);
      throw profileError;
    }

    return { user, profile: profileData };
  }
  
  return null;
};

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
