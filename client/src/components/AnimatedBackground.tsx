import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

interface HUDElement {
  x: number;
  y: number;
  type: 'circle' | 'arc' | 'bracket';
  size: number;
  rotation: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const hudElementsRef = useRef<HUDElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
      initHUDElements();
    };

    const initNodes = () => {
      const nodeCount = 25;
      nodesRef.current = [];
      
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: []
        });
      }
    };

    const initHUDElements = () => {
      hudElementsRef.current = [
        // Corners and edges with HUD elements
        { x: 50, y: 50, type: 'bracket', size: 40, rotation: 0 },
        { x: canvas.width - 50, y: 50, type: 'bracket', size: 40, rotation: 90 },
        { x: 50, y: canvas.height - 50, type: 'bracket', size: 40, rotation: 270 },
        { x: canvas.width - 50, y: canvas.height - 50, type: 'bracket', size: 40, rotation: 180 },
        { x: canvas.width / 4, y: 80, type: 'circle', size: 30, rotation: 0 },
        { x: (canvas.width * 3) / 4, y: canvas.height - 80, type: 'arc', size: 50, rotation: 45 },
        { x: 100, y: canvas.height / 3, type: 'arc', size: 35, rotation: 90 },
        { x: canvas.width - 100, y: (canvas.height * 2) / 3, type: 'circle', size: 25, rotation: 0 }
      ];
    };

    const drawNode = (node: Node, isHighlighted = false) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, isHighlighted ? 4 : 2, 0, Math.PI * 2);
      ctx.fillStyle = isHighlighted ? '#4D9DE0' : 'rgba(77, 157, 224, 0.6)';
      ctx.fill();
      
      if (isHighlighted) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(77, 157, 224, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawConnection = (node1: Node, node2: Node) => {
      const distance = Math.sqrt((node2.x - node1.x) ** 2 + (node2.y - node1.y) ** 2);
      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(node1.x, node1.y);
        ctx.lineTo(node2.x, node2.y);
        ctx.strokeStyle = `rgba(77, 157, 224, ${0.15 * (1 - distance / 150)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawHUDElement = (element: HUDElement) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.rotate((element.rotation * Math.PI) / 180);
      ctx.strokeStyle = 'rgba(77, 157, 224, 0.3)';
      ctx.lineWidth = 2;

      switch (element.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, element.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'arc':
          ctx.beginPath();
          ctx.arc(0, 0, element.size / 2, 0, Math.PI);
          ctx.stroke();
          break;
        case 'bracket':
          ctx.beginPath();
          ctx.moveTo(-element.size / 2, -element.size / 2);
          ctx.lineTo(-element.size / 2, -element.size / 4);
          ctx.moveTo(-element.size / 2, -element.size / 2);
          ctx.lineTo(-element.size / 4, -element.size / 2);
          ctx.moveTo(element.size / 2, -element.size / 2);
          ctx.lineTo(element.size / 4, -element.size / 2);
          ctx.moveTo(element.size / 2, -element.size / 2);
          ctx.lineTo(element.size / 2, -element.size / 4);
          ctx.stroke();
          break;
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodesRef.current.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep nodes within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw connections
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          drawConnection(node, nodesRef.current[j]);
        }
      });

      // Draw nodes
      nodesRef.current.forEach((node, i) => {
        const isHighlighted = Math.sin(Date.now() * 0.003 + i) > 0.7;
        drawNode(node, isHighlighted);
      });

      // Draw HUD elements
      hudElementsRef.current.forEach(drawHUDElement);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)'
      }}
    />
  );
}