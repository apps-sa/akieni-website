"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

const EASE = [0.2, 0.7, 0.1, 1] as const; // matches --ease-akieni

/**
 * Fade + rise into view on scroll. Wraps children in a motion element that
 * animates once when it enters the viewport. Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  className,
  ...rest
}: Readonly<
  {
    children: ReactNode;
    as?: ElementType;
    delay?: number;
    y?: number;
    className?: string;
  } & HTMLMotionProps<"div">
>) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return (
      <Tag className={className}>{children}</Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered container: children wrapped in <RevealItem> animate in sequence
 * as the group scrolls into view.
 */
export function RevealGroup({
  children,
  as = "div",
  stagger = 0.08,
  className,
  ...rest
}: Readonly<
  {
    children: ReactNode;
    as?: ElementType;
    stagger?: number;
    className?: string;
  } & HTMLMotionProps<"div">
>) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"] ?? motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Child of <RevealGroup>. */
export function RevealItem({
  children,
  as = "div",
  y = 24,
  className,
  ...rest
}: Readonly<
  {
    children: ReactNode;
    as?: ElementType;
    y?: number;
    className?: string;
  } & HTMLMotionProps<"div">
>) {
  const MotionTag = motion[as as "div"] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Card with a subtle lift on hover. Reveals into view first, then responds to
 * hover. Reduced motion: renders a static element.
 */
export function MotionCard({
  children,
  className,
  lift = -4,
  ...rest
}: Readonly<
  {
    children: ReactNode;
    className?: string;
    lift?: number;
  } & HTMLMotionProps<"div">
>) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...(rest as object)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE }}
      whileHover={{ y: lift, transition: { duration: 0.32, ease: EASE } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
