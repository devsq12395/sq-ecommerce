import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../supabaseClient';
import MyContext from '../MyContext';

// Define the provider component props type
interface AuthProviderProps {
  children: ReactNode;
}

// Define the provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the current session from Supabase
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      // Clean up subscription
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <MyContext.Provider value={{ user, loading }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for using the context
export const useAuth = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
