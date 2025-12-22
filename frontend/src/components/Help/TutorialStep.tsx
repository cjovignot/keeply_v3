import { useEffect, useState } from "react";

interface Step {
  selector: string; // id ou class CSS de l'élément à mettre en valeur
  message: string;
}

interface TutorialProps {
  steps: Step[];
  onClose: () => void;
}

const Tutorial = ({ steps, onClose }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const step = steps[currentStep];
    const element = document.querySelector(step.selector) as HTMLElement;
    if (element) {
      const rect = element.getBoundingClientRect();
      setHighlightStyle({
        position: "absolute",
        top: rect.top + window.scrollY - 5,
        left: rect.left + window.scrollX - 5,
        width: rect.width + 10,
        height: rect.height + 10,
        border: "2px solid yellow",
        borderRadius: "6px",
        zIndex: 999,
        pointerEvents: "none",
        transition: "all 0.3s ease",
      });
      window.scrollTo({
        top: rect.top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 998,
        }}
      />

      {/* Highlight */}
      <div style={highlightStyle} />

      {/* Bouton X pour fermer le tutoriel */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1001,
          backgroundColor: "transparent",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Fermer le tutoriel"
      >
        ✕
      </button>

      {/* Message Box */}
      <div
        style={{
          position: "fixed",
          bottom: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          backgroundColor: "#1f1f1f",
          padding: "16px 24px",
          borderRadius: "12px",
          maxWidth: "400px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
        }}
      >
        <p>{steps[currentStep].message}</p>

        <div className="flex justify-between mt-4 gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Précédent
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-300"
            >
              Suivant
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3 py-1 bg-red-500 rounded hover:bg-red-400"
            >
              Terminer
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Tutorial;
