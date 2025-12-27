import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Step } from "../components/Tutorial/types";

interface TutorialContextType {
  tutorialActive: boolean;
  startTutorial: (steps: Step[]) => void;
  stopTutorial: () => void;
  activeSteps: Step[] | null;
  currentStep: Step | null;
  currentStepIndex: number;
  isActive: boolean;
  goToNext: () => void;
  goToPrev: () => void;
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
  const [tutorialActive, setTutorialActive] = useState(false);
  const [activeSteps, setActiveSteps] = useState<Step[] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const isActive = !!activeSteps;
  const currentStep =
    activeSteps && activeSteps.length > 0
      ? activeSteps[currentStepIndex]
      : null;

  const startTutorial = (steps: Step[]) => {
    setTutorialActive(true);
    setActiveSteps(steps);
    setCurrentStepIndex(0); // reset
  };

  const stopTutorial = () => {
    setTutorialActive(false);
    setActiveSteps(null);
    setCurrentStepIndex(0);
  };

  const goToNext = () => {
    if (!activeSteps) return;
    setCurrentStepIndex((i) => (i < activeSteps.length - 1 ? i + 1 : i));
  };

  const goToPrev = () => {
    setCurrentStepIndex((i) => (i > 0 ? i - 1 : i));
  };

  return (
    <TutorialContext.Provider
      value={{
        tutorialActive,
        startTutorial,
        stopTutorial,
        activeSteps,
        currentStep,
        currentStepIndex,
        isActive,
        goToNext,
        goToPrev,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};
