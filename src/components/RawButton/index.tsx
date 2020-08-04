import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ThemeContext, { UiMode } from '../ThemeContext';

import styles from './styles.css';

export interface RawButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'ref' | 'onClick'>{
    /**
    * Style for the button
    */
    className?: string;
    /**
    * Gets called when user clicks on the button
    */
    onClick?: (name: string | undefined, e: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Type of the button
     */
    type?: 'button' | 'submit' | 'reset';
    uiMode?: UiMode;
}

/**
 * The most basic button component (without styles)
 */
const RawButton = React.forwardRef<HTMLButtonElement, RawButtonProps>(
    ({
        className,
        onClick,
        uiMode: uiModeFromProps,
        ...otherProps
    }, ref) => {
        const handleClick = React.useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                const {
                    currentTarget: {
                        name,
                    },
                } = e;

                if (onClick) {
                    onClick(
                        name,
                        e,
                    );
                }
            },
            [onClick],
        );

        return (
            <button
                ref={ref}
                type="button"
                className={_cs(className, styles.rawButton)}
                onClick={onClick ? handleClick : undefined}
                {...otherProps}
            />
        );
    },
);

export default RawButton;
