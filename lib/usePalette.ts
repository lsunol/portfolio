"use client";

import { useEffect, useState } from "react";

const getInitialPalette = () => {
  if (typeof window === "undefined") return "tech-cold";
  const params = new URLSearchParams(window.location.search);
  return params.get("palette") || "tech-cold";
};

export function usePalette() {
  const [palette] = useState<string>(getInitialPalette);

  useEffect(() => {
    if (typeof document === "undefined") return;

    console.log("🎨 usePalette - Active palette:", palette);
    console.log("🎨 usePalette - Current HTML element:", document.documentElement);

    if (palette === "indigo-salmon") {
      document.documentElement.setAttribute("data-palette", "indigo-salmon");
      console.log("🎨 Applied indigo-salmon palette");
    } else if (palette === "neutro-elegante") {
      document.documentElement.setAttribute("data-palette", "neutro-elegante");
      console.log("🎨 Applied neutro-elegante palette");
    } else {
      document.documentElement.removeAttribute("data-palette");
      console.log("🎨 Applied tech-cold palette");
    }

    console.log(
      "🎨 HTML data-palette:",
      document.documentElement.getAttribute("data-palette")
    );
    console.log(
      "🎨 Computed style bg-primary:",
      getComputedStyle(document.documentElement).getPropertyValue("--app-bg-primary")
    );
  }, [palette]);

  return palette;
}
