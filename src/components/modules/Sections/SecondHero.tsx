// components/HeroSection.tsx
'use client'; // Esta diretiva é necessária para componentes client-side no Next.js 13+

import React from 'react';
import { motion } from 'framer-motion';
import ImageCard from '../image/ImageCard'; // Certifique-se de que o caminho para ImageCard está correto

// URLs das imagens de placeholder, ajustadas para corresponder à ordem da imagem original (visual: TL, TR, BL, BR)
// Top-left: Homem segurando uma mulher
// Top-right: Homem sem camisa flexionando
// Bottom-left: Homem segurando uma placa do YouTube (img4 na lista original)
// Bottom-right: Homem e mulher sorrindo (selfie) (img3 na lista original)
const images = [
  '/gostosa.jpg', 
  '/titiocurtindo.jpg', 
  '/paisagem.jpg', 
  '/growup.jpg', 
];

// SVG base para as ondas, otimizado para ser inserido como data URL
const waveSvg = encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 100' preserveAspectRatio='none'>
    <path fill='#ffffff' d='M0,50 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,100 L0,100 Z' />
  </svg>
`);

// Base64 da imagem do padrão quadriculado fornecido pelo usuário
const bgScrollingPattern = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC";


const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">

      {/* Camadas Brancas Animadas na Parte Superior (ondas) */}
      <div className="relative h-24 sm:h-32 md:h-40 z-20 overflow-hidden">
        {/* Camada 1: air1 */}
        <div
          className="absolute left-0 right-0 h-[100px] bg-no-repeat animate-wave-slow"
          style={{
            top: '0px',
            width: '100vw',
            backgroundImage: `url("data:image/svg+xml,${waveSvg}")`,
            backgroundSize: '100vw 100px',
            opacity: 1,
            zIndex: 1000,
            animationDelay: '0s',
          }}
        ></div>

        {/* Camada 2: air2 */}
        <div
          className="absolute left-0 right-0 h-[100px] bg-no-repeat animate-wave-medium"
          style={{
            top: '10px',
            width: '100vw',
            backgroundImage: `url("data:image/svg+xml,${waveSvg}")`,
            backgroundSize: '100vw 100px',
            opacity: 0.5,
            zIndex: 999,
            animationDelay: '-5s',
          }}
        ></div>

        {/* Camada 3: air3 */}
        <div
          className="absolute left-0 right-0 h-[100px] bg-no-repeat animate-wave-fast"
          style={{
            top: '15px',
            width: '100vw',
            backgroundImage: `url("data:image/svg+xml,${waveSvg}")`,
            backgroundSize: '100vw 100px',
            opacity: 0.2,
            zIndex: 998,
            animationDelay: '-2s',
          }}
        ></div>

        {/* Camada 4: air4 */}
        <div
          className="absolute left-0 right-0 h-[100px] bg-no-repeat animate-wave-very-fast"
          style={{
            top: '20px',
            width: '100vw',
            backgroundImage: `url("data:image/svg+xml,${waveSvg}")`,
            backgroundSize: '100vw 100px',
            opacity: 0.7,
            zIndex: 997,
            animationDelay: '-5s',
          }}
        ></div>
      </div>

      {/* Área de Conteúdo Principal com Fundo Animado */}
      <div
        className="relative flex-grow flex items-center justify-center p-8 z-10"
        style={{
          backgroundImage: `url("${bgScrollingPattern}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '50px 50px',
          animation: 'grid-scroll-animate 0.92s linear infinite',
        }}
      >
        {/* Overlay semi-transparente para melhorar a legibilidade do texto */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        {/* Content Wrapper: Layout de duas colunas (texto à esquerda, grade de imagens à direita) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-12 py-12 px-6">
          
          {/* Coluna Esquerda: Conteúdo de Texto */}
<div className="text-center lg:text-left lg:w-1/2">
  <h1 className="text-5xl md:text-6xl font-extrabold text-pink-100 mb-6 leading-tight">
    Como você vai se tornar um 
    <span className="text-[#ff2e2e]"> HOMEM </span> 
    <span className="text-[#FBB03B]"> MELHOR </span>
  </h1>
  <p className="text-lg md:text-xl text-pink-100">
    Aqui eu vou te ensinar tudo que eu aprendi depois de ficar com várias mulheres, 
    pegar o shape, ganhar grana no mundo real e na internet. 
    Aqui você vai ter uma <span className="text-[#D4145A] font-semibold">evolução acelerada</span>.
  </p>
</div>



          {/* Coluna Direita: Grade de Imagens (2x2) */}
          <motion.div
            className="grid grid-cols-2 gap-4 lg:w-1/2 w-full max-w-md lg:max-w-none" // Grade 2x2, ocupa metade da largura em telas grandes
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }} // Animação sutil ao passar o mouse sobre o contêiner da grade
          >
            {images.map((url, index) => (
              // Cada ImageCard é um item individual na grade
              <ImageCard key={index} imageUrl={url} shapeType={2} altText={`Imagem ${index + 1}`} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;