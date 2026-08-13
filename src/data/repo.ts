/**
 * Constantes do repositório, separadas do gitLog porque o not-found do
 * /changelog é componente de cliente: importar o gitLog inteiro arrastaria
 * `fetch` e a leitura de `process.env.GITHUB_TOKEN` para o bundle do navegador.
 */
export const REPO = "pmatos2000/portfolio-paulo-matos";

export const repoUrl = `https://github.com/${REPO}`;
