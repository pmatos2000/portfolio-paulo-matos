import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./SettingsPanel.module.css";

const SettingsPanel = () => {
  return (
    <aside className={styles.settingsPanel} aria-label="Configurações">
      <p className={styles.title}>SETTINGS</p>
      <div className={styles.settingsList}>
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default SettingsPanel;
