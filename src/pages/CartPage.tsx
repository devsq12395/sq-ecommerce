import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

import Header from "../components/Header";
import Cart from "../components/cart/Cart";

const CartPage: React.FC = () => {

  return <>
    <Header />

    <motion.div
      className="relative h-full w-full py-10"
      initial="hidden"
      animate="visible"
    >
      <Cart />
    </motion.div>
    
  </>;
}

export default CartPage