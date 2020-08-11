import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ThemeContext, { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface RawInputProps<T=string> extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'value'>{
    /**
    * Style for the input 
    */
    className?: string;
    /**
    * input name
    */
    name?: string;
    value: T;
    /**
    * Gets called when the content of input changes
    */
    onChange?: (value: T, name: string | undefined, e: React.FormEvent<HTMLInputElement>) => void;
    /**
     * uiMode: light or dark
     */
    uiMode?: UiMode;
}

/**
 * The most basic input component (without styles)
 */
const RawInput = React.forwardRef<HTMLInputElement, RawInputProps>(
    ({
        className,
        onChange,
        uiMode,
        ...otherProps
    }, ref) => {
        const { uiMode: uiModeFromContext } = React.useContext(ThemeContext);

        const handleChange = React.useCallback(
            (e: React.FormEvent<HTMLInputElement>) => {
                const {
                    currentTarget: {
                        name,
                        value,
                    },
                } = e;

                if (onChange) {
                    onChange(
                        value,
                        name,
                        e,
                    );
                }
            },
            [onChange],
        );

        const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

        return (
            <input
                ref={ref}
                className={_cs(className, styles.rawInput, themeClassName)} 
                onChange={handleChange}
                {...otherProps}
            />
        );
    },
);

export default RawInput;