import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect } from "react";

type Props = {
  children: ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  // Scroll tout en haut au chargement de la page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant", // ou "smooth" selon tes préférences
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;