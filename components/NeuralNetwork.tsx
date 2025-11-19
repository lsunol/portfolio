"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export function NeuralNetwork() {
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

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateCanvasSize();

    // Create nodes
    const nodeCount = 15;
    const nodes: Node[] = [];
    const connectionDistance = 150;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      });
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

    // Impulses data
    interface Impulse {
      startNode: number;
      endNode: number;
      progress: number;
      speed: number;
    }
    const impulses: Impulse[] = [];

    const createImpulse = () => {
      const startNode = Math.floor(Math.random() * nodes.length);
      if (nodes[startNode].connections.length > 0) {
        const endNode = nodes[startNode].connections[
          Math.floor(Math.random() * nodes[startNode].connections.length)
        ];
        impulses.push({
          startNode,
          endNode,
          progress: 0,
          speed: 0.02 + Math.random() * 0.02,
        });
      }
    };

    // Initial impulses
    for (let i = 0; i < 3; i++) {
      createImpulse();
    }

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, width, height);

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      });

      // Draw connections
      ctx.strokeStyle = "rgba(100, 116, 139, 0.2)";
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

      // Draw impulses
      impulses.forEach((impulse, idx) => {
        const startNode = nodes[impulse.startNode];
        const endNode = nodes[impulse.endNode];

        const x = startNode.x + (endNode.x - startNode.x) * impulse.progress;
        const y = startNode.y + (endNode.y - startNode.y) * impulse.progress;

        // Impulse glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Impulse core
        ctx.fillStyle = "rgba(147, 197, 253, 0.9)";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        impulse.progress += impulse.speed;

        if (impulse.progress >= 1) {
          impulses.splice(idx, 1);
          if (Math.random() > 0.3) {
            createImpulse();
          }
        }
      });

      // Draw nodes
      ctx.fillStyle = "rgba(71, 85, 105, 0.6)";
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Node glow
      nodes.forEach((node) => {
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
        glowGradient.addColorStop(0, "rgba(100, 116, 139, 0.15)");
        glowGradient.addColorStop(1, "rgba(100, 116, 139, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();
      });

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
  }, [mounted]);

  if (!mounted) {
    return (
      <canvas
        className="w-full flex-1"
        style={{
          background: "transparent",
          display: "block",
          minHeight: "300px",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full flex-1"
      style={{
        background: "transparent",
        display: "block",
        minHeight: "300px",
      }}
    />
  );
}
