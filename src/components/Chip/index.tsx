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
     * Class name for children container
     */
    childrenClassName?: string;
    /**
     * Children for the chip
     */
    children?: ReactNode;

    disabled?: boolean;
}

function Chip(props: ChipProps) {
    const {
        variant = 'default',
        label,
        icon,
        action,
        className,
        labelClassName,
        iconClassName,
        actionClassName,
        children,
        childrenClassName,
        disabled,
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

    const chipClassName = _cs(
        className,
        styles.chip,
        variant,
        styles[variant],
        themeClassName,
        innerThemeClassName,
        disabled && styles.disabled,
    );

    return (
        <div className={chipClassName}>
            {icon && (
                <div
                    className={_cs(
                        styles.icon,
                        iconClassName,
                    )}
                >
                    {icon}
                </div>
            )}
            {children && (
                <div
                    className={_cs(childrenClassName, styles.children)}
                >
                    {children}
                </div>
            )}
            {!children && label && (
                <div
                    className={_cs(
                        styles.label,
                        labelClassName,
                    )}
                >
                    {label}
                </div>
            )}
            {action && (
                <div
                    className={_cs(
                        styles.action,
                        actionClassName,
                    )}
                >
                    {action}
                </div>
            )}
        </div>
    );
}

export default Chip;
