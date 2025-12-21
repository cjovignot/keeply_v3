import { useState, useRef } from "react";
import { PrintContext } from "./PrintContext";

export const PrintProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBoxes, setSelectedBoxes] = useState<string[]>([]);
  const printPDFRef = useRef<(() => void) | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const toggleBox = (id: string) => {
    setSelectedBoxes((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelectedBoxes([]);
  const toggleSelecting = () => setIsSelecting((prev) => !prev);

  return (
    <PrintContext.Provider
      value={{
        selectedBoxes,
        toggleBox,
        clearSelection,
        printPDFRef,
        isSelecting,
        toggleSelecting,
      }}
    >
      {children}
    </PrintContext.Provider>
  );
};
