import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Portal from '../Portal';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface BodyBackdropProps {
    className?: string;
    children?: React.ReactNode;
    uiMode?: UiMode;
}

function BodyBackdrop(props: BodyBackdropProps) {
    const {
        children,
        className,
        uiMode,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <Portal>
            <div className={_cs(className, styles.bodyBackdrop, themeClassName)}>
                { children }
            </div>
        </Portal>
    );
}

export default BodyBackdrop;
