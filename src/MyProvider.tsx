import React, { useState } from 'react';
import MyContext from './MyContext';

// MyProvider component with type definitions
const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selTab, setSelTab] = useState<number>(0);
  const [animate, setAnimate] = useState<number>(0);
  const [isMovTween, setIsMovTween] = useState<number>(0);

  // Create the state object with the correct types
  const state = {
    isLoggedIn, 
    setIsLoggedIn,
    selTab, 
    setSelTab,
    animate, 
    setAnimate,
    isMovTween, 
    setIsMovTween,
  };

  return (
    <MyContext.Provider value={state}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
