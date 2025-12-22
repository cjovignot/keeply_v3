// contexts/TutorialContext.tsx
import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

interface TutorialContextType {
  active: boolean;
  startTutorial: () => void;
  stopTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState(false);

  const startTutorial = () => setActive(true);
  const stopTutorial = () => setActive(false);

  return (
    <TutorialContext.Provider value={{ active, startTutorial, stopTutorial }}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context)
    throw new Error("useTutorial must be used within TutorialProvider");
  return context;
};
