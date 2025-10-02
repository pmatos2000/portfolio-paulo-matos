'use client';

import { useState, useRef } from 'react';
import { VscFiles, VscSearch, VscDebugAlt, VscExtensions, VscSettingsGear } from 'react-icons/vsc';
import styles from './ActivityBar.module.css';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const ActivityBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeIcon, setActiveIcon] = useState('Explorer');

    const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const iconName = event.currentTarget.title;
        setActiveIcon(iconName);
    };

    return (
        <nav className={styles.activityBar}>
            <div className={styles.iconGroupTop}>
                <button
                    title="Explorer"
                    className={activeIcon === 'Explorer' ? styles.active : ''}
                    onClick={handleIconClick}
                >
                    <VscFiles size={30} />
                </button>
                <button
                    title="Search"
                    disabled
                    className={activeIcon === 'Search' ? styles.active : ''}
                >
                    <VscSearch size={30} />
                </button>
                <button
                    title="Run and Debug"
                    disabled
                    className={activeIcon === 'Run and Debug' ? styles.active : ''}
                >
                    <VscDebugAlt size={30} />
                </button>
                <button
                    title="Extensions"
                    disabled
                    className={activeIcon === 'Extensions' ? styles.active : ''}
                >
                    <VscExtensions size={30} />
                </button>
            </div>
            <div className={styles.iconGroupBottom} >
                <button
                    title="Manage"
                    className={activeIcon === "Manage" ? styles.active : ''}
                    onClick={handleIconClick}>
                    <VscSettingsGear size={30} />
                </button>
            </div>
        </nav>
    );
};

export default ActivityBar;