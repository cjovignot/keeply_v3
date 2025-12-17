import { motion } from "framer-motion";

export function MobileMockup({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        relative
        w-[220px] h-[472px]
        rounded-[2.2rem]
        bg-black
        shadow-2xl
        border-2 border-black
        overflow-hidden
      "
    >
      {/* Status bar */}
      <div className="absolute top-0 left-0 w-full h-8 px-3 flex items-center justify-between text-[10px] text-white z-20">
        {/* Heure */}
        <span className="font-medium">9:41</span>

        {/* Icônes */}
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-30" />

      {/* Screen */}
      <div className="w-full h-full pt-8">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
}