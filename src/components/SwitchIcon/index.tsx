import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface SwitchIconProps {
    className?: string;
    value?: boolean | null;
    uiMode?: UiMode;
}

function SwitchIcon(props: SwitchIconProps) {
    const {
        className,
        value,
        uiMode,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <div className={_cs(
            styles.switchIcon,
            className,
            value ? styles.on : styles.off,
            themeClassName,
        )}
        >
            <div className={styles.knob} />
        </div>
    );
}

export default SwitchIcon;
