import { motion } from "framer-motion";

export function MobileMockup({ image, alt }: { image: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-[220px] h-[472px] rounded-[2.2rem] bg-black shadow-2xl border-2 border-black overflow-hidden"
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-10" />

      {/* Screen */}
      <img src={image} alt={alt} className="w-full h-full object-contain" />
    </motion.div>
  );
}