import { motion } from "framer-motion";

export function MobileMockup({ image, alt }: { image: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-[220px] h-[472px] shadow-2xl overflow-hidden"
    >
      {/* Screen */}
      <img src={image} alt={alt} className="w-full h-full object-contain" />
    </motion.div>
  );
}
