import React from 'react';
import { getNumberAndSign } from '../../utils';
import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';

export type NumberInputProps<T> = Omit<InputContainerProps, 'input'> & Omit<RawInputProps<T>, 'onChange'> & {
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

    const handleChange = (v: string, n: T, e: React.FormEvent<HTMLInputElement>) => {
        if (onChange) {
            const {
                number = '',
                sign = '',
            } = getNumberAndSign(v);
            let realValue: number | undefined;
            if (number === '' && sign !== '') {
                realValue = NaN;
            } else if (number === '' && sign === '') {
                realValue = undefined;
            } else {
                realValue = +`${sign}${number}`;
            }
            onChange(realValue, n, e);
        }
    };

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
            input={(
                <RawInput<T>
                    {...rawInputProps}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                    onChange={handleChange}
                    type="number"
                    name={name}
                    value={value}
                />
            )}
        />
    );
}

export default NumberInput;
