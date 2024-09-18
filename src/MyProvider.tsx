import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabaseClient';
import MyContext from './MyContext'; // Import the existing MyContext

// Define the provider component props type
interface MyProviderProps {
  children: ReactNode;
}

// Define the combined MyProvider with Auth and Cart logic
const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    // Get the current session from Supabase (Auth logic)
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
    <MyContext.Provider value={{ user, loading, cart, setCart }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for using the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export default MyProvider;
