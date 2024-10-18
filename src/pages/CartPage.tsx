import { useState, useEffect } from "react";
import { motion } from 'framer-motion';

import Cart from "../components/cart/Cart";

const CartPage: React.FC = () => {

  return <>
    

    <motion.div
      className="relative h-full w-full py-10 grid gap-4 md:grid-cols-2"
      initial="hidden"
      animate="visible"
    >
      <Cart />
    </motion.div>
    
  </>;
}

export default CartPage