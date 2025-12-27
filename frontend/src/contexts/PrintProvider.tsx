import { useState, useRef, useEffect } from "react";
import { PrintContext } from "./PrintContext";
import { useTutorial } from "./TutorialContext";
import { DEMO_PRINT_BOXES } from "../components/Tutorial/example/demo";

export const PrintProvider = ({ children }: { children: React.ReactNode }) => {
  const { tutorialActive } = useTutorial();
  const [selectedBoxes, setSelectedBoxes] = useState<string[]>([]);
  const printPDFRef = useRef<(() => void) | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const toggleBox = (id: string) => {
    setSelectedBoxes((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (tutorialActive) {
      setSelectedBoxes(DEMO_PRINT_BOXES);
    } else {
      setSelectedBoxes([]);
    }
  }, [tutorialActive]);

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
