'use client'

import React, { useRef, useState } from 'react';
import '@/styles/ImageCard.css'
// Definindo os tipos para as formas da parte inferior
type ShapeType = 1 | 2 | 3 | 4;

interface ImageCardProps {
  imageUrl: string;
  shapeType?: ShapeType; // Tipo da forma na parte inferior (1, 2 ou 3)
  altText?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, shapeType = 1, altText = "Image" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Calcula a posição do mouse em relação ao centro do cartão
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Define a sensibilidade máxima da rotação
    const maxRotation = 10; 
    
    // Calcula rotação no eixo Y (movimento horizontal do mouse)
    // Se o mouse for para a esquerda (mouseX negativo), a imagem gira para a direita (rotateY positivo)
    // Se o mouse for para a direita (mouseX positivo), a imagem gira para a esquerda (rotateY negativo)
    const newRotateY = (mouseX / (width / 2)) * -maxRotation; 
    
    // Calcula rotação no eixo X (movimento vertical do mouse)
    // Se o mouse for para cima (mouseY negativo), a parte inferior da imagem vai para frente (rotateX negativo)
    // Se o mouse for para baixo (mouseY positivo), a parte inferior da imagem vai para frente (rotateX positivo)
    // Isso corresponde a "o eixo de baixo dela vai pra frente e o eixo de cima vai pra trás"
    const newRotateX = (mouseY / (height / 2)) * maxRotation; 

    setRotateX(newRotateX);
    setRotateY(newRotateY);
  };

  const handleMouseLeave = () => {
    // Reseta a rotação para 0 quando o mouse sai do cartão
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      className="image-card-wrapper"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Aplica a transformação 3D e rotações dinâmicas
      style={{ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
    >
      {/* Container para o efeito de camadas e sombras */}
      <div className="image-card-layers">
        <div className="image-card-content">
          <img src={imageUrl} alt={altText} />
          {/* Fades nas laterais para integrar a imagem ao fundo */}
          <div className="image-card-fade-left"></div>
          <div className="image-card-fade-right"></div>
          {/* Parte inferior com formas pré-definidas */}
          <div className={`image-card-bottom-shape shape-${shapeType}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;