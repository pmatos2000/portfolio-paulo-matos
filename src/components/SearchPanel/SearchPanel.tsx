"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";
import { siteConfig } from "@/data/site";
import styles from "./SearchPanel.module.css";

type SearchEntry = {
  url: string;
  title: string;
  kind: "post" | "page";
  tags?: string[];
  body?: string;
};

type SearchPanelProps = {
  onCloseMenu: () => void;
};

/** Sobrevive à troca de painel — o índice é buscado uma vez por sessão. */
let cache: SearchEntry[] | null = null;

const LIMIT = 7;

/** Sem o www: o operador site: casa o domínio e os subdomínios. */
const SEARCH_DOMAIN = new URL(siteConfig.url).hostname.replace(/^www\./, "");

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const SNIPPET_RADIUS = 60;

const snippetFor = (body: string, term: string) => {
  const at = normalize(body).indexOf(term);
  if (at < 0) {
    return null;
  }
  const start = Math.max(0, at - SNIPPET_RADIUS);
  const end = Math.min(body.length, at + term.length + SNIPPET_RADIUS);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < body.length ? "…" : "";
  return `${prefix}${body.slice(start, end).trim()}${suffix}`;
};

const scoreOf = (entry: SearchEntry, term: string) => {
  if (normalize(entry.title).includes(term)) {
    return 3;
  }
  if (entry.tags?.some((tag) => normalize(tag).includes(term))) {
    return 2;
  }
  if (entry.body && normalize(entry.body).includes(term)) {
    return 1;
  }
  return 0;
};

const SearchPanel = ({ onCloseMenu }: SearchPanelProps) => {
  const inputId = useId();
  const [entries, setEntries] = useState<SearchEntry[] | null>(cache);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (cache) {
      return;
    }
    let alive = true;
    fetch("/search-index.json")
      .then((response) => response.json())
      .then((data: SearchEntry[]) => {
        cache = data;
        if (alive) {
          setEntries(data);
        }
      })
      .catch(() => {
        if (alive) {
          setFailed(true);
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  const term = normalize(query.trim());
  const ready = term.length >= 2;
  const loading = !entries && !failed;

  const found = useMemo(() => {
    if (!ready || !entries) {
      return [];
    }
    return entries
      .map((entry) => ({ entry, score: scoreOf(entry, term) }))
      .filter((hit) => hit.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((hit) => ({
        ...hit,
        snippet: hit.entry.body ? snippetFor(hit.entry.body, term) : null,
      }));
  }, [entries, term, ready]);

  const hits = found.slice(0, LIMIT);
  const external = encodeURIComponent(`site:${SEARCH_DOMAIN} ${query.trim()}`);

  const status = () => {
    if (failed) {
      return "Não foi possível carregar o índice do site.";
    }
    /** Sem isto o painel dizia "0 resultados" enquanto o índice não chegava. */
    if (loading) {
      return "Carregando o índice do site.";
    }
    if (!ready) {
      return "Digite ao menos dois caracteres.";
    }
    if (found.length > LIMIT) {
      return `${LIMIT} de ${found.length} resultados`;
    }
    return `${found.length} resultado${found.length === 1 ? "" : "s"}`;
  };

  return (
    <aside className={styles.panel} aria-label="Buscar no site">
      <p className={styles.title}>SEARCH</p>

      <label className={styles.srOnly} htmlFor={inputId}>
        Buscar no site
      </label>
      <input
        id={inputId}
        type="search"
        className={styles.input}
        placeholder="Buscar"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {/* Sempre no DOM, mesmo parada: a faixa reserva os 2px e evita que o
          conteúdo pule quando o índice chega. */}
      <div
        className={`${styles.progress} ${loading ? styles.progressActive : ""}`}
        aria-hidden="true"
      />

      {/* Enquanto carrega, o aviso vira só texto para leitor de tela — quem
          enxerga já tem a barra. O elemento não sai do DOM porque região
          aria-live trocada na hora do anúncio não é lida de forma confiável. */}
      <p className={loading ? styles.srOnly : styles.status} aria-live="polite">
        {status()}
      </p>

      <ul className={styles.results}>
        {hits.map(({ entry, snippet }) => (
          <li key={entry.url} className={styles.result}>
            <Link
              href={entry.url}
              className={styles.link}
              onClick={onCloseMenu}
            >
              <span className={styles.resultTitle}>{entry.title}</span>
              <span className={styles.url}>{entry.url}</span>
              {snippet ? (
                <span className={styles.snippet}>{snippet}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      {ready ? (
        <div className={styles.external}>
          <p className={styles.externalTitle}>
            O texto das páginas não entra no índice. Buscar fora:
          </p>
          <a
            className={styles.externalLink}
            href={`https://www.google.com/search?q=${external}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google
          </a>
          <a
            className={styles.externalLink}
            href={`https://duckduckgo.com/?q=${external}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            DuckDuckGo
          </a>
        </div>
      ) : null}
    </aside>
  );
};

export default SearchPanel;
