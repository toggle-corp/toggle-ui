import React, { useCallback } from 'react';
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdIndeterminateCheckBox,
} from 'react-icons/md';
import { _cs } from '@togglecorp/fujs';
import { UiMode } from '../ThemeContext';
import VisualFeedback from '../VisualFeedback';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface CheckboxProps<T, K> {
    className?: string;
    labelClassName?: string;
    checkIconClassName?: string;
    label?: string | number;
    disabled?: boolean;
    readOnly?: boolean;
    // NOTE: if value is false and indeterminate is true, show a filled checkbox
    indeterminate?: boolean;
    uiMode?: UiMode;
    tooltip?: string;
    value: T;
    onChange: (value: T, name: K) => void;
    name: K;
}

function Checkbox<T extends boolean, K extends string>(props: CheckboxProps<T, K>) {
    const {
        label,
        tooltip,
        className: classNameFromProps,
        value,
        disabled,
        readOnly,
        onChange,
        checkIconClassName,
        labelClassName: labelClassNameFromProps,
        indeterminate,
        uiMode,
        name,
        ...otherProps
    } = props;

    const handleChange = useCallback(
        (e) => {
            const v = e.target.checked;
            onChange(v, name);
        },
        [name, onChange],
    );

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    const className = _cs(
        styles.checkbox,
        'tui-checkbox',
        classNameFromProps,
        indeterminate && styles.indeterminate,
        indeterminate && 'tui-indeterminate',
        !indeterminate && value && styles.checked,
        !indeterminate && value && 'tui-checked',
        disabled && styles.disabled,
        disabled && 'tui-disabled',
        readOnly && styles.readOnly,
        readOnly && 'tui-read-only',
        themeClassName,
    );

    const iconClassName = _cs(
        styles.checkmark,
        'checkmark',
        checkIconClassName,
    );

    const inputClassName = _cs(
        'input',
        styles.input,
    );

    const labelClassName = _cs(
        'label',
        styles.label,
        labelClassNameFromProps,
    );

    return (
        <label // eslint-disable-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
            className={className}
            title={tooltip}
        >
            <VisualFeedback />
            {indeterminate && (
                <MdIndeterminateCheckBox
                    className={iconClassName}
                />
            )}
            {value && !indeterminate && (
                <MdCheckBox
                    className={iconClassName}
                />
            )}
            {!value && !indeterminate && (
                <MdCheckBoxOutlineBlank
                    className={iconClassName}
                />
            )}
            <input
                onChange={handleChange}
                className={inputClassName}
                type="checkbox"
                checked={value}
                disabled={disabled || readOnly}
                {...otherProps}
            />
            <div className={labelClassName}>
                { label }
            </div>
        </label>
    );
}

export default Checkbox;
