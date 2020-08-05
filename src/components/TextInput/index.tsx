import React from 'react';
import { _cs } from '@togglecorp/fujs';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';

export interface TextInputProps extends Omit<InputContainerProps & RawInputProps, 'input'> {
    className?: string;
}

function TextInput(props: TextInputProps) {
    const {
        labelContainerClassName,
        iconsContainerClassName,
        actionsContainerClassName,
        inputSectionClassName,
        className,
        label,
        icons,
        actions,
        hintAndError,
        ...rawInputProps
    } = props;

    return (
        <InputContainer
            label={label}
            icons={icons}
            actions={actions}
            hintAndError={hintAndError}
            input={
                <RawInput
                    {...rawInputProps}
                />
            }
        />
    );
}

export default TextInput;
