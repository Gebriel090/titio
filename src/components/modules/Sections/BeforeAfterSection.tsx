'use client'

import React from 'react';
import { motion } from 'framer-motion';
import GridBackgroundPattern from '@/components/modules/background/GridBackgroundPattern';
import ImageCard from '../image/ImageCard';

interface BeforeAfterSectionProps {
  imageUrl: string;
}

const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ imageUrl }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section
      className="relative flex items-center justify-center py-20
                 px-4 sm:px-6 md:px-10 lg:px-10 min-h-screen text-white overflow-hidden"
    >
      <GridBackgroundPattern />

      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-20 max-w-6xl w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        // Remova 'once: true' para que a animação se repita toda vez que entrar na viewport
        viewport={{ amount: 0.5 }}
      >
        {/* Lado Esquerdo: ImageCard */}
        <motion.div
          className="flex-shrink-0 w-full md:w-auto"
          variants={itemVariants}
        >
          <ImageCard imageUrl={imageUrl} shapeType={1} altText="Eu era um Beto" />
        </motion.div>

        {/* Lado Direito: Bloco de Texto */}
        <motion.div
          className="text-center md:text-left max-w-lg mx-auto md:mx-0"
          variants={itemVariants}
        >
          {/* Título com cores misturadas */}
          <h2 className="text-4xl lg:text-4xl font-bold mb-4">
            <span className="text-white">Eu já fui um </span>
            <span className="text-orange-highlight">fracassado</span>
          </h2>
          {/* Parágrafo com cores misturadas */}
          <p className="text-lg leading-relaxed text-gray-300">
            <span className="text-orange-highlight">Virgem, nunca tinha beijado uma mulher, pobre e infeliz.</span>
            <span>Iniciava as conversas com &quot;Oi, tudo bem?&quot;.  </span>
            <span>Mas ele soube o que fazer exatamente </span>
            <span className="text-orange-highlight"> para mudar.</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BeforeAfterSection;