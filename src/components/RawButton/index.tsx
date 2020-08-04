import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ThemeContext, { UiMode } from '../ThemeContext';
import VisualFeedback from '../VisualFeedback';

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
        children,
        disabled,
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
                disabled={disabled}
                onClick={onClick ? handleClick : undefined}
                {...otherProps}
            >
                <VisualFeedback disabled={disabled} />
                { children }
            </button>
        );
    },
);

export default RawButton;
