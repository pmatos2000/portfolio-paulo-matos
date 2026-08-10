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

const circularDistance = (a: number, b: number, total: number) => {
  const direct = Math.abs(a - b);
  return Math.min(direct, total - direct);
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
  }, [isAutoplayActive, goToNext, images.length, interval]);

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
        {images.map((image, index) =>
          circularDistance(index, currentIndex, images.length) <= 1 ? (
            <Image
              key={image.alt}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) calc(100vw - 2rem), 800px"
              style={{ objectFit: "contain" }}
              priority={index === 0}
              aria-hidden={index !== currentIndex}
              className={`${styles.carouselImage} ${
                index === currentIndex ? styles.active : styles.inactive
              }`}
            />
          ) : null,
        )}
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
            <VscChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`${styles.navButton} ${styles.next}`}
            aria-label="Próxima imagem"
          >
            <VscChevronRight size={24} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
