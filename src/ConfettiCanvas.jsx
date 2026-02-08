import { useEffect, useRef } from "react";

export default function ConfettiCanvas({ onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#ff5f9e",
      "#ff85b3",
      "#ffd1dc",
      "#ff4d88",
      "#ffc0cb",
    ];

    const gravity = 0.45;
    const baseCount = window.innerWidth < 480 ? 45 : 70;

    let particles = [];
    let wind = 0;
    let windTarget = 0;

    const createBurst = (x, y) => {
      for (let i = 0; i < baseCount; i++) {
        particles.push({
          x,
          y,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.random() * 12 - 6,
          vy: Math.random() * -16 - 6,
          rotation: Math.random() * 360,
          vr: Math.random() * 10 - 5,
          wobble: Math.random() * 10,
          wobbleSpeed: Math.random() * 0.15 + 0.05,
        });
      }
    };

    // 🎆 MULTI-BURST SEQUENCE
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    createBurst(centerX, centerY);

    setTimeout(() => createBurst(centerX - 120, centerY + 40), 250);
    setTimeout(() => createBurst(centerX + 120, centerY + 40), 500);

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 💨 WIND TURBULENCE
      windTarget += (Math.random() - 0.5) * 0.1;
      wind += (windTarget - wind) * 0.02;

      particles.forEach((p, index) => {
        p.vy += gravity;
        p.vx += wind * 0.02;

        p.x += p.vx + Math.sin(p.wobble) * 0.6;
        p.y += p.vy;
        p.rotation += p.vr;
        p.wobble += p.wobbleSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(
          -p.size / 2,
          -p.size / 2,
          p.size,
          p.size
        );
        ctx.restore();

        // Remove off-screen particles
        if (p.y > canvas.height + 50) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      onDone();
    }, 1600);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
