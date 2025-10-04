'use client'; // Necessário para componentes com interatividade no cliente no Next.js

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importe motion e AnimatePresence


const EyeCounter = () => {
  const [viewerCount, setViewerCount] = useState(115); 

  useEffect(() => {
    const generateRandomCount = () => {
      const min = 90;
      const max = 120;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const interval = setInterval(() => {
      setViewerCount(generateRandomCount());
    }, Math.random() * 2000 + 3000); // Intervalo aleatório entre 3s e 5s

    return () => clearInterval(interval);
  }, []);

  // Variantes de animação para os números
  const numberVariants = {
    initial: { y: -10, opacity: 0 }, // Começa um pouco acima e invisível
    animate: { y: 0, opacity: 1 },    // Desliza para a posição e fica visível
    exit: { y: 10, opacity: 0 },      // Desliza para baixo e desaparece
  };

  return (
    // Removido o bg-gray-900 bg-opacity-70 rounded-md
    <div className="flex fixed items-center text-gray-400 text-sm font-semibold p-2">
      {/* Ícone de Olho */}
      <svg 
        className="w-4 h-4 mr-1" 
        fill="currentColor" 
        viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
      
      {/*
        AnimatePresence permite que componentes filhos definam animações de saída (exit).
        mode="wait" faz com que o componente que sai termine sua animação antes que o novo comece a entrar.
      */}
      <AnimatePresence mode="wait">
        <motion.span
          key={viewerCount} // A key é crucial para Framer Motion saber que o item mudou
          variants={numberVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }} // Duração da animação
          className="inline-block" // Importante para que a animação 'y' funcione corretamente
        >
          {viewerCount}
        </motion.span>
      </AnimatePresence>
      
      <span className="ml-1">Estão vendo esse site</span>
    </div>
  );
};

export default EyeCounter;