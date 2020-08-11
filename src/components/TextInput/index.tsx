import React from 'react';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';

export interface TextInputProps extends Omit<InputContainerProps & RawInputProps, 'input'> {
}

function TextInput(props: TextInputProps) {
    const {
        /* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
        labelContainerClassName,
        iconsContainerClassName,
        actionsContainerClassName,
        inputSectionClassName,
        className,
        /* eslint-enable no-unused-vars, @typescript-eslint/no-unused-vars */
        uiMode,
        label,
        icons,
        actions,
        hintAndError,
        disabled,
        readOnly,
        ...rawInputProps
    } = props;

    return (
        <InputContainer
            label={label}
            icons={icons}
            actions={actions}
            hintAndError={hintAndError}
            disabled={disabled}
            uiMode={uiMode}
            readOnly={readOnly}
            input={(
                <RawInput
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                    {...rawInputProps}
                />
            )}
        />
    );
}

export default TextInput;
