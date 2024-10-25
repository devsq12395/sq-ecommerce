import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabaseClient';
import MyContext from './MyContext';
import { getCurrentUserId } from './helpers/user.ts';

interface MyProviderProps {
  children: ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      if (user) {
        const id = await getCurrentUserId();
        setUserId(id);
      } else {
        setUserId(null);
      }
    };

    fetchUserId();
  }, [user]);

  return (
    <MyContext.Provider value={{ user, setUser, userId, setUserId, loading, setLoading, cart, setCart }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};

export default MyProvider;
