import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

import Header from "../components/Header";
import Profile from "../components/Profile";

import Login from "../components/login/Login";
import SignUp from "../components/login/Signup";
import Items from "../components/catalog/Items";
import Cart from "../components/cart/Cart";

const MainPage: React.FC = () => {

  return <>
    {/* <Header /> */}
    <Login />
    <Profile />
    <SignUp />
    
    <motion.div
      className="relative h-full w-full py-10 grid gap-4 md:grid-cols-2"
      initial="hidden"
      animate="visible"
    >
      <Items />
      <Cart />
    </motion.div>
    
  </>;
}

export default MainPage