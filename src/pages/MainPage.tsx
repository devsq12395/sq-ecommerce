import { useContext } from "react";
import { motion } from 'framer-motion';

import Header from "../components/Header";
import Items from "../components/catalog/Items";

import MyContext from '../MyContext';

const MainPage: React.FC = () => {
  const context = useContext(MyContext);
  const { user, userId } = context;
  
  return (
    <>
      <Header />
      
      <div className="w-full bg-gray-100 py-10">
        <motion.div
          className="max-w-6xl mx-auto p-6"
          initial="hidden"
          animate="visible"
        >
          <Items />
        </motion.div>
      </div>
    </>
  );
}

export default MainPage;
