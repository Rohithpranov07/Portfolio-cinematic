"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function PageReveal() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black pointer-events-none"
      initial={{ scaleY: 1, transformOrigin: "bottom" }}
      animate={{ scaleY: 0, transformOrigin: "top" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
    />
  );
}
