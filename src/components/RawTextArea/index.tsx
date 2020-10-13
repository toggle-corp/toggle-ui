import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface RawTextAreaProps<K> extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'ref' | 'onChange' | 'value' | 'name'> {
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
    onChange?: (
        value: string | undefined,
        name: K,
        e: React.FormEvent<HTMLTextAreaElement>,
    ) => void;
    /**
     * UI mode: light or dark
     */
    uiMode?: UiMode;
    /**
     * ref to the element
     */
    elementRef?: React.Ref<HTMLTextAreaElement>;
}
/**
 * The most basic input component (without styles)
 */
function RawTextArea<K extends string>(
    {
        className,
        onChange,
        uiMode,
        elementRef,
        value = '',
        name,
        ...otherProps
    }: RawTextAreaProps<K>,
) {
    const handleChange = React.useCallback(
        (e: React.FormEvent<HTMLTextAreaElement>) => {
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
        <textarea
            ref={elementRef}
            className={_cs(className, styles.rawTextArea, themeClassName)}
            onChange={handleChange}
            name={name}
            value={value}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export default RawTextArea;
