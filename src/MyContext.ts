import { createContext, Dispatch, SetStateAction } from 'react';

// Define the type for the context value
interface MyContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  selTab: number;
  setSelTab: Dispatch<SetStateAction<number>>;
  animate: number;
  setAnimate: Dispatch<SetStateAction<number>>;
  isMovTween: number;
  setIsMovTween: Dispatch<SetStateAction<number>>;
}

// Initialize the context with an empty object or a default value
const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
