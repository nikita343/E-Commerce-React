import { createContext } from "react";

// Define the shape of the data the context will provide
interface LoaderContextType {
  isLoaderVisible: boolean;

  setIsLoaderVisible: (isVisible: boolean) => void;
}

// 1. Create the Context
export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined
);
