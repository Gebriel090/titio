'use client'; // Necessário para usar a prop 'speed' dinamicamente no CSS animation-duration

import React from 'react';

interface ScrollingTextBannerProps {
  phrases?: string[];
  separator?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

const ScrollingTextBanner: React.FC<ScrollingTextBannerProps> = ({
  phrases = [
    "Deixe de ser um Beto",
    "Torne-se um Alfredo",
  ],
  separator = "•",
  speed = "normal",
}) => {
  const contentToDisplay = phrases
    .flatMap((phrase, index) => [
      <span key={`phrase-${index}`} className="whitespace-nowrap">
        {phrase}
      </span>,
      <span
        key={`separator-${index}`}
        className="px-2 font-bold text-black whitespace-nowrap"
      >
        {separator}
      </span>,
    ])
    .slice(0, -1);

  let animationDuration: string;
  switch (speed) {
    case "slow":
      animationDuration = "60s";
      break;
    case "fast":
      animationDuration = "15s";
      break;
    default:
      animationDuration = "30s";
  }

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full overflow-hidden h-10
        flex items-center z-50
        bg-gradient-to-r from-gradient-banner-start to-gradient-banner-end
        text-white text-sm md:text-base
      "
    >
      {/* <div
        className="flex absolute left-0 top-0 h-full items-center min-w-max animate-scroll-left"
        style={{ animationDuration }} // Aplica a duração da animação aqui
      >
        {contentToDisplay}
        {contentToDisplay}
      </div> */}
    </div>
  );
};

export default ScrollingTextBanner;