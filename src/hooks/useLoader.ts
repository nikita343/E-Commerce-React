import { useContext } from "react";
import { LoaderContext } from "../contexts/LoaderContext";

export const useLoader = () => {
  const context = useContext(LoaderContext);

  // Optional: Add a check to ensure the hook is used inside the Provider
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
