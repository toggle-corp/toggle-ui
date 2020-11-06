import React from 'react';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';

export type TimeInputProps<T> = Omit<InputContainerProps, 'input'> & RawInputProps<T>;

function TimeInput<T extends string>(props: TimeInputProps<T>) {
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
        ...rawInputProps
    } = props;

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
                    type="time"
                />
            )}
        />
    );
}

export default TimeInput;
