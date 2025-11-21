"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  connections: number[];
}

interface Impulse {
  startNode: number;
  endNode: number;
  progress: number;
  speed: number;
}

interface NeuralNetworkProps {
  nodeCount?: number;
  connectionDistance?: number;
  impulseColor?: {
    glow: string;
    core: string;
  };
  nodeColor?: {
    main: string;
    glow: string;
  };
  lineColor?: string;
  impulseSpeed?: [number, number];
  maxConcurrentImpulses?: number;
  impulseSpawnRate?: number;
  minHeight?: string;
  className?: string;
}

export function NeuralNetwork({
  nodeCount = 20,
  connectionDistance = 200,
  impulseColor = {
    glow: "var(--neural-impulse-glow, rgba(59, 130, 246, 0.8))",
    core: "var(--neural-impulse-core, rgba(147, 197, 253, 0.9))",
  },
  nodeColor = {
    main: "var(--app-neural-node, rgba(15, 23, 42, 0.6))",
    glow: "var(--app-neural-glow, rgba(100, 116, 139, 0.15))",
  },
  lineColor = "rgba(100, 116, 139, 0.2)",
  impulseSpeed = [0.015, 0.035],
  maxConcurrentImpulses = 3,
  impulseSpawnRate = 0.4,
  minHeight = "200px",
  className = "w-full",
}: NeuralNetworkProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get CSS variables as actual colors
    const styles = getComputedStyle(document.documentElement);
    const getColor = (varName: string, fallback: string) => {
      const value = styles.getPropertyValue(varName).trim();
      return value || fallback;
    };

    // Resolve color variables
    const resolvedNodeMain = getColor("--app-neural-node", "rgba(15, 23, 42, 0.6)");
    const resolvedNodeGlow = getColor("--app-neural-glow", "rgba(100, 116, 139, 0.15)");
    const resolvedImpulseGlow = getColor("--neural-impulse-glow", "rgba(59, 130, 246, 0.8)");
    const resolvedImpulseCore = getColor("--neural-impulse-core", "rgba(147, 197, 253, 0.9)");

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateCanvasSize();

    // Create static nodes distributed randomly across the canvas
    const nodes: Node[] = [];
    const padding = 60;
    const minNodeDistance = 40; // Minimum distance between nodes

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Generate nodes randomly throughout the entire canvas with minimum distance
    let attempts = 0;
    const maxAttempts = nodeCount * 10;
    
    while (nodes.length < nodeCount && attempts < maxAttempts) {
      const x = padding + Math.random() * (width - padding * 2);
      const y = padding + Math.random() * (height - padding * 2);

      // Check if this position is far enough from existing nodes
      let isFarEnough = true;
      for (const node of nodes) {
        const dx = node.x - x;
        const dy = node.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minNodeDistance) {
          isFarEnough = false;
          break;
        }
      }

      if (isFarEnough) {
        nodes.push({
          x,
          y,
          connections: [],
        });
      }
      attempts++;
    }

    // Build connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          nodes[i].connections.push(j);
          nodes[j].connections.push(i);
        }
      }
    }

    // Ensure all nodes are connected (no isolated subgraphs)
    const findConnectedComponent = (nodeIndex: number, visited: Set<number>): Set<number> => {
      const component = new Set<number>();
      const queue = [nodeIndex];
      visited.add(nodeIndex);

      while (queue.length > 0) {
        const current = queue.shift()!;
        component.add(current);

        for (const neighbor of nodes[current].connections) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }

      return component;
    };

    // Find all connected components
    const visited = new Set<number>();
    const components: Set<number>[] = [];

    for (let i = 0; i < nodes.length; i++) {
      if (!visited.has(i)) {
        const component = findConnectedComponent(i, visited);
        components.push(component);
      }
    }

    // If there are multiple components, connect them
    if (components.length > 1) {
      for (let i = 0; i < components.length - 1; i++) {
        const component1 = Array.from(components[i]);
        const component2 = Array.from(components[i + 1]);

        // Find closest nodes between components
        let minDistance = Infinity;
        let node1 = component1[0];
        let node2 = component2[0];

        for (const idx1 of component1) {
          for (const idx2 of component2) {
            const dx = nodes[idx1].x - nodes[idx2].x;
            const dy = nodes[idx1].y - nodes[idx2].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance) {
              minDistance = distance;
              node1 = idx1;
              node2 = idx2;
            }
          }
        }

        // Connect the closest nodes
        if (!nodes[node1].connections.includes(node2)) {
          nodes[node1].connections.push(node2);
          nodes[node2].connections.push(node1);
        }
      }
    }

    const impulses: Impulse[] = [];
    let impulseTimer = 0;

    const createImpulse = () => {
      if (impulses.length >= maxConcurrentImpulses) return;

      const startNode = Math.floor(Math.random() * nodes.length);
      if (nodes[startNode].connections.length > 0) {
        const endNode = nodes[startNode].connections[
          Math.floor(Math.random() * nodes[startNode].connections.length)
        ];
        impulses.push({
          startNode,
          endNode,
          progress: 0,
          speed: impulseSpeed[0] + Math.random() * (impulseSpeed[1] - impulseSpeed[0]),
        });
      }
    };

    // Initial impulses
    for (let i = 0; i < Math.min(2, maxConcurrentImpulses); i++) {
      createImpulse();
    }

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          if (connectionIndex > i) {
            const target = nodes[connectionIndex];
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw impulses
      for (let i = impulses.length - 1; i >= 0; i--) {
        const impulse = impulses[i];
        const startNode = nodes[impulse.startNode];
        const endNode = nodes[impulse.endNode];

        const x = startNode.x + (endNode.x - startNode.x) * impulse.progress;
        const y = startNode.y + (endNode.y - startNode.y) * impulse.progress;

        // Impulse glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, resolvedImpulseGlow);
        gradient.addColorStop(1, resolvedImpulseGlow.replace(/[\d.]+\)$/, "0)"));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Impulse core
        ctx.fillStyle = resolvedImpulseCore;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        impulse.progress += impulse.speed;

        if (impulse.progress >= 1) {
          impulses.splice(i, 1);
        }
      }

      // Draw nodes
      ctx.fillStyle = resolvedNodeMain;
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Node glow
      nodes.forEach((node) => {
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
        glowGradient.addColorStop(0, resolvedNodeGlow);
        glowGradient.addColorStop(1, resolvedNodeGlow.replace(/[\d.]+\)$/, "0)"));

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Manage impulse spawning
      impulseTimer++;
      if (impulseTimer > 1 / impulseSpawnRate) {
        if (Math.random() > 0.5) {
          createImpulse();
        }
        impulseTimer = 0;
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    mounted,
    nodeCount,
    connectionDistance,
    impulseColor,
    nodeColor,
    lineColor,
    impulseSpeed,
    maxConcurrentImpulses,
    impulseSpawnRate,
  ]);

  if (!mounted) {
    return (
      <canvas
        className={className}
        style={{
          background: "transparent",
          display: "block",
          minHeight,
          marginTop: "80px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        background: "transparent",
        display: "block",
        minHeight,
        marginTop: "80px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    />
  );
}
