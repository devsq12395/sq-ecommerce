import { createContext } from "react";

interface MyContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  userId: any;
  setUserId: React.Dispatch<React.SetStateAction<any>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
