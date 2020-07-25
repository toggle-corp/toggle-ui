import React from 'react';
import { _cs } from '@togglecorp/fujs';

import RawButton, { RawButtonProps } from '../RawButton';

import styles from './styles.css';

export type ButtonVariant = (
    'accent'
    | 'danger'
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
);

export interface ButtonProps extends Omit<RawButtonProps, 'ref'> {
    /**
    * variant defines the color
    */
    variant?: ButtonVariant;
    /**
    * content of the button
    */
    children?: React.ReactNode;
    /**
    * className to override styling
    */
    className?: string;
    /**
    * specify that button is disabled
    */
    disabled?: boolean;
    /**
    * a transparent button has no background
    */
    transparent?: boolean;
    icons?: React.ReactNode;
}

/**
 * Styled button
 */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        variant = 'default',
            className: classNameFromProps,
        disabled = false,
            transparent = false,
            type,
        onClick,
        children,
        icons,
        ...otherProps
    }, ref) => {
        const buttonClassName = _cs(
            classNameFromProps,
            'button',
            styles.button,
            variant,
            styles[variant],
            transparent && 'transparent',
            transparent && styles.transparent,
        );

        return (
            <RawButton
                // ref={ref}
                className={buttonClassName}
                disabled={disabled}
                onClick={onClick}
                type={type}
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
            </RawButton>

        );
    },
);

export default Button;
