import React, { ReactNode, useMemo } from 'react';
import {
    _cs,
    getContrastYIQ,
} from '@togglecorp/fujs';

import styles from './styles.css';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

export type ChipVariant = (
    'accent'
    | 'danger'
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
);

const chipVariantToVariableNameMap: {
    [key in ChipVariant]: string;
} = {
    accent: '--tui-color-accent',
    danger: '--tui-color-danger',
    primary: '--tui-color-primary',
    warning: '--tui-color-warning',
    success: '--tui-color-success',
    default: '--tui-color-background-button',
};

export interface ChipProps {
    /**
    * Variant of the chip
     */
    variant?: ChipVariant;
    /**
    * Class name for Chip
     */
    className?: string;
    /**
     * Label for the chip
     */
    label?: ReactNode,
    /**
     * Class name of Chip label
     */
    labelClassName?: string;
    /**
     * Left component of the chip
     */
    icon?: ReactNode,
    /**
     * Class name of icon
     */
    iconClassName?: string;
    /**
     * Right component of the chip
     */
    action?: ReactNode;
    /**
     * Class name for action
     */
    actionClassName?: string;
    /**
     * Children for the chip
     */
    children?: ReactNode;
}

function Chip(props: ChipProps) {
    const {
        variant = 'default',
        label = 'Default',
        icon = null,
        action,
        className,
        labelClassName,
        iconClassName,
        actionClassName,
        children,
    } = props;

    const innerUiMode: UiMode = useMemo(() => {
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue(chipVariantToVariableNameMap[variant])
            .trim();

        const luma = getContrastYIQ(color);
        const mode = luma >= 0.5 ? 'light' : 'dark';

        return mode;
    }, [variant]);

    const themeClassName = useThemeClassName(innerUiMode, styles.light, styles.dark);
    const innerThemeClassName = useThemeClassName(
        innerUiMode,
        styles.innerLight,
        styles.innerDark,
    );

    console.log(innerUiMode);

    const chipClassName = _cs(
        className,
        styles.chipRow,
        variant,
        styles[variant],
        themeClassName,
        innerThemeClassName,
    );

    return (
        <div className={chipClassName}>
            {icon && (
                <span
                    className={_cs(
                        styles.icon,
                        iconClassName,
                    )}
                >
                    {icon}
                </span>
            )}
            {children ? (
                <span className={styles.children}>
                    {children}
                </span>
            )
                : (
                    <span
                        className={_cs(
                            styles.label,
                            labelClassName,
                        )}
                    >
                        {label}
                    </span>
                )}

            {action && (
                <span
                    className={_cs(
                        styles.action,
                        actionClassName,
                    )}
                >
                    {action}
                </span>
            )}
        </div>
    );
}

export default Chip;
