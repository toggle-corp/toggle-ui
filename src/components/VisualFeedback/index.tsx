import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import useThemeClassName from '../../hooks/useThemeClassName';
import styles from './styles.css';

export interface VisualFeedbackProps {
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    uiMode?: UiMode;
    focused?: boolean;
}

function VisualFeedback(props: VisualFeedbackProps) {
    const {
        className,
        disabled,
        readOnly,
        uiMode,
        focused,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <div
            className={_cs(
                className,
                styles.visualFeedback,
                disabled && styles.disabled,
                readOnly && styles.readOnly,
                focused && styles.focused,
                themeClassName,
            )}
        />
    );
}

export default VisualFeedback;
