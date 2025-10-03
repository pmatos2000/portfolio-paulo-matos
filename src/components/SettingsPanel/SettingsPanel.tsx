import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./SettingsPanel.module.css";

const SettingsPanel = () => {
  return (
    <aside className={styles.settingsPanel}>
      <h2 className={styles.title}>SETTINGS</h2>
      <div className={styles.settingsList}>
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default SettingsPanel;
