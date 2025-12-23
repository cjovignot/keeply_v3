import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Buttons";
import type { Step } from "./types";
import { X } from "lucide-react";
import { useLayout } from "../../hooks/useLayout";
import { usePrint } from "../../hooks/usePrint";

interface TutorialProps {
  steps: Step[];
  onClose: () => void;
}

const Tutorial = ({ steps, onClose }: TutorialProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});
  const { isMobile } = useLayout();
  const { selectedBoxes } = usePrint();

  if (!steps || steps.length === 0) return null;

  const goToNext = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const goToPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const step = steps?.[currentStep] ?? null;

  useEffect(() => {
    if (!step) return;

    // Navigation conditionnelle
    if (step.navigateTo) {
      if (step.navigateTo === "/print" && selectedBoxes.length === 0) {
        // Rester sur la page, ne rien faire
        return;
      }

      navigate(step.navigateTo);
    }

    if (step.action) {
      step.action();
      if (step.autoNext) {
        setTimeout(goToNext, 500);
      }
    }

    const element = document.querySelector(step.selector) as HTMLElement;
    if (element) {
      const rect = element.getBoundingClientRect();

      setHighlightStyle({
        position: "absolute",
        top: rect.top + window.scrollY - 5,
        left: rect.left + window.scrollX - 5,
        width: rect.width + 10,
        height: rect.height + 10,
        border: "2px solid",
        zIndex: 1000,
        pointerEvents: "none",
        transition: "all 0.3s ease",
      });

      window.scrollTo({
        top: rect.top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  }, [currentStep, step, navigate]);

  let messageToRender = step?.message;

  if (
    step?.title = "Impression des étiquettes" &&
    selectedBoxes.length === 0
  ) {
    messageToRender = (
      <div className="text-red-400 font-semibold">
        Tu dois créer et sélectionner au moins une boîte avant d'accéder à la
        fonctionnalité d'impression 🖨️​
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.38)",
          zIndex: 999,
        }}
      />

      <div style={highlightStyle} className="!border-green-500 rounded-3xl" />

      <div
        className="
    fixed 
    z-1000
    border-[1.5px] 
    p-4 
    border-yellow-400 
    rounded-xl 
    text-xs 
    text-yellow-400 
    bg-gray-900/95
  "
        style={{
          bottom: isMobile ? 90 : undefined,
          top: isMobile ? undefined : 20,
          left: isMobile ? "50%" : undefined,
          right: isMobile ? undefined : 0,
          transform: isMobile ? "translateX(-50%)" : "translateX(-4%)",
          width: "calc(100% - 2rem)", // marge 4 (1rem * 2)
          maxWidth: "480px", // largeur max agréable
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-1 top-1 text-yellow-400 hover:cursor-pointer"
        >
          <X size={23} />
        </button>
        <div className="flex justify-between items-center w-full mt-3">
          <h3 className="font-semibold text-lg">{step.title} </h3>
          <div>
            {currentStep + 1}/{steps.length}
          </div>
        </div>
        <div className="mt-4">{messageToRender}</div>

        <div className="flex justify-between mt-4 gap-2">
          <Button
            variant="sm_outlined_accent"
            label="Précédent"
            onClick={goToPrev}
            className="w-26"
            disabled={currentStep === 0}
          />

          {currentStep < steps.length - 1 ? (
            <Button
              variant="sm_outlined_accent"
              label={
    step?.title = "Impression des étiquettes" &&
                selectedBoxes.length === 0
                  ? "Terminer"
                  : "Suivant"
              }
              className="w-26"
              onClick={
    step?.title = "Impression des étiquettes" &&
                selectedBoxes.length === 0
                  ? onClose
                  : goToNext
              }
            />
          ) : (
            <Button
              variant="sm_outlined_accent"
              label="Terminer"
              className="w-26"
              onClick={onClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Tutorial;
