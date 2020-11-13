import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface LoadingAnimationProps {
    className?: string;
    uiMode?: UiMode;
    compact?: boolean;
}

function LoadingAnimation(props: LoadingAnimationProps) {
    const {
        className,
        uiMode,
        compact,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <div className={
            _cs(
                className,
                themeClassName,
                styles.loadingAnimation,
                compact && styles.compact,
            )
        }
        >
            <div className={styles.particle} />
            <div className={styles.particle} />
            <div className={styles.particle} />
        </div>
    );
}

export default LoadingAnimation;
