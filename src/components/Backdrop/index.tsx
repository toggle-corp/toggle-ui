import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface BackdropProps {
    className?: string;
    children?: React.ReactNode;
    uiMode?: UiMode;
}

function Backdrop(props: BackdropProps) {
    const {
        className,
        children,
        uiMode,
    } = props;

    const ref = React.useRef<HTMLDivElement>(null);
    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <div
            ref={ref}
            className={_cs(
                className,
                styles.backdrop,
                themeClassName,
            )}
        >
            { children }
        </div>
    );
}

export default Backdrop;
