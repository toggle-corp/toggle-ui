import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import useThemeClassName from '../../hooks/useThemeClassName';
import VisualFeedback from '../VisualFeedback';

import styles from './styles.css';

export interface RawButtonProps<N extends number | string | undefined> extends Omit<React.HTMLProps<HTMLButtonElement>, 'ref' | 'onClick' | 'name'>{
    /**
    * Style for the button
    */
    className?: string;
    /**
    * Gets called when user clicks on the button
    */
    onClick?: (name: N, e: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Type of the button
     */
    type?: 'button' | 'submit' | 'reset';
    uiMode?: UiMode;
    name: N;
    elementRef?: React.Ref<HTMLButtonElement>;

    focused?: boolean;
}

/**
 * The most basic button component (without styles)
 */
function RawButton<N extends number | string | undefined>(props: RawButtonProps<N>) {
    const {
        className,
        onClick,
        uiMode,
        children,
        disabled,
        elementRef,
        name,
        focused,
        ...otherProps
    } = props;

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(name, e);
            }
        },
        [onClick, name],
    );

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);
    return (
        <button
            ref={elementRef}
            type="button"
            className={_cs(className, styles.rawButton, themeClassName)}
            disabled={disabled}
            onClick={onClick ? handleClick : undefined}
            name={name as string}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        >
            <VisualFeedback
                disabled={disabled}
                uiMode={uiMode}
                focused={focused}
            />
            { children }
        </button>
    );
}

export default RawButton;
