import React, { useMemo, useCallback } from 'react';
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdIndeterminateCheckBox,
} from 'react-icons/md';
import {
    randomString,
    _cs,
} from '@togglecorp/fujs';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface CheckboxProps {
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
    value: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
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
        ...otherProps
    } = props;

    const inputId = useMemo(
        () => randomString(16),
        [],
    );

    const handleChange = useCallback(
        (e) => {
            const v = e.target.checked;
            onChange(v);
        },
        [onChange],
    );

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    const className = _cs(
        styles.checkbox,
        'checkbox',
        classNameFromProps,
        (value || indeterminate) && styles.checked,
        (value || indeterminate) && 'checked',
        disabled && styles.disabled,
        disabled && 'disabled',
        readOnly && styles.readOnly,
        readOnly && 'read-only',
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
        <label
            htmlFor={inputId}
            className={className}
            title={tooltip}
        >
            {value && (
                <MdCheckBox
                    className={iconClassName}
                />
            )}
            {!value && indeterminate && (
                <MdIndeterminateCheckBox
                    className={iconClassName}
                />
            )}
            {!value && !indeterminate && (
                <MdCheckBoxOutlineBlank
                    className={iconClassName}
                />
            )}
            <input
                id={inputId}
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
};

Checkbox.defaultProps = {
    disabled: false,
    readOnly: false,
    value: false,
};

export default Checkbox;
