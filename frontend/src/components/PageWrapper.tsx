import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="
        min-h-screen
        w-full
        [padding-top:env(safe-area-inset-top)]
        [padding-bottom:env(safe-area-inset-bottom)]
        overflow-x-hidden
      "
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
