import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { ResizeObserver } from 'resize-observer';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';
import styles from './styles.css';

export interface VisualFeedbackProps {
    className?: string;
    disabled?: boolean;
    uiMode?: UiMode;
}

const uiModeToStyleMap: {
    [key in UiMode]: string;
} = {
    light: styles.light,
    dark: styles.dark,
}

function VisualFeedback(props: VisualFeedbackProps) {
    const {
        className,
        disabled,
        uiMode,
    } = props;
    const ref = React.useRef<HTMLDivElement>(null);

    const handleResize = React.useCallback(() => {
        if (ref.current) {
            const { current } = ref;
            const { parentElement } = current;

            if (parentElement) {
                const bcr = parentElement.getBoundingClientRect();
                current.style.left = `${bcr.x}px`;
                current.style.top = `${bcr.y}px`;
                current.style.width = `${bcr.width}px`;
                current.style.height = `${bcr.height}px`;
            }
        }

    }, []);

    React.useEffect(handleResize, [ref, handleResize]);

    React.useEffect(() => {
        const observer = new ResizeObserver(handleResize);

        if (ref.current && ref.current.parentElement) {
            observer.observe(ref.current.parentElement);
        }
    }, [handleResize]);

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <div
            ref={ref}
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
