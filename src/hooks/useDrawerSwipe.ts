"use client";

import { useEffect } from "react";

/** Mesmo limiar do CSS. Ver o comentário do @media em AppLayout.module.css. */
const COMPACTO = "(max-width: 1067px)";

/** Distância horizontal mínima para valer como gesto, em px. */
const DISTANCIA = 60;

/** O horizontal precisa dominar, senão rolagem na diagonal dispararia. */
const DOMINANCIA = 1.5;

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
const BORDA = 32;

/**
 * O alvo, ou algum ancestral dele, rola na horizontal.
 *
 * É o caso dos blocos de código e das tabelas do MDX, que têm overflow-x: auto.
 * Sem esta checagem, arrastar para o lado dentro de um `pre` abriria a gaveta em
 * vez de rolar o código — e não haveria como ler uma linha longa no celular.
 */
const rolaNaHorizontal = (alvo: EventTarget | null): boolean => {
  let elemento = alvo instanceof Element ? alvo : null;

  while (elemento) {
    if (elemento.scrollWidth > elemento.clientWidth) {
      const { overflowX } = getComputedStyle(elemento);
      if (overflowX === "auto" || overflowX === "scroll") {
        return true;
      }
    }
    elemento = elemento.parentElement;
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
    const media = window.matchMedia(COMPACTO);
    let compacto = media.matches;
    const onMedia = (event: MediaQueryListEvent) => {
      compacto = event.matches;
    };

    let inicioX = 0;
    let inicioY = 0;
    let rastreando = false;

    const onStart = (event: TouchEvent) => {
      rastreando = false;

      /** Mais de um dedo é pinça ou gesto do sistema, não arrastar. */
      if (!compacto || event.touches.length !== 1) {
        return;
      }

      const toque = event.touches[0];
      const naBorda =
        toque.clientX < BORDA || toque.clientX > window.innerWidth - BORDA;

      if (naBorda || rolaNaHorizontal(event.target)) {
        return;
      }

      inicioX = toque.clientX;
      inicioY = toque.clientY;
      rastreando = true;
    };

    /** Decide durante o movimento: responde antes de o dedo sair da tela. */
    const onMove = (event: TouchEvent) => {
      if (!rastreando || event.touches.length !== 1) {
        return;
      }

      const toque = event.touches[0];
      const deltaX = toque.clientX - inicioX;
      const deltaY = toque.clientY - inicioY;

      if (Math.abs(deltaX) < DISTANCIA) {
        return;
      }
      if (Math.abs(deltaX) < Math.abs(deltaY) * DOMINANCIA) {
        return;
      }

      rastreando = false;
      if (deltaX > 0) {
        onOpen();
      } else {
        onClose();
      }
    };

    const encerrar = () => {
      rastreando = false;
    };

    media.addEventListener("change", onMedia);
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", encerrar, { passive: true });
    document.addEventListener("touchcancel", encerrar, { passive: true });

    return () => {
      media.removeEventListener("change", onMedia);
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", encerrar);
      document.removeEventListener("touchcancel", encerrar);
    };
  }, [onOpen, onClose]);
};
