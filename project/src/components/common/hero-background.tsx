import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary-300/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-accent-300/20 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-200/20 blur-3xl"
      />
    </div>
  );
}