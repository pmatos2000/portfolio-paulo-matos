import ActivityBar from "@/components/ActivityBar/ActivityBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.mainLayout}>
      <ActivityBar />
      <Sidebar />
      <main className={styles.contentArea}>
        <h1>Bem-vindo ao meu Portfólio!</h1>
        <p>Selecione um arquivo na barra lateral para ver o conteúdo.</p>
      </main>
    </div>
  );
}