import { createContext } from "react";

interface MyContextType {
  user: any;
  loading: boolean;
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
