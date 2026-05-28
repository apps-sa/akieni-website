"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const EASE = [0.2, 0.7, 0.1, 1] as const;

export function PageTransition({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
