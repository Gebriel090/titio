/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: { keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-speed) linear infinite',
      },
      colors: {
        'gradient-banner-start': '#FFD700', // Um amarelo/laranja vibrante
        'gradient-banner-end': '#FF6347',   // Um vermelho/laranja
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Keyframe para a animação das ondas (direita para esquerda)
        wave: {
          '0%': { 'background-position-x': '0px' },
          '100%': { 'background-position-x': '1000px' }, // Move 1000px para a direita
        },
        // Keyframe para a animação das ondas (esquerda para direita)
        wave2: {
          '0%': { 'background-position-x': '0px' },
          '100%': { 'background-position-x': '-1000px' }, // Move 1000px para a esquerda
        },
        // Keyframe para o fundo quadriculado das fotos (agora chamado 'grid-scroll')
        'grid-scroll': {
          '100%': { 'background-position': '50px 50px' }, // Move o fundo em X e Y
        },
      },
      animation: {
        'scroll-left': 'scroll-left linear infinite',
        // Animações das ondas com os nomes que você usou no componente
        'wave-slow': 'wave 30s linear infinite',
        'wave-medium': 'wave2 15s linear infinite',
        'wave-fast': 'wave 30s linear infinite', // Mantendo 30s para 'wave' como no seu exemplo original
        'wave-very-fast': 'wave2 5s linear infinite',
        // Animação do fundo das fotos com o nome que você usou no componente
        'grid-scroll-animate': 'grid-scroll 0.92s linear infinite',
      }
    },
  },
  plugins: [],
}