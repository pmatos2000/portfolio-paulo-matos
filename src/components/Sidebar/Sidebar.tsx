import { VscFolder, VscMarkdown, VscJson, VscTerminal, VscFile } from 'react-icons/vsc';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.title}>EXPLORER</h2>
            <ul className={styles.fileList}>
                <li><VscFolder /> <span>src/pages/</span></li>
                <ul className={`${styles.fileList} ${styles.nested}`}>
                    <li><VscMarkdown /> <span>sobre-mim.md</span></li>
                    <li><VscJson /> <span>competencias.json</span></li>
                </ul>
                <li><VscFolder /> <span>src/experiencia/</span></li>
                <ul className={`${styles.fileList} ${styles.nested}`}>
                    <li><VscTerminal /> <span>2025_neuraptor.tsx</span></li>
                    <li><VscTerminal /> <span>2024_wegen-coop.tsx</span></li>
                    <li><VscTerminal /> <span>2020_dti-digital.tsx</span></li>
                    <li><VscFile /> <span>2019_outras.md</span></li>
                </ul>
                <li><VscFolder /> <span>src/formacao/</span></li>
                <ul className={`${styles.fileList} ${styles.nested}`}>
                    <li><VscTerminal /> <span>2021_eng-sistemas.ts</span></li> 
                    <li><VscTerminal /> <span>2016_mat-computacional.ts</span></li> 
                    <li><VscTerminal /> <span>2011_tecnico.ts</span></li> 
                </ul>
                <li><VscFolder /> <span>src/projetos-e-premios/</span></li>
                <ul className={`${styles.fileList} ${styles.nested}`}>
                    <li><VscFile /> <span>OBMEP.md</span></li> 
                    <li><VscFile /> <span>Destaques-Academicos.md</span></li> 
                    <li><VscFile /> <span>Squad-de-Verdade.md</span></li> 
                </ul>
                <li><VscTerminal /> <span>contato.ts</span></li> 
            </ul>
        </aside>
    );
};

export default Sidebar;