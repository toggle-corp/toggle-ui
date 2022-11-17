import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import useThemeClassName from '../../hooks/useThemeClassName';

import styles from './styles.css';

export interface BackdropProps {
    className?: string;
    parentRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    uiMode?: UiMode;
}

function Backdrop(props: BackdropProps) {
    const {
        className,
        parentRef,
        children,
        uiMode,
    } = props;

    const ref = React.useRef<HTMLDivElement>(null);
    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    React.useLayoutEffect(
        () => {
            const {
                current: el,
            } = ref;
            if (parentRef && parentRef.current && el) {
                const parentBCR = parentRef.current.getBoundingClientRect();
                el.style.width = `${parentBCR.width}px`;
            }
        },
        [parentRef],
    );

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
