import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Step } from "../components/Tutorial/types";

interface TutorialContextType {
  startTutorial: (steps: Step[]) => void;
  stopTutorial: () => void;
  activeSteps: Step[] | null;
  isActive: boolean;
}

const TutorialContext = createContext<TutorialContextType | undefined>(
  undefined
);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context)
    throw new Error("useTutorial must be used within TutorialProvider");
  return context;
};

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [activeSteps, setActiveSteps] = useState<Step[] | null>(null);
  const isActive = !!activeSteps;

  const startTutorial = (steps: Step[]) => setActiveSteps(steps);
  const stopTutorial = () => setActiveSteps(null);

  return (
    <TutorialContext.Provider
      value={{ startTutorial, stopTutorial, activeSteps, isActive }}
    >
      {children}
    </TutorialContext.Provider>
  );
};
