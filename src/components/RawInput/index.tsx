import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ThemeContext, { UiMode } from '../ThemeContext';

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

const uiModeToStyleMap: {
    [key in UiMode]: string;
} = {
    light: styles.light,
    dark: styles.dark,
}

/**
 * The most basic input component (without styles)
 */
const RawInput = React.forwardRef<HTMLInputElement, RawInputProps>(
    ({
        className,
        onChange,
        uiMode: uiModeFromProps,
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

        const uiMode = uiModeFromProps || uiModeFromContext;

        return (
            <input
                ref={ref}
                className={_cs(className, styles.rawInput, uiModeToStyleMap[uiMode])}
                onChange={handleChange}
                {...otherProps}
            />
        );
    },
);

export default RawInput;
