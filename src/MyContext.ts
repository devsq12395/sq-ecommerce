import { createContext } from "react";

// Define the type of context
interface MyContextType {
  user: any;
  loading: boolean;
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

// Initialize context with default undefined, which will be provided by the MyProvider
const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
