"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import styles from "./ImageCarousel.module.css";

type CarouselImage = {
  src: string | StaticImageData;
  alt: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  interval?: number;
};

const ImageCarousel = ({ images, interval = 5000 }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isAutoplayActive || images.length <= 1) return;

    const timer = setInterval(goToNext, interval);

    return () => clearInterval(timer);
  }, [isAutoplayActive, images.length, interval, goToNext]);
  const handlePrevious = () => {
    setIsAutoplayActive(false);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setIsAutoplayActive(false);
    goToNext();
  };

  if (!images || images.length === 0) {
    return <div>Nenhuma imagem para exibir.</div>;
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.imageWrapper}>
        <Image
          key={currentIndex}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          style={{ objectFit: "contain" }}
          className={styles.carouselImage}
        />
      </div>

      <p className={styles.caption}>{images[currentIndex].alt}</p>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrevious}
            className={`${styles.navButton} ${styles.prev}`}
            aria-label="Imagem anterior"
          >
            <VscChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`${styles.navButton} ${styles.next}`}
            aria-label="Próxima imagem"
          >
            <VscChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
