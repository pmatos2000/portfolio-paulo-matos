"use client";

import { useEffect } from "react";

/** Mesmo limiar do CSS. Ver o comentário do @media em AppLayout.module.css. */
const COMPACT_LAYOUT = "(max-width: 1067px)";

/** Distância horizontal mínima para valer como gesto, em px. */
const MIN_DISTANCE = 60;

/** O horizontal precisa dominar, senão rolagem na diagonal dispararia. */
const DOMINANCE = 1.5;

/**
 * Faixa deixada de fora nas duas bordas laterais.
 *
 * É onde o sistema captura o gesto de voltar: no iOS só pela esquerda, no
 * Android por qualquer das duas. Um gesto que comece ali dispararia o voltar do
 * sistema junto com o nosso — a pessoa sairia da página e ainda veria a gaveta
 * reagir. Aplicativo nativo resolve com setSystemGestureExclusionRects, que
 * página web não tem; resta não competir.
 *
 * 32 e não 24 porque a sensibilidade do gesto é ajustável pelo usuário no
 * Android. Numa tela de 360px ainda sobram 296px de área útil.
 */
const EDGE_GUARD = 32;

/**
 * O alvo, ou algum ancestral dele, rola na horizontal.
 *
 * É o caso dos blocos de código e das tabelas do MDX, que têm overflow-x: auto.
 * Sem esta checagem, arrastar para o lado dentro de um `pre` abriria a gaveta em
 * vez de rolar o código — e não haveria como ler uma linha longa no celular.
 */
const scrollsHorizontally = (target: EventTarget | null): boolean => {
  let element = target instanceof Element ? target : null;

  while (element) {
    if (element.scrollWidth > element.clientWidth) {
      const { overflowX } = getComputedStyle(element);
      if (overflowX === "auto" || overflowX === "scroll") {
        return true;
      }
    }
    element = element.parentElement;
  }

  return false;
};

/**
 * Arrastar para a direita abre a gaveta, para a esquerda fecha.
 *
 * Usa eventos de toque, e não de ponteiro, por um motivo prático: ao arrastar
 * na horizontal numa página que rola na vertical, o navegador entende o gesto
 * como rolagem e emite `pointercancel` — os `pointermove` param de chegar e a
 * condição nunca é avaliada. O `touchmove` continua disparando durante a
 * rolagem, então sobrevive à arbitragem de gestos do navegador.
 *
 * A alternativa seria `touch-action: pan-y` no contêiner, mas isso desligaria
 * o pinça-para-ampliar e quebraria a rolagem horizontal dos blocos de código.
 *
 * Só no layout compacto: acima de 1067px o painel já está sempre na tela.
 */
export const useDrawerSwipe = (
  onOpen: () => void,
  onClose: () => void,
): void => {
  useEffect(() => {
    const media = window.matchMedia(COMPACT_LAYOUT);
    let compact = media.matches;
    const onMedia = (event: MediaQueryListEvent) => {
      compact = event.matches;
    };

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onStart = (event: TouchEvent) => {
      tracking = false;

      /** Mais de um dedo é pinça ou gesto do sistema, não arrastar. */
      if (!compact || event.touches.length !== 1) {
        return;
      }

      const touch = event.touches[0];
      const onEdge =
        touch.clientX < EDGE_GUARD ||
        touch.clientX > window.innerWidth - EDGE_GUARD;

      if (onEdge || scrollsHorizontally(event.target)) {
        return;
      }

      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
    };

    /** Decide durante o movimento: responde antes de o dedo sair da tela. */
    const onMove = (event: TouchEvent) => {
      if (!tracking || event.touches.length !== 1) {
        return;
      }

      const touch = event.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) < MIN_DISTANCE) {
        return;
      }
      if (Math.abs(deltaX) < Math.abs(deltaY) * DOMINANCE) {
        return;
      }

      tracking = false;
      if (deltaX > 0) {
        onOpen();
      } else {
        onClose();
      }
    };

    const reset = () => {
      tracking = false;
    };

    media.addEventListener("change", onMedia);
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", reset, { passive: true });
    document.addEventListener("touchcancel", reset, { passive: true });

    return () => {
      media.removeEventListener("change", onMedia);
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", reset);
      document.removeEventListener("touchcancel", reset);
    };
  }, [onOpen, onClose]);
};
