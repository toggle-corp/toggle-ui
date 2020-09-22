import React, { useState, useLayoutEffect, useCallback } from 'react';
import { isDefined, isFalsyString, isTruthyString, bound } from '@togglecorp/fujs';
import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';

function isValidNumericString(val: string) {
    return /^[+-]?\d+(\.\d+)?$/.test(val);
}
function isValidDecimalTrailingZeroString(val: string) {
    return /^[+-]?\d+\.\d*0$/.test(val);
}

export type NumberInputProps<T> = Omit<InputContainerProps, 'input'> & Omit<RawInputProps<T>, 'onChange' | 'value'> & {
    value: number | undefined;
    onChange?: (value: number | undefined, name: T, e: React.FormEvent<HTMLInputElement>) => void;
};

function NumberInput<T extends string>(props: NumberInputProps<T>) {
    const {
        actions,
        actionsContainerClassName,
        className,
        disabled,
        error,
        errorContainerClassName,
        hint,
        hintContainerClassName,
        icons,
        iconsContainerClassName,
        inputSectionClassName,
        label,
        labelContainerClassName,
        readOnly,
        uiMode,
        onChange,
        name,
        value,
        ...rawInputProps
    } = props;

    const [tempValue, setTempValue] = useState<string | undefined>();

    useLayoutEffect(
        () => {
            // NOTE: we don't clear tempValue if it is equal to input value
            // eg. tempValue: 1.00000, value: 1
            setTempValue((val) => (
                isValidNumericString(val) && +val === value
                    ? val
                    : undefined
            ));
        },
        [value],
    );

    const handleChange = React.useCallback(
        (v: string, n: T, event: React.FormEvent<HTMLInputElement>) => {
            if (isFalsyString(v)) {
                setTempValue(undefined);
                onChange(undefined, n, event);
            }

            if (!isValidNumericString(v)) {
                setTempValue(v);
            } else {
                // NOTE: we set tempValue if it is valid but is a transient state
                // eg. 1.0000 is valid but transient
                setTempValue(
                    isValidDecimalTrailingZeroString(v)
                        ? v
                        : undefined,
                );
                const numericValue = bound(
                    +v,
                    -Number.MAX_SAFE_INTEGER,
                    Number.MAX_SAFE_INTEGER,
                );
                onChange(numericValue, n, event);
            }
        },
        [onChange],
    );

    const handleFocusOut = useCallback(
        () => {
            setTempValue(undefined);
        },
        [],
    );

    const finalValue = tempValue ?? (isDefined(value) ? String(value) : undefined);

    return (
        <InputContainer
            actions={actions}
            actionsContainerClassName={actionsContainerClassName}
            className={className}
            disabled={disabled}
            error={error}
            errorContainerClassName={errorContainerClassName}
            hint={hint}
            hintContainerClassName={hintContainerClassName}
            icons={icons}
            iconsContainerClassName={iconsContainerClassName}
            inputSectionClassName={inputSectionClassName}
            label={label}
            labelContainerClassName={labelContainerClassName}
            readOnly={readOnly}
            uiMode={uiMode}
            invalid={isTruthyString(tempValue)}
            input={(
                <RawInput<T>
                    {...rawInputProps}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                    onChange={handleChange}
                    onBlur={handleFocusOut}
                    name={name}
                    value={finalValue}
                />
            )}
        />
    );
}

export default NumberInput;
