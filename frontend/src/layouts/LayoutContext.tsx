import { createContext, useContext } from "react";

export type LayoutContextType = {
  isMobile: boolean;
};

export const LayoutContext = createContext<LayoutContextType>({
  isMobile: false, // valeur par défaut
});

export const useLayout = () => useContext(LayoutContext);
