import React from 'react';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';

type TextInputProps<T> = Omit<InputContainerProps, 'input'> & RawInputProps<T>;

function TextInput<T extends string>(props: TextInputProps<T>) {
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
                <RawInput<T>
                    {...rawInputProps}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                />
            )}
        />
    );
}

export default TextInput;
