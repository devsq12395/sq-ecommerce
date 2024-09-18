import React, { useState } from "react";
import MyContext from "./MyContext";

interface MyProviderProps {
  children: React.ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);

  return (
    <MyContext.Provider value={{ user, loading, cart, setCart }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
