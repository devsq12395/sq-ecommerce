import { useState, useContext, useEffect } from "react";
import { motion } from 'framer-motion';

import Header from "../components/Header";
import Items from "../components/catalog/Items";

import MyContext from '../MyContext';

const MainPage: React.FC = () => {
  const context = useContext(MyContext);
  const { user, userId } = context;
  
  return <>
    <Header />
    
    <motion.div
      className="relative h-full w-full py-10 grid gap-4 md:grid-cols-2"
      initial="hidden"
      animate="visible"
    >
      <Items />
    </motion.div>
    
  </>;
}

export default MainPage