import Link from "next/link";

const NotFound = () => {
  return (
    <div className="contentPage">
      <h1>404 — Arquivo não encontrado</h1>
      <p>
        O caminho que você tentou abrir não existe neste workspace. Ele pode ter
        sido movido, renomeado, ou nunca ter existido.
      </p>
      <p>
        <Link href="/sobre-mim">Abrir sobre-mim.css</Link>
      </p>
    </div>
  );
};

export default NotFound;
