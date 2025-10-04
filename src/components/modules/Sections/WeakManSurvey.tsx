'use client'

// WeakManSurvey.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/WeakManSurvey.module.css';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// Interface para definir a estrutura de cada opção de checkbox
interface CheckboxOption {
  id: string;
  label: string;
}

// Interface para as partículas do rastro do mouse
interface TrailParticle {
  id: number; // Usaremos o timestamp para um ID único
  x: number;
  y: number;
}

const WeakManSurvey: React.FC = () => {
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // Mantido para o card, se necessário
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]); // Novo estado para as partículas do rastro
  const lastParticleTimeRef = useRef(0); // Para limitar a criação de partículas (throttle)
  const particleTimeoutRefs = useRef<Record<number, NodeJS.Timeout>>({}); // Para limpar os timeouts das partículas

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

  // Lógica para o rastro de partículas do mouse em todo o documento
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY }); // Atualiza a posição principal do mouse

      const currentTime = Date.now();
      // Limita a criação de partículas para evitar sobrecarga (e.g., uma a cada 50ms)
      if (currentTime - lastParticleTimeRef.current > 50) {
        const newParticle: TrailParticle = {
          id: currentTime, // ID único baseado no tempo
          x: e.clientX,
          y: e.clientY,
        };

        setTrailParticles((prevParticles) => {
          // Adiciona a nova partícula e limita o número total de partículas visíveis
          const updatedParticles = [...prevParticles, newParticle];
          // Mantém apenas as últimas 20 partículas para desempenho
          if (updatedParticles.length > 20) {
            return updatedParticles.slice(updatedParticles.length - 20);
          }
          return updatedParticles;
        });

        // Define um timeout para remover a partícula após um tempo (ex: 600ms)
        particleTimeoutRefs.current[newParticle.id] = setTimeout(() => {
          setTrailParticles((prevParticles) =>
            prevParticles.filter((p) => p.id !== newParticle.id)
          );
          delete particleTimeoutRefs.current[newParticle.id]; // Remove a referência do timeout
        }, 600); // A partícula desaparecerá após 600ms

        lastParticleTimeRef.current = currentTime; // Atualiza o último tempo de criação de partícula
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      // Limpa todos os timeouts pendentes ao desmontar o componente para evitar vazamentos de memória
      Object.values(particleTimeoutRefs.current).forEach(clearTimeout);
    };
  }, []); // Efeito roda uma vez no montagem e limpa na desmontagem


  const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { clientX, clientY } = event;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    // Calcula a posição do mouse relativa ao centro do card
    const relativeX = clientX - (left + width / 2);
    const relativeY = clientY - (top + height / 2);

    cardMouseX.set(relativeX);
    cardMouseY.set(relativeY);
  };

  const handleCardMouseLeave = () => {
    // Reseta as rotações do card ao sair
    cardMouseX.set(0);
    cardMouseY.set(0);
  };

  const options: CheckboxOption[] = [
    {
      id: 'impulseControl',
      label: 'Você sente que não tem controle sobre seus impulsos e acaba sempre cedendo a vícios como pornografia, redes sociais e jogos?',
    },
    {
      id: 'invisibleToWomen',
      label: 'Você se sente invisível para as mulheres, é rejeitado ou travado na hora de agir?',
    },
    {
      id: 'mediocreHabits',
      label: 'Você já tentou mudar sua vida várias vezes, mas sempre volta para os mesmos hábitos medíocres?',
    },
    {
      id: 'lowSelfEsteem',
      label: 'Sua autoestima está destruída e ninguém te leva a sério?',
    },
    {
      id: 'desireRespect',
      label: 'Você quer ser respeitado como homem, ter disciplina, força e um propósito claro?',
    },
  ];

  const handleCheckboxChange = (id: string) => {
    setCheckedOptions((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((item) => item !== id)
        : [...prevChecked, id]
    );
  };

  return (
    <div className={styles.container}>
      {/* Container para os efeitos de fundo animados */}
      <div className={styles.backgroundEffects}>
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
        <div className={styles.orb} />
      </div>

      {/* Orbes de rastro do mouse */}
      <AnimatePresence>
        {trailParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className={styles.trailParticle} // Nova classe para as partículas de rastro
            initial={{ opacity: 0, scale: 0.5, x: particle.x, y: particle.y }} // Começa menor e invisível
            animate={{ opacity: 1, scale: 1, x: particle.x, y: particle.y }} // Cresce e aparece
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }} // Diminui e desaparece
            transition={{ duration: 0.2, ease: "easeOut" }} // Transição rápida de entrada
            style={{
              // Garante que a partícula esteja centralizada nas coordenadas do mouse
              left: particle.x,
              top: particle.y,
              transform: "translate(-50%, -50%)",
              position: "fixed", // Para seguir o mouse globalmente
              pointerEvents: "none", // Não interfere com cliques ou eventos
              zIndex: 9999, // Fica acima de tudo
            }}
          />
        ))}
      </AnimatePresence>

      <h1 className={styles.mainTitle}>VOCÊ ESTÁ SE TORNANDO UM <span className={styles.highlight}>HOMEM FRACO?</span></h1>
      <p className={styles.subtitle}>
        Se você quer uma ou mais alternativas da checkbox diárias, e quer acordar antes que seja tarde - esta comunidade foi feita para você.
      </p>

      {/* Card animado com Framer Motion (lógica inalterada) */}
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
        <p className={styles.instruction}>Clique nas opções para marcar</p>
        <div className={styles.optionsList}>
          {options.map((option) => (
            <div key={option.id} className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id={option.id}
                checked={checkedOptions.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className={styles.hiddenCheckbox}
              />
              <label
                htmlFor={option.id}
                className={`${styles.customCheckbox} ${checkedOptions.includes(option.id) ? styles.checkedOption : ''}`}
              >
                <span className={styles.checkboxIcon}></span>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WeakManSurvey;