import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import DefaultCheckmark, { CheckmarkProps } from '../Checkmark';
import { UiMode } from '../ThemeContext';
import VisualFeedback from '../VisualFeedback';
import useThemeClassName from '../../hooks/useThemeClassName';

import styles from './styles.css';

export interface CheckboxProps<N> {
    className?: string;
    labelContainerClassName?: string;
    labelClassName?: string;
    checkmark?: (p: CheckmarkProps) => React.ReactElement;
    checkmarkClassName?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    indeterminate?: boolean;
    uiMode?: UiMode;
    tooltip?: string;
    value: boolean | undefined | null;
    onChange: (value: boolean, name: N) => void;
    name: N;
    errorContainerClassName?: string;
    hintContainerClassName?: string;
    error?: string;
    hint?: React.ReactNode;
}

function Checkbox<N extends string | number>(props: CheckboxProps<N>) {
    const {
        label,
        tooltip,
        checkmark: Checkmark = DefaultCheckmark,
        className: classNameFromProps,
        labelContainerClassName,
        value,
        disabled,
        readOnly,
        onChange,
        checkmarkClassName,
        labelClassName,
        indeterminate,
        uiMode,
        name,
        error,
        hint,
        errorContainerClassName,
        hintContainerClassName,
        ...otherProps
    } = props;

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const v = e.currentTarget.checked;
            onChange(v, name);
        },
        [name, onChange],
    );

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    const className = _cs(
        styles.checkbox,
        labelContainerClassName,
        indeterminate && styles.indeterminate,
        !indeterminate && value && styles.checked,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        themeClassName,
    );

    return (
        <div
            className={_cs(styles.container, classNameFromProps)}
        >
            <label // eslint-disable-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for, max-len
                className={className}
                title={tooltip}
            >
                <VisualFeedback
                    disabled={disabled}
                    readOnly={readOnly}
                />
                <Checkmark
                    className={_cs(checkmarkClassName, styles.checkmark)}
                    value={value ?? false}
                    indeterminate={indeterminate}
                    uiMode={uiMode}
                />
                <input
                    onChange={handleChange}
                    className={styles.input}
                    type="checkbox"
                    checked={value ?? false}
                    disabled={disabled || readOnly}
                    {...otherProps}
                />
                {label && (
                    <div className={_cs(styles.label, labelClassName)}>
                        { label }
                    </div>
                )}
            </label>
            {error && (
                <div className={_cs(styles.error, errorContainerClassName)}>
                    {error}
                </div>
            )}
            {!error && hint && (
                <div className={_cs(styles.hint, hintContainerClassName)}>
                    {hint}
                </div>
            )}
        </div>
    );
}

export default Checkbox;
