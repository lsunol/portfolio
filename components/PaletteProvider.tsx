"use client";

import { usePalette } from "@/lib/usePalette";

export function PaletteProvider() {
  const palette = usePalette();
  console.log("🎨 PaletteProvider mounted with palette:", palette);
  return null;
}
