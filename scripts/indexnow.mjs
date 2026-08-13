/**
 * Notifica os buscadores do protocolo IndexNow de que URLs mudaram.
 *
 *   npm run indexnow -- /blog/meu-post /blog /
 *
 * Rode DEPOIS do deploy ficar verde. Antes disso o buscador chega, le o HTML
 * antigo e a submissao e desperdicada.
 *
 * Submeta so o que mudou de fato. O protocolo desencoraja reenviar URLs sem
 * mudanca: queima quota de crawl sem ganhar nada.
 */

/** Publica por design: vive em /<KEY>.txt e prova posse do dominio. Nao e credencial. */
const KEY = "4d2930af9ed3935d0910cebafd471dce";
const HOST = "www.pmatos.dev";

/** Endpoint compartilhado: um POST se propaga para Bing, Yandex, Naver, Seznam e Yep. */
const ENDPOINT = "https://api.indexnow.org/indexnow";

const paths = process.argv.slice(2);

if (paths.length === 0) {
  console.error("uso: npm run indexnow -- /blog/meu-post /blog /");
  process.exit(1);
}

/** A chave vive no host www; submeter URL do apex responde 403. */
const urlList = paths.map((path) => new URL(path, `https://${HOST}`).toString());

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

/** 200 = aceito e chave validada. 202 = aceito, validacao da chave pendente. */
if (response.status === 200 || response.status === 202) {
  console.log(`${response.status} - ${urlList.length} URL(s) enviada(s):`);
  for (const url of urlList) {
    console.log(`  ${url}`);
  }
} else {
  console.error(`${response.status} ${response.statusText}`);
  console.error(await response.text());
  process.exit(1);
}
