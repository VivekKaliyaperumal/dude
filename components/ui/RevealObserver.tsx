"use client";

import { useEffect } from "react";
import { startRevealObserver } from "@/lib/reveal/observer";

/** Mount once (root layout). Drives every [data-reveal] element on the page. */
export function RevealObserver() {
  useEffect(() => startRevealObserver(), []);
  return null;
}
