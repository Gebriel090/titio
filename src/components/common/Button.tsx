'use client'; // Necessário para componentes com interatividade no cliente no Next.js
import '../../styles/Button.css'
import React, { useRef, MouseEvent } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string; // Para permitir classes Tailwind adicionais
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (buttonRef.current) {
      const { left, top } = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - left; // Posição X do mouse relativa ao botão
      const y = e.clientY - top;   // Posição Y do mouse relativa ao botão

      // Define as variáveis CSS customizadas (--x, --y) no elemento do botão.
      // Estas variáveis serão usadas no CSS para posicionar o gradiente radial.
      buttonRef.current.style.setProperty('--x', `${x}px`);
      buttonRef.current.style.setProperty('--y', `${y}px`);
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`
        relative px-8 py-4 rounded-full font-bold text-white text-lg 
        cursor-pointer 
        overflow-hidden 
        transition-all duration-300 ease-in-out
        
        // Aplica nossa classe customizada para o efeito de fundo dinâmico
        btn-animated-spotlight 
        ${className || ''} // Permite classes adicionais de Tailwind
      `}
      onMouseMove={handleMouseMove} // Captura o movimento do mouse
      {...props}
    >
      <span className="relative z-10"> {/* Garante que o texto esteja sempre visível */}
        {children}
      </span>
    </button>
  );
};

export default Button;