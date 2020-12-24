import React from 'react';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawTextArea, { RawTextAreaProps } from '../RawTextArea';

export type TextAreaProps<T> = Omit<InputContainerProps, 'input'> & RawTextAreaProps<T>;

function TextArea<T extends string>(props: TextAreaProps<T>) {
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
        ...textAreaProps
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
                <RawTextArea
                    {...textAreaProps}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                />
            )}
        />
    );
}

export default TextArea;
