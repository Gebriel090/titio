// src/app/SPage.tsx
import BeforeAfterSection from "@/components/modules/Sections/BeforeAfterSection";
import EyeCounter from "@/components/modules/count/EyeCounter";
import ParticleBackground from "@/components/modules/background/ParticleBackground";
import ScrollingTextBanner from "@/components/modules/background/ScrollingTextBanner";
import SelectionHero from "@/components/modules/Sections/SelectionHero";
import HeroSection from "@/components/modules/Sections/SecondHero";
import WeakManSurvey from "@/components/modules/Sections/WeakManSurvey";
import FlowerGallery from "@/components/modules/Sections/CourseCard";
import FAQ from "@/components/modules/Sections/FAQ";
import MarqueeText from "@/components/ui/MarqueeText";
import CourseCTA from "@/components/modules/Sections/CourseCTA";
// Importação corrigida para FlowerGallery, presumindo que este é o componente do carrossel

// Os imports de Button, ImageCard e Image não são usados no JSX deste componente,
// então podem ser omitidos para um código mais limpo.
// import Button from "@/components/common/Button";
// import ImageCard from "@/components/modules/ImageCard";
// import Image from "next/image";

export default function Home() {
  const imagesData = [
    // Adicionando a propriedade 'imageTitle' para cada imagem
    { src: "/piscinatitio.jpg", alt: "Mountain landscape", imageTitle: "Aproveite ao Máximo" },
    { src: "/anoite.jpg", alt: "Forest path", imageTitle: "Tenha uma Vida Lendária" },
    { src: "/ferrari.png", alt: "Desert dunes", imageTitle: "Tenha as Melhores Experiências" },
    { src: "/styles.jpg", alt: "Lake at sunset", imageTitle: "Tire as Melhores Fotos" },
    { src: "/treta.jpg", alt: "City skyline", imageTitle: "Tenha as Melhores Histórias" },
    { src: "/jobs.jpg", alt: "Tropical beach", imageTitle: "Passe a Noite com Ela" },
    { src: "/jets.png", alt: "Tropical beach", imageTitle: "Imagina Você Aqui?" },
  ];
  return (
    <div className="relative min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      <div className="absolute top-4 left-4 z-20">
        <EyeCounter />
      </div>
      <ParticleBackground />

      <SelectionHero />
      <ScrollingTextBanner />
      <MarqueeText
        text="🎉 OFERTA ESPECIAL POR TEMPO LIMITADO! ✨" 
        speed={15} 
        fontSize="text-1xl" 
        textColor="text-white" 
        backgroundColor="bg-[#D20404]" 
        spacing="pr-10"
        // Qualquer prop que não seja de MarqueeTextProps causaria um erro de TypeScript aqui!
        // 예를 들어: someInvalidProp="value" // Isso geraria um erro de tipo
      />
      <BeforeAfterSection imageUrl="/titioantigo.jpg" />
      <HeroSection />
      <WeakManSurvey />
      {/* Usando o componente FlowerGallery corrigido e passando as imagens */}
      <FlowerGallery
        images={imagesData}
        className="my-custom-swiper-container" // Exemplo de classe extra
        title="A Melhor Comunidade do Brasil" // Título geral do carrossel
      />
      <CourseCTA/>
      <FAQ/>
      <p className="text-center text-lg text-gray-700 mt-4 mb-8">
        Simplesmente, o criador deste site é o melhor!! <span className="font-semibold text-blue-500">@ogabriel.st</span>
      </p>    </div>
  );
}