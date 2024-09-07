import React, { useState } from "react";
import MyContext from "./MyContext";

interface MyProviderProps {
  children: React.ReactNode;
}

const MyProvider: React.FC<MyProviderProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selTab, setSelTab] = useState<number>(0);
  const [animate, setAnimate] = useState<number>(0);
  const [isMovTween, setIsMovTween] = useState<number>(0);

  const state = {
    isLoggedIn, setIsLoggedIn,
    selTab, setSelTab,
    animate, setAnimate,
    isMovTween, setIsMovTween
  };

  return (
    <MyContext.Provider value={state}>{props.children}</MyContext.Provider>
  );
};

export default MyProvider;
