import React, { ReactNode, useMemo } from 'react';
import {
    _cs,
    getContrastYIQ,
} from '@togglecorp/fujs';

import RawButton, { RawButtonProps } from '../RawButton';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export type ButtonVariant = (
    'accent'
    | 'danger'
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
);

const buttonVariantToVariableNameMap: {
    [key in ButtonVariant]: string;
} = {
    accent: '--tui-color-accent',
    danger: '--tui-color-danger',
    primary: '--tui-color-primary',
    warning: '--tui-color-warning',
    success: '--tui-color-success',
    default: '--tui-color-background-button',
};

export interface ButtonProps<N extends number | string | undefined> extends RawButtonProps<N> {
    /**
    * Variant of the button
    */
    variant?: ButtonVariant;
    /**
    * Content for the button
    */
    children?: ReactNode;
    /**
    * Style for the button
    */
    className?: string;
    /**
    * Style for the icons container
    */
    iconsClassName?: string;
    /**
    * Style for the children container
    */
    childrenClassName?: string;
    /**
    * Style for the actions container
    */
    actionsClassName?: string;
    /**
     * Disables the button
     */
    disabled?: boolean;
    /**
     * Makes the background of the button transparent
     */
    transparent?: boolean;
    /**
    * Content before main content of the button
    */
    icons?: ReactNode;
    /**
    * Content after main content of the button
    */
    actions?: ReactNode;
    /**
     * Makes the button compact, i.e. with low padding
     */
    compact?: boolean;
}

type ButtonFeatureKeys = 'variant' | 'className' | 'actionsClassName' | 'iconsClassName' | 'childrenClassName' | 'transparent' | 'children' | 'icons' | 'actions' | 'uiMode' | 'compact' | 'disabled';

export function useButtonFeatures(
    props: Pick<ButtonProps<string>, ButtonFeatureKeys>,
) {
    const {
        variant = 'default',
        className: classNameFromProps,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        disabled,
        transparent = false,
        children,
        icons,
        actions,
        uiMode,
        compact,
    } = props;

    const innerUiMode: UiMode = useMemo(() => {
        // NOTE: color is returned as ' #ffffff' in development but '#ffffff' on production
        const color = getComputedStyle(document.documentElement)
            .getPropertyValue(buttonVariantToVariableNameMap[variant])
            .trim();

        // Remove hash from color
        const luma = getContrastYIQ(color);
        const mode = luma >= 0.5 ? 'light' : 'dark';
        const invertMap: {
            [key in UiMode]: UiMode;
        } = {
            light: 'dark',
            dark: 'light',
        };

        return transparent ? invertMap[mode] : mode;
    }, [variant, transparent]);

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);
    const innerThemeClassName = useThemeClassName(
        innerUiMode,
        styles.innerLight,
        styles.innerDark,
    );

    const buttonClassName = _cs(
        classNameFromProps,
        styles.button,
        variant,
        styles[variant],
        transparent && styles.transparent,
        themeClassName,
        innerThemeClassName,
        compact && styles.compact,
        disabled && styles.disabled,
    );

    const buttonChildren = (
        <>
            {icons && (
                <div className={_cs(iconsClassName, styles.icons)}>
                    {icons}
                </div>
            )}
            {children && (
                <div className={_cs(childrenClassName, styles.children)}>
                    {children}
                </div>
            )}
            {actions && (
                <div className={_cs(actionsClassName, styles.actions)}>
                    {actions}
                </div>
            )}
        </>
    );

    return {
        className: buttonClassName,
        children: buttonChildren,
        uiMode: transparent ? uiMode : innerUiMode,
        disabled: disabled,
    };
}

/**
 * Basic button component
 */
function Button<N extends number | string | undefined>(props: ButtonProps<N>) {
    const {
        variant,
        className,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        transparent = false,
        children,
        icons,
        actions,
        uiMode,
        compact,

        type = 'button',
        ...otherProps
    } = props;

    const buttonProps = useButtonFeatures({
        variant,
        className,
        actionsClassName,
        iconsClassName,
        childrenClassName,
        transparent,
        children,
        icons,
        actions,
        uiMode,
        compact,
    });

    return (
        <RawButton
            type={type}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...buttonProps}
        />
    );
}

export default Button;
