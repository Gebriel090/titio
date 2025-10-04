'use client'
import React, { useRef, useEffect, useCallback } from 'react';

// Definindo as interfaces para tipagem
interface Velocity {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseColor: string; // Cor base sem a opacidade
  velocity: Velocity;
  alpha: number; // Opacidade atual (0 a 1)
  fadeDirection: number; // 1 para aparecer, -1 para desaparecer
  fadeSpeed: number; // Velocidade da transição de opacidade
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => void;
}

// Classe que representa uma única partícula
class ParticleImpl implements Particle {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public baseColor: string, // Ex: '255, 0, 0' para vermelho
    public velocity: Velocity,
    public alpha: number,
    public fadeDirection: number,
    public fadeSpeed: number
  ) {}

  // Método para desenhar a partícula no canvas
  draw(ctx: CanvasRenderingContext2D) {
    const currentColor = `rgba(${this.baseColor}, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = currentColor;
    ctx.shadowColor = currentColor; // O brilho usa a cor com a opacidade atual
    ctx.shadowBlur = this.radius * 4; // Intensidade do brilho (multiplicador maior para mais glow)
    ctx.fill();
  }

  // Método para atualizar a posição da partícula e lidar com as bordas e opacidade
  update(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
    // Atualiza a posição
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Atualiza a opacidade
    this.alpha += this.fadeDirection * this.fadeSpeed;

    // Lida com as bordas da tela: reaparece do lado oposto
    if (this.x - this.radius > canvasWidth) {
      this.x = -this.radius;
    } else if (this.x + this.radius < 0) {
      this.x = canvasWidth + this.radius;
    }

    if (this.y - this.radius > canvasHeight) {
      this.y = -this.radius;
    } else if (this.y + this.radius < 0) {
      this.y = canvasHeight + this.radius;
    }

    // Lógica de fade in/out e reposicionamento
    if (this.alpha <= 0.05) { // Quase invisível
      this.fadeDirection = 1; // Começa a aparecer
      this.alpha = 0.05; // Garante que não fique completamente 0
      // Reposiciona a partícula aleatoriamente para simular que "apareceu em outro lugar"
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
    } else if (this.alpha >= 0.8) { // Quase totalmente visível (não 1.0 para manter um pouco de transparência)
      this.fadeDirection = -1; // Começa a desaparecer
      this.alpha = 0.8; // Garante que não ultrapasse o limite
    }

    this.draw(ctx);
  }
}

// Componente React para o fundo de partículas
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const numberOfParticles = 70; // Reduzido para 70 partículas para um efeito mais sutil e natural

  // Função para inicializar as partículas
  const initParticles = useCallback((canvasWidth: number, canvasHeight: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < numberOfParticles; i++) {
      const radius = Math.random() * 2 + 1; // Raio entre 1 e 3
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      const baseColor = '255, 0, 0'; // Vermelho (RGB)
      const velocity = {
        x: (Math.random() - 0.5) * 0.8, // Velocidade horizontal mais variada (entre -0.4 e 0.4)
        y: (Math.random() - 0.5) * 0.8,  // Velocidade vertical mais variada (entre -0.4 e 0.4)
      };
      const alpha = Math.random() * 0.7 + 0.1; // Alpha inicial variando de 0.1 a 0.8
      const fadeDirection = Math.random() > 0.5 ? 1 : -1; // Começa aparecendo ou desaparecendo
      const fadeSpeed = Math.random() * 0.005 + 0.001; // Velocidade de fade lenta e variada

      newParticles.push(new ParticleImpl(x, y, radius, baseColor, velocity, alpha, fadeDirection, fadeSpeed));
    }
    particlesRef.current = newParticles;
  }, []);

  // Loop de animação
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      animationFrameId.current = null;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    particlesRef.current.forEach(particle => {
      particle.update(ctx, canvas.width, canvas.height);
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  // useEffect para configuração inicial e início/parada da animação
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    setupCanvas();
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [initParticles, animate]);

  // useEffect para lidar com o redimensionamento da janela
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: '#000',
        display: 'block',
      }}
    />
  );
};

export default ParticleBackground;