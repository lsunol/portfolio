"use client";

import { useEffect, useId } from "react";

declare global {
  interface Window {
    particlesJS?: (tagId: string, config: object) => void;
    pJSDom?: Array<{ destroy: () => void; pJS?: { canvas?: { el?: HTMLElement | null } } }>;
  }
}

type NeuralNetworkProps = {
  className?: string;
};

const particleConfig = {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#94a3b8" },
    shape: { type: "circle" },
    opacity: { value: 0.45, random: false, anim: { enable: false } },
    size: { value: 3, random: true, anim: { enable: false } },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#cbd5f5",
      opacity: 0.35,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
};

export function NeuralNetwork({ className = "absolute inset-0 -z-10" }: NeuralNetworkProps) {
  const reactId = useId();
  const domId = `particles-${reactId.replace(/[^a-zA-Z0-9-_]/g, "")}`;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Dynamically import particles.js only on client
    import("particles.js").then(() => {
      if (!window.particlesJS) {
        return;
      }

      window.particlesJS(domId, particleConfig);

      return () => {
        window.pJSDom?.forEach((instance) => {
          if (instance.pJS?.canvas?.el?.id === domId) {
            instance.destroy();
          }
        });
      };
    });
  }, [domId]);

  return (
    <div
      id={domId}
      className={`${className} pointer-events-none opacity-90`}
      aria-hidden="true"
    />
  );
}
