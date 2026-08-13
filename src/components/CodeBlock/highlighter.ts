import darkPlus from "@shikijs/themes/dark-plus";
import lightPlus from "@shikijs/themes/light-plus";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import type { LanguageRegistration, ThemeRegistration } from "shiki/types";
import leafRaw from "@/data/leaf.tmLanguage.json";

const leafGrammar: LanguageRegistration = leafRaw;

const LIGHT_FIX: Record<string, string> = {
  "#267f99": "#23768e",
  "#098658": "#087d52",
  "#e50000": "#de0000",
  "#EE0000": "#dd0000",
  "#d16969": "#a75454",
};

const DARK_FIX: Record<string, string> = {
  "#808080": "#8e8e8e",
  "#d16969": "#d37171",
  "#f44747": "#f55656",
  "#646695": "#898bae",
};

const patch = (
  theme: ThemeRegistration,
  table: Record<string, string>,
): ThemeRegistration => ({
  ...theme,
  tokenColors: (theme.tokenColors ?? []).map((tc) => {
    const next = tc.settings?.foreground && table[tc.settings.foreground];
    return next
      ? { ...tc, settings: { ...tc.settings, foreground: next } }
      : tc;
  }),
});

let instance: Promise<HighlighterCore> | null = null;

const getHighlighter = (): Promise<HighlighterCore> => {
  if (!instance) {
    instance = createHighlighterCore({
      langs: [
        import("@shikijs/langs/rust"),
        import("@shikijs/langs/typescript"),
        import("@shikijs/langs/toml"),
        import("@shikijs/langs/json"),
        /** Colore o +/- dos patches no /changelog. */
        import("@shikijs/langs/diff"),
        leafGrammar,
      ],
      themes: [patch(darkPlus, DARK_FIX), patch(lightPlus, LIGHT_FIX)],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return instance;
};

export const renderCode = async (
  source: string,
  lang: string,
): Promise<string | null> => {
  const highlighter = await getHighlighter();

  if (!highlighter.getLoadedLanguages().includes(lang)) {
    return null;
  }

  return highlighter.codeToHtml(source, {
    lang,
    themes: { light: "light-plus", dark: "dark-plus" },
    defaultColor: false,
  });
};
