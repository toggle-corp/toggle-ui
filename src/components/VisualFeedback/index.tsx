import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';
import styles from './styles.css';

export interface VisualFeedbackProps {
    className?: string;
    disabled?: boolean;
    uiMode?: UiMode;
}

function VisualFeedback(props: VisualFeedbackProps) {
    const {
        className,
        disabled,
        uiMode,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <div
            className={_cs(
                className,
                styles.visualFeedback,
                disabled && styles.disabled,
                themeClassName,
            )}
        />
    );
}

export default VisualFeedback;
