import React from 'react';
import Button from '../../common/Button';
import Link from 'next/link';


const SelectionHero = () => {
  const youTubeVideoId = 'XzgSzpbDhFs';
  // Adicionado modestbranding=1 e controls=0 para minimizar a interface do YouTube e remover cores padrão
  const embedUrl = `https://www.youtube.com/embed/${youTubeVideoId}?autoplay=0&controls=0&rel=0&modestbranding=1&wmode=transparent`;

  return (
    <section 
      className="flex flex-col-reverse lg:flex-row {/* Inverte a ordem para telas menores, vídeo primeiro. Mantém texto-vídeo para telas grandes. */}
                 items-center 
                 justify-start lg:justify-center {/* Alinha ao topo em telas menores, centraliza em telas maiores */}
                 gap-6 md:gap-12 {/* Reduz o espaçamento entre elementos em telas menores */}
                 px-6 md:px-10 lg:px-20 
                 py-8 md:py-16 lg:py-24 {/* Reduz o padding vertical em telas menores */}
                 relative z-10"
      // min-h-screen foi removido para que a seção não ocupe a altura mínima da tela
      // e o conteúdo possa ficar mais para cima em dispositivos menores.
    >
      


      {/* Texto - Este div agora virá depois do vídeo em dispositivos menores */}
      <div className="flex-1 w-full max-w-[800px] mt-40 text-white text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          Transforme-se na sua melhor versão e{" "}
          <span className="text-orange-highlight">CONQUISTE</span> quem você quiser!
        </h2>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-8">
          Cansado de <span className="font-bold">não pegar ninguém</span>? Se achar um{" "}
          <span className="text-orange-highlight font-bold">perdedor</span>? Eu tenho a solução
          para você mudar seu corpo, mentalidade,{" "}
          <span className="text-orange-highlight font-bold">SUA VIDA</span>.
        </p>

        <Link href={"https://pay.kiwify.com.br/9bKruhs"}><Button 
          className="bg-white text-orange-highlight font-bold py-3 px-6 text-base sm:py-4 sm:px-8 sm:text-lg 
                     rounded-lg cursor-pointer transition-colors duration-300 ease-in-out min-w-[200px] 
                     hover:bg-orange-highlight hover:text-white"
        >
          Quero ser Lendário
        </Button></Link>
      </div>
            {/* Vídeo - Este div agora virá primeiro em dispositivos menores devido a flex-col-reverse */}
      <div className="flex-1 w-full max-w-[600px] mt-10 rounded-xl overflow-hidden shadow-2xl">
        <div className="relative w-full h-0 pb-[56.25%] bg-black"> {/* Garante fundo preto para o container do iframe */}
          <iframe
            className="absolute top-0 left-0 w-full h-full bg-black" 
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default SelectionHero;