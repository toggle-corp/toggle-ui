import React from 'react';
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
}

export interface ButtonProps extends Omit<RawButtonProps, 'ref'> {
    /**
    * Variant of the button
    */
    variant?: ButtonVariant;
    /**
    * Content for the button
    */
    children?: React.ReactNode;
    /**
    * Style for the button
    */
    className?: string;
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
    icons?: React.ReactNode;
    /**
    * Content after main content of the button
    */
    actions?: React.ReactNode;
}

/**
 * Basic button component
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        variant = 'default',
        className: classNameFromProps,
        disabled = false,
        transparent = false,
        type,
        onClick,
        children,
        icons,
        actions,
        ...otherProps
    }, ref) => {
        const uiMode: UiMode = React.useMemo(() => {
            const color = getComputedStyle(document.documentElement)
                .getPropertyValue(buttonVariantToVariableNameMap[variant]);

            // Remove hash from color
            const luma = getContrastYIQ(color.substr(1, color.length));
            return luma >= 0.5 ? 'light' : 'dark'; 
        }, [variant]);

        const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

        const buttonClassName = _cs(
            classNameFromProps,
            styles.button,
            variant,
            styles[variant],
            transparent && 'transparent',
            transparent && styles.transparent,
            themeClassName,
        );

        return (
            <RawButton
                ref={ref}
                className={buttonClassName}
                disabled={disabled}
                onClick={onClick}
                type={type}
                uiMode={uiMode}
                {...otherProps}
            >
                {icons && (
                    <div className={styles.icons}>
                        { icons }
                    </div>
                )}
                {children && (
                    <div className={styles.children}>
                        { children }
                    </div>
                )}
                {icons && (
                    <div className={styles.actions}>
                        { actions }
                    </div>
                )}
            </RawButton>

        );
    },
);

export default Button;
