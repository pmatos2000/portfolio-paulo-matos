/**
 * Fuso em que as datas do blog são escritas.
 *
 * Os posts guardam a hora de Brasília com o deslocamento junto
 * ("2026-08-12T20:02:00-03:00"), então formatar aqui é só reafirmar o mesmo
 * fuso — o que garante que servidor e navegador exibam o mesmo dia,
 * independentemente de onde a página for renderizada.
 *
 * O Brasil não usa horário de verão desde 2019, mas quem converte é a base
 * de fusos do runtime: se um dia voltar, as datas antigas continuam certas
 * porque cada uma carrega o deslocamento que valia quando foi escrita.
 */
export const TIME_ZONE = "America/Sao_Paulo";

/**
 * A parte do calendário, sem hora. Recortar a string funciona — e é melhor
 * que converter para Date — porque o texto já está no fuso de publicação:
 * "2026-08-12T20:02:00-03:00" começa exatamente pelo dia que se quer.
 */
export const postDay = (date: string) => date.slice(0, 10);

/** O ano, pela mesma razão do postDay. */
export const postYear = (date: string) => date.slice(0, 4);

/**
 * Data de post por extenso. Existe para que os quatro lugares que exibem
 * data — post, índice, lista da home e imagem de compartilhamento — não
 * divirjam de fuso, que foi o que aconteceu enquanto cada um tinha a sua
 * própria cópia do formatador.
 */
export const formatPostDate = (
  date: string,
  month: "short" | "long" = "long",
) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month,
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(date));
