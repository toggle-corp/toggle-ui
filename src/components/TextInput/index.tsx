import React from 'react';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInputWithSuggestion, { RawInputWithSuggestionProps } from '../RawInputWithSuggestion';

export type TextInputProps<T extends string, S> = Omit<InputContainerProps, 'input'>
    & RawInputWithSuggestionProps<T, S, 'containerRef' | 'inputSectionRef'>;

function TextInput<T extends string, S>(props: TextInputProps<T, S>) {
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
        ...textInputProps
    } = props;

    // const containerRef = React.useRef<HTMLDivElement>(null);
    const inputSectionRef = React.useRef<HTMLDivElement>(null);

    return (
        <InputContainer
            // ref={containerRef}
            inputSectionRef={inputSectionRef}
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
                <RawInputWithSuggestion<T, S>
                    {...textInputProps}
                    containerRef={inputSectionRef}
                    inputSectionRef={inputSectionRef}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                    type="text"
                />
            )}
        />
    );
}

export default TextInput;
