"use client";

import { useEffect, useState } from "react";

export function usePalette() {
  const [palette, setPalette] = useState<string>("tech-cold");

  useEffect(() => {
    // Get palette from URL query string, only in client
    const params = new URLSearchParams(window.location.search);
    const queryPalette = params.get("palette") || "tech-cold";
    
    setPalette(queryPalette);
    console.log("🎨 usePalette - Query palette:", queryPalette);
    console.log("🎨 usePalette - Current HTML element:", document.documentElement);

    // Set the data-palette attribute on the root element
    if (queryPalette === "indigo-salmon") {
      document.documentElement.setAttribute("data-palette", "indigo-salmon");
      console.log("🎨 Applied indigo-salmon palette");
    } else if (queryPalette === "neutro-elegante") {
      document.documentElement.setAttribute("data-palette", "neutro-elegante");
      console.log("🎨 Applied neutro-elegante palette");
    } else {
      document.documentElement.removeAttribute("data-palette");
      console.log("🎨 Applied tech-cold palette");
    }

    // Log the current attributes
    console.log("🎨 HTML data-palette:", document.documentElement.getAttribute("data-palette"));
    console.log("🎨 Computed style bg-primary:", getComputedStyle(document.documentElement).getPropertyValue("--app-bg-primary"));
  }, []);

  return palette;
}
