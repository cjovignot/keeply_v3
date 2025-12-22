import { motion } from "framer-motion";
import { useCloudinaryImage } from "../hooks/useCloudinaryImage";
import { Trash } from "lucide-react";
import Button from "./UI/Buttons";
import { usePrint } from "../hooks/usePrint";
import clsx from "clsx";

type Props = {
  box: any;
  onClick: () => void;
  onDelete: () => void;
  getStorageName: (id: string) => string;
};

export default function BoxItem({
  box,
  onClick,
  onDelete,
  getStorageName,
}: Props) {
  const { src: qrOptimized } = useCloudinaryImage(box.qrcodeURL, { w: 150 });
  const { selectedBoxes, isSelecting } = usePrint();

  const isSelected = selectedBoxes.includes(box._id);

  return (
    <motion.div
      className={clsx(
        "relative flex flex-col p-4 transition-colors border cursor-pointer rounded-xl",

        // 🟦 1 — sélectionnée
        isSelected &&
          "bg-yellow-600/20 border-yellow-500 hover:bg-yellow-600/30",

        // 🟨 2 — mode sélection mais non sélectionnée
        !isSelected &&
          isSelecting &&
          "bg-gray-700 border-gray-500 hover:bg-gray-600",

        // ⚫ 3 — état normal
        !isSelecting &&
          !isSelected &&
          "bg-gray-800 border-gray-700 hover:bg-gray-700"
      )}
      whileTap={{
        scale: 0.96,
        rotate: -1,
        backgroundColor: isSelected
          ? "#b0890033" // léger flash jaune
          : "#ffffff0a", // très léger flash blanc
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-yellow-400">{box.number}</h2>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          icon={Trash}
          size={18}
          variant="delete"
        />
      </div>

      <p className="text-sm text-gray-400">
        Destination :{" "}
        <span className="font-medium text-yellow-400">{box.destination}</span>
      </p>

      <p className="text-sm text-gray-400">
        Entrepôt :{" "}
        <span className="font-medium text-yellow-400">
          {getStorageName(box.storageId)}
        </span>
      </p>

      <p className="text-sm text-gray-400">
        Objets :{" "}
        <span className="font-medium text-yellow-400">
          {box.content.length}
        </span>
      </p>

      <p className="text-sm text-gray-400">
        Dimensions :{" "}
        <span className="font-medium text-yellow-400">
          {box.dimensions.width}×{box.dimensions.height}×{box.dimensions.depth}{" "}
          cm
        </span>
      </p>

      {box.qrcodeURL && (
        <img
          src={qrOptimized}
          alt="QR Code"
          loading="lazy"
          className="absolute object-contain w-16 h-16 p-1 transition-opacity border border-gray-600 rounded-md bottom-2 right-2 opacity-80 hover:opacity-100 bg-gray-900/40"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </motion.div>
  );
}
