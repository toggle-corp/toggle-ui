import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { getFloatPlacement } from '../../utils';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface DropdownProps {
    className?: string;
    parentRef: React.RefObject<HTMLElement>;
    // forwardedRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
    uiMode?: UiMode;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
    (props, ref) => {
        const {
            parentRef,
            children,
            // forwardedRef,
            uiMode,
            className,
        } = props;

        const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);
        const style = getFloatPlacement(parentRef);

        return (
            <div
                ref={ref}
                style={style}
                className={_cs(styles.dropdownContainer, className, themeClassName)}
            >
                { children }
            </div>
        );
    },
);

export default Dropdown;
