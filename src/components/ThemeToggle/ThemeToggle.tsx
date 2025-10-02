'use client';

import { useTheme } from '@/contexts/ThemeContext';
import styles from './ThemeToggle.module.css';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <span>Tema</span>
      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === 'light'}
        />
        <span className={styles.slider}>
          <BsFillSunFill className={`${styles.icon} ${styles.sun}`} />
          <BsFillMoonFill className={`${styles.icon} ${styles.moon}`} />
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;