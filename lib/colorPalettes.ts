export interface ColorPalette {
  name: string;
  description: string;
  background: {
    primary: string;
    secondary: string;
  };
  surfaces: {
    main: string;
    secondary: string;
    accent: string;
  };
  shadows: {
    dark: string;
    light: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  buttons: {
    bg: string;
    bgHover: string;
    text: string;
  };
  accent: {
    primary: string;
    light: string;
  };
  neural: {
    nodeMain: string;
    nodeGlow: string;
    lineColor: string;
    impulseGlow: string;
    impulseCore: string;
  };
}

export const colorPalettes = {
  techCold: {
    name: "Tech Fría",
    description: "Azules suaves y profesionales",
    background: {
      primary: "#E8EDF5",
      secondary: "#F4F7FC",
    },
    surfaces: {
      main: "#F4F7FC",
      secondary: "#D6DEEE",
      accent: "#CBD5F5",
    },
    shadows: {
      dark: "rgba(15, 23, 42, 0.15)",
      light: "rgba(255, 255, 255, 0.9)",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
    buttons: {
      bg: "#0F172A",
      bgHover: "#111827",
      text: "#FFFFFF",
    },
    accent: {
      primary: "#CBD5F5",
      light: "#E0E7FF",
    },
    neural: {
      nodeMain: "rgba(15, 23, 42, 0.6)",
      nodeGlow: "rgba(100, 116, 139, 0.15)",
      lineColor: "rgba(100, 116, 139, 0.2)",
      impulseGlow: "rgba(59, 130, 246, 0.8)",
      impulseCore: "rgba(147, 197, 253, 0.9)",
    },
  } as ColorPalette,

  oceanDeep: {
    name: "Océano Profundo",
    description: "Azules y teales oscuros con acentos dorados",
    background: {
      primary: "#0F172A",
      secondary: "#1A1F3A",
    },
    surfaces: {
      main: "#172554",
      secondary: "#1E3A5F",
      accent: "#0EA5E9",
    },
    shadows: {
      dark: "rgba(0, 0, 0, 0.3)",
      light: "rgba(255, 255, 255, 0.1)",
    },
    text: {
      primary: "#F1F5F9",
      secondary: "#CBD5E1",
    },
    buttons: {
      bg: "#0EA5E9",
      bgHover: "#0284C7",
      text: "#FFFFFF",
    },
    accent: {
      primary: "#F59E0B",
      light: "#FBBF24",
    },
    neural: {
      nodeMain: "rgba(14, 165, 233, 0.6)",
      nodeGlow: "rgba(14, 165, 233, 0.15)",
      lineColor: "rgba(14, 165, 233, 0.2)",
      impulseGlow: "rgba(34, 197, 94, 0.8)",
      impulseCore: "rgba(74, 222, 128, 0.9)",
    },
  } as ColorPalette,

  neonVibrant: {
    name: "Neón Vibrante",
    description: "Oscuro con acentos neón brillantes",
    background: {
      primary: "#0D0221",
      secondary: "#16213E",
    },
    surfaces: {
      main: "#1C2C5C",
      secondary: "#2A3E7F",
      accent: "#FF006E",
    },
    shadows: {
      dark: "rgba(0, 0, 0, 0.5)",
      light: "rgba(255, 0, 110, 0.1)",
    },
    text: {
      primary: "#F9F9F9",
      secondary: "#C0C0C0",
    },
    buttons: {
      bg: "#FF006E",
      bgHover: "#E80060",
      text: "#FFFFFF",
    },
    accent: {
      primary: "#00D9FF",
      light: "#00F0FF",
    },
    neural: {
      nodeMain: "rgba(255, 0, 110, 0.6)",
      nodeGlow: "rgba(255, 0, 110, 0.15)",
      lineColor: "rgba(0, 217, 255, 0.2)",
      impulseGlow: "rgba(0, 217, 255, 0.8)",
      impulseCore: "rgba(0, 240, 255, 0.9)",
    },
  } as ColorPalette,

  minimalistLight: {
    name: "Minimalista Claro",
    description: "Blanco y grises con acentos negros",
    background: {
      primary: "#FAFAFA",
      secondary: "#FFFFFF",
    },
    surfaces: {
      main: "#FFFFFF",
      secondary: "#F5F5F5",
      accent: "#E5E5E5",
    },
    shadows: {
      dark: "rgba(0, 0, 0, 0.08)",
      light: "rgba(255, 255, 255, 1)",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#666666",
    },
    buttons: {
      bg: "#1A1A1A",
      bgHover: "#000000",
      text: "#FFFFFF",
    },
    accent: {
      primary: "#3B82F6",
      light: "#BFDBFE",
    },
    neural: {
      nodeMain: "rgba(26, 26, 26, 0.6)",
      nodeGlow: "rgba(26, 26, 26, 0.15)",
      lineColor: "rgba(100, 100, 100, 0.2)",
      impulseGlow: "rgba(59, 130, 246, 0.8)",
      impulseCore: "rgba(147, 197, 253, 0.9)",
    },
  } as ColorPalette,

  purpleGrad: {
    name: "Púrpura Gradiente",
    description: "Púrpuras suaves con toques de magenta",
    background: {
      primary: "#F3E8FF",
      secondary: "#FAF5FF",
    },
    surfaces: {
      main: "#F5F3FF",
      secondary: "#EDE9FE",
      accent: "#E9D5FF",
    },
    shadows: {
      dark: "rgba(88, 28, 135, 0.12)",
      light: "rgba(255, 255, 255, 0.95)",
    },
    text: {
      primary: "#581C87",
      secondary: "#9333EA",
    },
    buttons: {
      bg: "#581C87",
      bgHover: "#6B21A8",
      text: "#FFFFFF",
    },
    accent: {
      primary: "#D946EF",
      light: "#F0ABFC",
    },
    neural: {
      nodeMain: "rgba(88, 28, 135, 0.6)",
      nodeGlow: "rgba(217, 70, 239, 0.15)",
      lineColor: "rgba(147, 51, 234, 0.2)",
      impulseGlow: "rgba(217, 70, 239, 0.8)",
      impulseCore: "rgba(232, 121, 249, 0.9)",
    },
  } as ColorPalette,
};

// Paleta activa (cambia esta línea para probar diferentes paletas)
export const activePalette = colorPalettes.techCold;

export type PaletteKey = keyof typeof colorPalettes;
