import { useState, useEffect, type ReactNode } from "react";
import { LoaderContext } from "./LoaderContext";

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {}, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoaderVisible, setIsLoaderVisible }}>
      {children}
    </LoaderContext.Provider>
  );
};
