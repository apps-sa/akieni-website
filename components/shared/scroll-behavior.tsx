"use client";

import { useEffect } from "react";

export function ScrollBehavior() {
  useEffect(() => {
    document.documentElement.dataset.scrollBehavior = "smooth";
  }, []);

  return null;
}
