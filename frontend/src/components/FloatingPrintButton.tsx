import { useEffect, useState } from "react";
import { usePrint } from "../hooks/usePrint";
import { Printer, PrinterCheck, X, RotateCcw, Play, Pause } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./UI/Buttons";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ButtonVariant } from "./UI/Buttons";
import { useTutorial } from "../contexts/TutorialContext";

const FloatingPrintButton = () => {
  const {
    selectedBoxes,
    clearSelection,
    printPDFRef,
    isSelecting,
    toggleSelecting,
  } = usePrint();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const { currentStep, currentStepIndex, activeSteps } = useTutorial();

  useEffect(() => {
    switch (currentStepIndex + 1) {
      case 14:
        setExpanded(true);
        break;

      case 19:
        setExpanded(false);
        break;

      default:
        // ne rien faire
        break;
    }
  }, [currentStepIndex]);

  const hasSelection = selectedBoxes.length > 0;

  const handleStartPrint = () => {
    if (printPDFRef.current) {
      printPDFRef.current();
    } else {
      console.warn("⚠️ handlePrintPDF non encore enregistré");
    }
  };

  // ✅ Actions dynamiques
  const actions: {
    id: string;
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    show: boolean;
    customCSS?: string;
    noCollapse?: boolean;
    variant?: ButtonVariant;
  }[] = hasSelection
    ? [
        {
          id: "tutorial-print-selection-play",
          label:
            selectedBoxes.length > 0 && isSelecting
              ? "Fin de la sélection"
              : "Reprendre la sélection",
          icon: selectedBoxes.length > 0 && isSelecting ? Pause : Play,
          onClick: toggleSelecting,
          show: selectedBoxes.length >= 1,
          variant: "cta",
          noCollapse: selectedBoxes.length > 0 && isSelecting ? true : false,
          customCSS: "!bg-gray-950 !text-yellow-400 border border-yellow-400",
        },
        {
          id: "tutorial-print-layout",
          label: "Mise en page",
          icon: Printer,
          onClick: () => navigate("/printgroup"),
          show: location.pathname !== "/printgroup",
          variant: "cta",
        },
        {
          id: "tutorial-print-start",
          label: "Lancer l'impression",
          icon: PrinterCheck,
          onClick: handleStartPrint,
          show: location.pathname === "/printgroup",
          customCSS: "!bg-gray-950 !text-yellow-400 border border-yellow-400",
          variant: "primary",
        },
        {
          id: "tutorial-print-reset",
          label: "Réinitialiser",
          icon: RotateCcw,
          onClick: () => clearSelection(),
          show: true,
          customCSS: "!bg-red-900 !text-white",
          variant: "secondary",
        },
      ]
    : [
        {
          id: "tutorial-print-selection-play",
          label: isSelecting ? "Fin de la sélection" : "Sélection multiple",
          icon: isSelecting ? Pause : Play,
          onClick: () => {
            toggleSelecting();
            if (!isSelecting) navigate("/boxes");
          },
          show: selectedBoxes.length === 0,
          noCollapse: isSelecting ? true : false,
          variant: "cta",
          customCSS: "!bg-gray-950 !text-yellow-400 border border-yellow-400",
        },
      ];

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {/* --- Bouton principal --- */}
      <motion.div
        animate={
          hasSelection && !expanded
            ? { backgroundColor: ["#0a0a0a", "#fdc700", "#0a0a0a"] }
            : {}
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-full p-[1.5px]"
        id="tutorial-print-menu"
      >
        <Button
          onClick={() => setExpanded(!expanded)}
          icon={expanded ? X : Printer}
          size={18}
          badge={hasSelection ? selectedBoxes.length : undefined}
          variant="cta"
          className={
            hasSelection
              ? "!bg-gray-950 !text-yellow-400 border border-yellow-400"
              : ""
          }
        />
      </motion.div>

      {/* --- Boutons étendus --- */}
      <AnimatePresence>
        {expanded &&
          actions
            .filter((a) => a.show)
            .map((action, index) => (
              <motion.div
                id={action.id}
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Button
                  onClick={() => {
                    action.onClick();
                    if (!action.noCollapse) setExpanded(false);
                  }}
                  icon={action.icon}
                  size={16}
                  variant={action.variant}
                  label={action.label}
                  className={action.customCSS}
                  fullWidth
                />
              </motion.div>
            ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingPrintButton;
