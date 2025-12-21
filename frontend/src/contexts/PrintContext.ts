import { createContext } from "react";

export interface PrintContextType {
  selectedBoxes: string[];
  toggleBox: (id: string) => void;
  clearSelection: () => void;
  printPDFRef: React.MutableRefObject<(() => void) | null>;
  isSelecting: boolean;
  toggleSelecting: () => void;
}

export const PrintContext = createContext<PrintContextType | undefined>(
  undefined
);
