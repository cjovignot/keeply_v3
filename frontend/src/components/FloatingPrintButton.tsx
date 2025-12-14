import { usePrint } from "../hooks/usePrint";
import { Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./UI/Buttons";

const FloatingPrintButton = () => {
  const { selectedBoxes } = usePrint();
  const navigate = useNavigate();

  if (selectedBoxes.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 200,
        // pointerEvents: "none", // le container ignore les clics
      }}
    >
      <Button
        onClick={() => navigate("/printgroup")}
        icon={Printer}
        size={18}
        badge={selectedBoxes.length}
        variant="cta"
        fullWidth
      />
    </div>
  );
};

export default FloatingPrintButton;
