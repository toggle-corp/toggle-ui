import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import DefaultCheckmark, { CheckmarkProps } from '../Checkmark';
import { UiMode } from '../ThemeContext';
import VisualFeedback from '../VisualFeedback';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface CheckboxProps<K, N> {
    className?: string;
    labelClassName?: string;
    checkmark?: (p: CheckmarkProps) => React.ReactElement;
    checkmarkClassName?: string;
    label?: React.ReactNode;
    disabled?: boolean;
    readOnly?: boolean;
    indeterminate?: boolean;
    uiMode?: UiMode;
    tooltip?: string;
    value: K;
    onChange: (value: K, name: N) => void;
    name: N;
}

function Checkbox<K extends boolean, N extends string>(props: CheckboxProps<K, N>) {
    const {
        label,
        tooltip,
        checkmark: Checkmark = DefaultCheckmark,
        className: classNameFromProps,
        value,
        disabled,
        readOnly,
        onChange,
        checkmarkClassName,
        labelClassName,
        indeterminate,
        uiMode,
        name,
        ...otherProps
    } = props;

    const handleChange = useCallback(
        (e: React.FormEvent<HTMLInputElement>) => {
            const v = e.currentTarget.checked;
            onChange(v as K, name);
        },
        [name, onChange],
    );

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    const className = _cs(
        styles.checkbox,
        classNameFromProps,
        indeterminate && styles.indeterminate,
        !indeterminate && value && styles.checked,
        disabled && styles.disabled,
        readOnly && styles.readOnly,
        themeClassName,
    );

    return (
        <label // eslint-disable-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
            className={className}
            title={tooltip}
        >
            <VisualFeedback
                disabled={disabled}
                readOnly={readOnly}
            />
            <Checkmark
                className={_cs(checkmarkClassName, styles.checkmark)}
                value={value}
                indeterminate={indeterminate}
                uiMode={uiMode}
            />
            <input
                onChange={handleChange}
                className={styles.input}
                type="checkbox"
                checked={value}
                disabled={disabled || readOnly}
                {...otherProps}
            />
            <div className={_cs(styles.label, labelClassName)}>
                { label }
            </div>
        </label>
    );
}

export default Checkbox;
