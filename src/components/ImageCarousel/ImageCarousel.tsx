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
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);

  const goToNext = useCallback(() => {
    setPreviousIndex(currentIndex);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [currentIndex, images.length]);

  useEffect(() => {
    if (!isAutoplayActive || images.length <= 1) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [isAutoplayActive, goToNext, images.length, interval]);

  const handlePrevious = () => {
    setIsAutoplayActive(false);
    setPreviousIndex(currentIndex);
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

  const previousImage = previousIndex !== null && images[previousIndex];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.imageWrapper}>
        {previousImage && (
          <Image
            key={`prev-${previousIndex}`}
            src={previousImage.src}
            alt={previousImage.alt}
            fill
            style={{ objectFit: "contain" }}
            className={`${styles.carouselImage} ${styles.inactive}`}
          />
        )}
        <Image
          key={`current-${currentIndex}`}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          style={{ objectFit: "contain" }}
          className={`${styles.carouselImage} ${styles.active}`}
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
