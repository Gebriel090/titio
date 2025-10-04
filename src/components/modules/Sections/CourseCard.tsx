// src/components/modules/Sections/FlowerGallery.tsx
'use client'; // Esta linha DEVE ser a primeira e centralizada para indicar um componente cliente Next.js

import React, { useState, useEffect } from 'react';

// Estilos base
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

// Importe os módulos do Swiper
import { EffectCoverflow, Pagination, Navigation, Thumbs, FreeMode } from 'swiper/modules';

// Importe os estilos CSS específicos do seu componente (usando CSS Modules)
import styles from '@/styles/SwiperCarousel.module.css';

// Importe os ícones do React Icons (para Ionicons v5)
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

// Importe os componentes Swiper e o tipo Swiper da biblioteca principal
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';
import Swiper from 'swiper'; // Importa o tipo Swiper diretamente da biblioteca 'swiper'

interface SwiperCarouselProps {
  images: { src: string; alt: string; imageTitle?: string }[];
  className?: string;
  title?: string; // Propriedade para o título do componente (geral)
  description?: string; // Propriedade para a descrição do componente (geral)
}

const FlowerGallery: React.FC<SwiperCarouselProps> = ({ images, className, title, description }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [activeSlideImage, setActiveSlideImage] = useState<string | undefined>(images[0]?.src);

  useEffect(() => {
    if (images && images.length > 0 && !activeSlideImage) {
      setActiveSlideImage(images[0].src);
    }
  }, [images, activeSlideImage]);

  const handleMainSwiperSlideChange = (swiper: Swiper) => {
    if (images && images[swiper.realIndex]) {
      setActiveSlideImage(images[swiper.realIndex].src);
    }
  };

  return (
    <div className={`${styles.mainContainer} ${className || ''}`}>
      {activeSlideImage && (
        <div
          className={styles.backgroundBlur}
          style={{ backgroundImage: `url(${activeSlideImage})` }}
        ></div>
      )}

      <div className={styles.contentWrapper}>
        {title && <h2 className={styles.galleryTitle}>{title}</h2>}
        {description && <p className={styles.galleryDescription}>{description}</p>}

        <div className={styles.swiperAndThumbsWrapper}>
          {/* O thumbsSwiper será ocultado via CSS em telas pequenas */}
          {images.length > 0 && (
            <SwiperComponent
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              direction="vertical" // Mantém o Swiper de thumbs vertical para telas grandes
              className={styles.thumbsSwiper}
            >
              {images.map((image, index) => (
                <SwiperSlide key={`thumb-${index}`} className={styles.thumbSlide}>
                  <img src={image.src} alt={image.alt} />
                </SwiperSlide>
              ))}
            </SwiperComponent>
          )}

          {images.length > 0 ? (
            <SwiperComponent
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{
                el: `.${styles.swiperPagination}`,
                clickable: true,
                // A 'direction' da paginação é controlada via CSS para o layout visual
              }}
              navigation={{
                nextEl: `.${styles.swiperButtonNext}`,
                prevEl: `.${styles.swiperButtonPrev}`,
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Thumbs]}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              className={styles.swiperContainer}
              onSlideChange={handleMainSwiperSlideChange}
              initialSlide={0}
            >
              {images.map((image, index) => (
                <SwiperSlide key={`main-${index}`} className={styles.swiperSlideCustom}>
                  <img src={image.src} alt={image.alt} className={styles.swiperImage} />
                  {image.imageTitle && (
                    <div className={styles.imageTitleOverlay}>
                      {image.imageTitle}
                    </div>
                  )}
                </SwiperSlide>
              ))}

       
            </SwiperComponent>
          ) : (
            <p className={styles.noImagesText}>Nenhuma imagem para exibir na galeria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowerGallery;