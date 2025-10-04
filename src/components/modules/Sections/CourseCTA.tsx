// CourseCTA.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/CourseCTA.module.css'; // O CSS foi renomeado
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Interface para as partículas do rastro do mouse
interface TrailParticle {
  id: number; // Usaremos o timestamp para um ID único
  x: number;
  y: number;
}

const CourseCTA: React.FC = () => {
  // REMOVIDO: checkedOptions e related state/logic, pois não é mais uma pesquisa.

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const lastParticleTimeRef = useRef(0);
  const particleTimeoutRefs = useRef<Record<number, NodeJS.Timeout>>({});

  // Ref para o elemento do cartão para calcular a posição do mouse relativa
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values para a posição do mouse relativa (usado para a rotação do card)
  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);

  // Mapeia a posição do mouse para rotação nos eixos X e Y do card
  const rotateX = useTransform(cardMouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(cardMouseX, [-100, 100], [-8, 8]);

  // Usa useSpring para suavizar as transições de rotação do card
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 10, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 10, mass: 0.5 });

  // Lógica para o rastro de partículas do mouse em todo o documento (Mantida)
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const currentTime = Date.now();
      if (currentTime - lastParticleTimeRef.current > 50) {
        const newParticle: TrailParticle = {
          id: currentTime,
          x: e.clientX,
          y: e.clientY,
        };

        setTrailParticles((prevParticles) => {
          const updatedParticles = [...prevParticles, newParticle];
          if (updatedParticles.length > 20) {
            return updatedParticles.slice(updatedParticles.length - 20);
          }
          return updatedParticles;
        });

        particleTimeoutRefs.current[newParticle.id] = setTimeout(() => {
          setTrailParticles((prevParticles) =>
            prevParticles.filter((p) => p.id !== newParticle.id)
          );
          delete particleTimeoutRefs.current[newParticle.id];
        }, 600);

        lastParticleTimeRef.current = currentTime;
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      Object.values(particleTimeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  // Lógica para rotação do card ao mover o mouse (Mantida)
  const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { clientX, clientY } = event;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const relativeX = clientX - (left + width / 2);
    const relativeY = clientY - (top + height / 2);

    cardMouseX.set(relativeX);
    cardMouseY.set(relativeY);
  };

  // Lógica para resetar a rotação do card ao sair o mouse (Mantida)
  const handleCardMouseLeave = () => {
    cardMouseX.set(0);
    cardMouseY.set(0);
  };

  return (
    <div className={styles.container}>
      {/* Container para os efeitos de fundo animados (Mantido) */}
      <div className={styles.backgroundEffects}>
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
      </div>

      {/* Orbes de rastro do mouse (Mantido) */}
      <AnimatePresence>
        {trailParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className={styles.trailParticle}
            initial={{ opacity: 0, scale: 0.5, x: particle.x, y: particle.y }}
            animate={{ opacity: 1, scale: 1, x: particle.x, y: particle.y }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              left: particle.x,
              top: particle.y,
              transform: "translate(-50%, -50%)",
              position: "fixed",
              pointerEvents: "none",
              zIndex: 9999,
            }}
          />
        ))}
      </AnimatePresence>

      <h1 className={styles.mainTitle}>
        TRANSFORME-SE NA SUA <span className={styles.highlight}>MELHOR VERSÃO</span>
      </h1>
      <p className={styles.subtitle}>
        Cansado de ficar no vacuo? De não ser respondido? De não ter uma mulher ao seu lado?
      </p>

      {/* Card animado com Framer Motion (conteúdo alterado para CTA) */}
      <motion.div
        ref={cardRef}
        className={styles.card}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          perspective: "1000px",
          rotateX: springRotateX,
          rotateY: springRotateY,
          scale: 1
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 30px rgba(229, 57, 53, 0.8), 0 0 15px rgba(0, 0, 0, 0.7)",
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 10,
            mass: 0.5
          }
        }}
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
      >
        <p className={styles.ctaText}>
          Sua jornada para a maestria masculina e uma vida de conquistas começa agora.
        </p>
        <Link href={"https://pay.kiwify.com.br/9bKruhs"} className={styles.ctaButton}>        <button className={styles.ctaButton}>
          GARANTA SEU ACESSO E MUDE SUA VIDA!
        </button></Link>

      </motion.div>
    </div>
  );
};

export default CourseCTA;