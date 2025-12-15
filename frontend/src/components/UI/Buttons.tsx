import type { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Loader2, Plus, Minus } from "lucide-react";
import clsx from "clsx";

type ButtonVariant =
  | "cta"
  | "cta_danger"
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "edit"
  | "outlined_accent"
  | "outlined_success"
  | "outlined_danger"
  | "sm_outlined_accent"
  | "sm_outlined_danger"
  | "delete";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  size?: number;
  icon?: LucideIcon;
  badge?: number | string;
  isSelected?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  cta: "bg-yellow-400 text-black hover:bg-yellow-500 px-3 py-2 gap-1",
  cta_danger:
    "bg-transparent text-red-400 border-1 border-red-400 hover:bg-red-500 px-3 py-2 gap-1",
  primary: "bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 gap-2",
  secondary: "bg-gray-800 text-white hover:bg-gray-700 px-3 py-2 gap-2",
  outlined_accent:
    "bg-yellow-400 border-1 border-yellow-400 text-gray-900 rounded-lg p-2 gap-1",
  outlined_danger:
    "bg-transparent border-1 border-red-400 text-red-400 rounded-lg p-2 gap-1",
  outlined_success:
    "bg-transparent border-1 border-yellow-400 text-yellow-400 rounded-lg p-2 gap-1",
  sm_outlined_accent:
    "bg-transparent border-1 border-yellow-400 text-yellow-400 rounded-full py-1 px-2 gap-1",
  sm_outlined_danger:
    "bg-transparent border-1 border-red-400 text-red-400 rounded-full py-1 px-2 gap-1",

  danger: "bg-red-500 text-white hover:bg-red-600 px-3 py-2 gap-2",
  ghost: "bg-transparent text-gray-200 hover:bg-gray-800 px-3 py-2 gap-2",
  edit: "bg-yellow-400 text-black hover:bg-yellow-500 p-2",
  delete: "bg-transparent text-gray-200 p-2",
};

export default function Button({
  label,
  loadingLabel,
  badge,
  isSelected,
  size,
  loading = false,
  onClick,
  icon: Icon,
  variant = "primary",
  type = "button",
  disabled = false,
  fullWidth = false,
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={onClick}
      disabled={isDisabled}
      className={clsx(
        "flex items-center justify-center text-sm font-medium rounded-full transition-colors",
        variants[variant],
        fullWidth && "w-full",
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <>
          <Loader2 size={size} className="animate-spin" />
          <span>{loadingLabel ?? label}</span>
        </>
      ) : (
        <>
          {isSelected === true ? (
            <Minus size={size} />
          ) : isSelected === false ? (
            <Plus size={size} />
          ) : null}
          {Icon && <Icon size={size} />}

          <span>{label}</span>

          {badge !== undefined && (
            <span className="rounded-full bg-black/20 h-5 w-5 font-semibold">
              {badge}
            </span>
          )}
        </>
      )}
    </motion.button>
  );
}
