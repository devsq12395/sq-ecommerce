import { createContext } from "react";

// Define the type of context
interface MyContextType {
    
}

// Initialize context with undefined, to be provided by the provider
const MyContext = createContext<MyContextType | undefined>(undefined);

export default MyContext;
