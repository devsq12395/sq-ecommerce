import { createClient } from '@supabase/supabase-js';

// Read environment variables from the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
