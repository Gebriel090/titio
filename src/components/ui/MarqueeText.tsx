import React from 'react';

interface MarqueeTextProps {
  text?: string;
  speed?: number; // duração da animação em segundos
  fontSize?: string; // classe Tailwind para tamanho da fonte
  textColor?: string; // classe Tailwind para cor do texto
  backgroundColor?: string; // classe Tailwind para cor de fundo
  spacing?: string; // classe Tailwind para espaçamento
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
  text = 'DESTAVE O CÓDIGO',
  speed = 30,
  fontSize = 'text-xl',
  textColor = 'text-white',
  backgroundColor = 'bg-purple-700',
  spacing = 'pr-5',
}) => {
  // Repetir o texto várias vezes para que a animação não tenha espaços
  const repeatedTextContent: string = Array(20).fill(text).join(' ');

  return (
    <div className={`w-full overflow-hidden py-2 ${backgroundColor}`}>
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        <span
          className={`inline-block font-bold uppercase flex-shrink-0 ${fontSize} ${textColor} ${spacing}`}
        >
          {repeatedTextContent}
        </span>
        <span
          className={`inline-block font-bold uppercase flex-shrink-0 ${fontSize} ${textColor} ${spacing}`}
        >
          {repeatedTextContent}
        </span>
      </div>
    </div>
  );
};

export default MarqueeText;
