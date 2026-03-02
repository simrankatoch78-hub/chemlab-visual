import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ReactionAnimationProps {
  visualEffect: string;
  isActive: boolean;
  liquidColor?: string;
}

const EFFECT_CONFIGS: Record<string, {
  particleColor: string[];
  particleCount: number;
  liquidColor: string;
  glowColor: string;
  label: string;
}> = {
  bubbles: {
    particleColor: ['#22d3ee', '#67e8f9', '#a5f3fc'],
    particleCount: 20,
    liquidColor: '#0e7490',
    glowColor: '#22d3ee',
    label: 'Bubbling',
  },
  color_change: {
    particleColor: ['#a78bfa', '#c4b5fd', '#7c3aed'],
    particleCount: 15,
    liquidColor: '#7c3aed',
    glowColor: '#a78bfa',
    label: 'Color Change',
  },
  precipitate: {
    particleColor: ['#fbbf24', '#fde68a', '#f59e0b'],
    particleCount: 25,
    liquidColor: '#92400e',
    glowColor: '#fbbf24',
    label: 'Precipitate',
  },
  fire: {
    particleColor: ['#f97316', '#ef4444', '#fbbf24', '#fed7aa'],
    particleCount: 30,
    liquidColor: '#7c2d12',
    glowColor: '#f97316',
    label: 'Fire/Flame',
  },
  foam: {
    particleColor: ['#86efac', '#bbf7d0', '#4ade80'],
    particleCount: 35,
    liquidColor: '#166534',
    glowColor: '#86efac',
    label: 'Foam',
  },
  gas: {
    particleColor: ['#94a3b8', '#cbd5e1', '#e2e8f0'],
    particleCount: 20,
    liquidColor: '#334155',
    glowColor: '#94a3b8',
    label: 'Gas Release',
  },
  steam: {
    particleColor: ['#e2e8f0', '#f8fafc', '#cbd5e1'],
    particleCount: 18,
    liquidColor: '#1e3a5f',
    glowColor: '#e2e8f0',
    label: 'Steam',
  },
};

export default function ReactionAnimation({ visualEffect, isActive }: ReactionAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const [liquidLevel, setLiquidLevel] = useState(0.35);

  const config = EFFECT_CONFIGS[visualEffect] ?? EFFECT_CONFIGS['gas'];

  useEffect(() => {
    if (isActive) {
      setLiquidLevel(0.55);
    } else {
      setLiquidLevel(0.35);
      particlesRef.current = [];
    }
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    const spawnParticle = () => {
      if (!isActive) return;
      const colors = config.particleColor;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isFireEffect = visualEffect === 'fire';
      const isFoamEffect = visualEffect === 'foam';
      const isBubbleEffect = visualEffect === 'bubbles' || visualEffect === 'gas' || visualEffect === 'steam';

      particlesRef.current.push({
        id: Math.random(),
        x: W * 0.2 + Math.random() * W * 0.6,
        y: H * (1 - liquidLevel) + Math.random() * H * liquidLevel * 0.5,
        vx: (Math.random() - 0.5) * (isFireEffect ? 2 : 1),
        vy: isFireEffect ? -(Math.random() * 3 + 1) : isBubbleEffect ? -(Math.random() * 2 + 0.5) : isFoamEffect ? -(Math.random() * 1.5 + 0.3) : -(Math.random() * 1 + 0.2),
        size: isFireEffect ? Math.random() * 8 + 4 : isFoamEffect ? Math.random() * 10 + 5 : Math.random() * 5 + 2,
        opacity: 0.8 + Math.random() * 0.2,
        color,
        life: 0,
        maxLife: isFireEffect ? 40 + Math.random() * 30 : 60 + Math.random() * 40,
      });
    };

    let frameCount = 0;
    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw beaker glass
      const beakerX = W * 0.15;
      const beakerW = W * 0.7;
      const beakerTop = H * 0.08;
      const beakerBottom = H * 0.92;
      const beakerBottomW = beakerW * 0.85;

      // Liquid fill
      const liquidTop = H * (1 - liquidLevel);
      const liquidGrad = ctx.createLinearGradient(0, liquidTop, 0, beakerBottom);
      liquidGrad.addColorStop(0, config.liquidColor + 'cc');
      liquidGrad.addColorStop(1, config.liquidColor + 'ff');
      ctx.beginPath();
      ctx.moveTo(beakerX + (beakerW - beakerBottomW) / 2, liquidTop);
      ctx.lineTo(beakerX + beakerW - (beakerW - beakerBottomW) / 2, liquidTop);
      ctx.lineTo(beakerX + beakerW, beakerBottom);
      ctx.lineTo(beakerX, beakerBottom);
      ctx.closePath();
      ctx.fillStyle = liquidGrad;
      ctx.fill();

      // Liquid surface shimmer
      if (isActive) {
        const shimmerGrad = ctx.createLinearGradient(beakerX, liquidTop, beakerX + beakerW, liquidTop);
        shimmerGrad.addColorStop(0, 'transparent');
        shimmerGrad.addColorStop(0.5, config.glowColor + '44');
        shimmerGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = shimmerGrad;
        ctx.fillRect(beakerX, liquidTop - 2, beakerW, 4);
      }

      // Beaker outline
      ctx.beginPath();
      ctx.moveTo(beakerX, beakerTop);
      ctx.lineTo(beakerX, beakerBottom);
      ctx.lineTo(beakerX + beakerW, beakerBottom);
      ctx.lineTo(beakerX + beakerW, beakerTop);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Beaker spout
      ctx.beginPath();
      ctx.moveTo(beakerX - 4, beakerTop);
      ctx.lineTo(beakerX + beakerW + 4, beakerTop);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Measurement lines
      for (let i = 1; i <= 4; i++) {
        const lineY = beakerTop + (beakerBottom - beakerTop) * (i / 5);
        ctx.beginPath();
        ctx.moveTo(beakerX + beakerW - 12, lineY);
        ctx.lineTo(beakerX + beakerW - 4, lineY);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Glass reflection
      ctx.beginPath();
      ctx.moveTo(beakerX + 6, beakerTop + 10);
      ctx.lineTo(beakerX + 6, beakerBottom - 20);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Spawn particles
      if (isActive && frameCount % 3 === 0) {
        spawnParticle();
      }
      frameCount++;

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
      particlesRef.current.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.3;
        const progress = p.life / p.maxLife;
        p.opacity = (1 - progress) * 0.9;

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (visualEffect === 'bubbles' || visualEffect === 'gas') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = p.color + '22';
          ctx.fill();
        } else if (visualEffect === 'precipitate') {
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      });

      // Glow effect when active
      if (isActive) {
        const glowGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.5);
        glowGrad.addColorStop(0, 'transparent');
        glowGrad.addColorStop(0.7, 'transparent');
        glowGrad.addColorStop(1, config.glowColor + '11');
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, W, H);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isActive, visualEffect, liquidLevel, config]);

  return (
    <div className="relative flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={220}
        height={280}
        className="rounded-lg"
        style={{
          filter: isActive ? `drop-shadow(0 0 16px ${config.glowColor}66)` : 'none',
          transition: 'filter 0.5s ease',
        }}
      />
      {isActive && (
        <div
          className="mt-2 px-3 py-1 rounded-full text-xs font-mono font-semibold border"
          style={{
            color: config.glowColor,
            borderColor: config.glowColor + '44',
            backgroundColor: config.glowColor + '11',
          }}
        >
          ⚗ {config.label}
        </div>
      )}
    </div>
  );
}
