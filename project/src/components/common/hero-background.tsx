import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div
     

 className="absolute inset-0 w-full overflow-hidden pointer-events-none select-none"
  aria-hidden="true"
>
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <motion.div
       animate={{
 y: [0, -30, 0],
}}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
       className="absolute -top-32 -left-32 h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96 rounded-full bg-primary-300/20 blur-3xl"
      />

      <motion.div
       animate={{
 y: [0, 40, 0],
}}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
       className="absolute top-1/3 -right-20 h-64 w-64 sm:h-72 sm:w-72 lg:-right-24 lg:h-80 lg:w-80 rounded-full bg-accent-300/20 blur-3xl"
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