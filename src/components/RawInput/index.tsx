import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface RawInputProps<K> extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'value' | 'name'> {
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
    value: string | undefined;
    /**
    * Gets called when the content of input changes
    */
    onChange?: (value: string | undefined, name: K, e: React.FormEvent<HTMLInputElement>) => void;
    /**
     * UI mode: light or dark
     */
    uiMode?: UiMode;
    /**
     * ref to the element
     */
    elementRef?: React.Ref<HTMLInputElement>;
}
/**
 * The most basic input component (without styles)
 */
function RawInput<K extends string>(
    {
        className,
        onChange,
        uiMode,
        elementRef,
        value = '',
        name,
        ...otherProps
    }: RawInputProps<K>,
) {
    const handleChange = React.useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const {
                currentTarget: {
                    value: v,
                },
            } = e;

            if (onChange) {
                onChange(
                    v === '' ? undefined : v,
                    name,
                    e,
                );
            }
        },
        [name, onChange],
    );

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <input
            ref={elementRef}
            className={_cs(className, styles.rawInput, themeClassName)}
            onChange={handleChange}
            name={name}
            value={value}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export default RawInput;
