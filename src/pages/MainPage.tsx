import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  return <>
    <motion.div
      className="relative h-full w-full py-10 grid gap-4 md:grid-cols-2"
      initial="hidden"
      animate="visible"
    >
      <h1>Test</h1>
    </motion.div>
  </>;
}

export default MainPage