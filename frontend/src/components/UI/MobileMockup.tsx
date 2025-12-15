import { motion } from "framer-motion";

export function MobileMockup({ image, alt }: { image: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative w-[220px] h-[450px] rounded-[2.2rem] bg-black shadow-2xl border border-gray-800 overflow-hidden"
    >
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-10" />

      {/* Screen */}
      <img src={image} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}
