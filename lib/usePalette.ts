"use client";

import { useEffect, useState } from "react";

const getInitialPalette = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("palette") || "tech-cold";
};

export function usePalette() {
  const [palette] = useState<string>(getInitialPalette);

  useEffect(() => {
    console.log("🎨 usePalette - Query palette:", palette);
    console.log("🎨 usePalette - Current HTML element:", document.documentElement);

    // Set the data-palette attribute on the root element
    if (palette === "indigo-salmon") {
      document.documentElement.setAttribute("data-palette", "indigo-salmon");
      console.log("🎨 Applied indigo-salmon palette");
    } else {
      document.documentElement.removeAttribute("data-palette");
      console.log("🎨 Applied tech-cold palette");
    }

    // Log the current attributes
    console.log("🎨 HTML data-palette:", document.documentElement.getAttribute("data-palette"));
    console.log("🎨 Computed style bg-primary:", getComputedStyle(document.documentElement).getPropertyValue("--app-bg-primary"));
  }, [palette]);

  return palette;
}
