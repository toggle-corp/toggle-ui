import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
// import ThemeContext, { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface RawInputProps<K> extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'value' | 'name'>{
    /**
    * Style for the input
    */
    className?: string;
    /**
    * input name
    */
    name: K;
    /**
    * input value
    */
    value: string;
    /**
    * Gets called when the content of input changes
    */
    onChange?: (value: string, name: K, e: React.FormEvent<HTMLInputElement>) => void;
    /**
     * uiMode: light or dark
     */
    uiMode?: UiMode;
}

/**
 * The most basic input component (without styles)
 */
function RawInput<K extends string>(
    {
        className,
        onChange,
        uiMode,
        ...otherProps
    }: RawInputProps<K>,
) {
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
                    name as K,
                    e,
                );
            }
        },
        [onChange],
    );

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <input
            className={_cs(className, styles.rawInput, themeClassName)}
            onChange={handleChange}
            {...otherProps}
        />
    );
}
// );

export default RawInput;
