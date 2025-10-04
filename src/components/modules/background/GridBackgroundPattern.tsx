// Este componente não precisa ser 'use client' se os pontos forem puramente CSS ou estáticos.
// No entanto, se precisar de aleatoriedade nos pontos ou animação complexa, use 'use client'.
// Para a pulsação CSS, não é necessário.

import React from 'react';

interface GridBackgroundPatternProps {
  children?: React.ReactNode; // Permite que o componente envolva outro conteúdo
}

const GridBackgroundPattern: React.FC<GridBackgroundPatternProps> = ({ children }) => {
  // Array de posições para os pontos vermelhos.
  // Ajuste esses valores para mudar a distribuição dos pontos.
  // Você pode ter mais ou menos pontos.
  const redDotPositions = [
    { top: '10%', left: '15%' },
    { top: '25%', left: '40%' },
    { top: '50%', left: '10%' },
    { top: '70%', left: '60%' },
    { top: '15%', left: '80%' },
    { top: '85%', left: '30%' },
    { top: '40%', left: '90%' },
    { top: '5%', left: '55%' },
    { top: '95%', left: '70%' },
    { top: '30%', left: '50%' },
    { top: '60%', left: '25%' },
    { top: '80%', left: '5%' },
    { top: '20%', left: '65%' },
    { top: '45%', left: '75%' },
    { top: '75%', left: '45%' },
  ];

  return (
    // Contêiner principal com o fundo de grid
    // - absolute inset-0: Ocupa toda a área do pai relativo.
    // - z-0: Coloca-o atrás do conteúdo principal.
    // - bg-repeat: Permite que o padrão de grid se repita.
    // O background-image aqui cria as linhas do grid usando gradientes.
    // Ajuste o tamanho (20px) para mudar a densidade do grid.
    <div
      className="absolute inset-0 z-0 bg-repeat"
      style={{
        backgroundImage: `
          linear-gradient(to right, var(--tw-colors-grid-line) 1px, transparent 1px),
          linear-gradient(to bottom, var(--tw-colors-grid-line) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px', // Tamanho de cada célula do grid
      }}
    >
      {/* Mapeia e renderiza os pontos vermelhos */}
      {redDotPositions.map((pos, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-red-dot rounded-full animate-dot-pulse"
          style={{
            top: pos.top,
            left: pos.left,
            // Adiciona um brilho sutil com box-shadow
            boxShadow: '0 0 8px 4px var(--tw-colors-red-dot)',
            animationDelay: `${index * 0.2}s` // Atraso na animação para cada ponto
          }}
        />
      ))}
      
      {/* Renderiza qualquer conteúdo filho que seja passado */}
      {children}
    </div>
  );
};

export default GridBackgroundPattern;