import React from 'react';

import InputContainer, { InputContainerProps } from '../InputContainer';
import { UiMode } from '../ThemeContext';

export type TextAreaProps<T> = Omit<InputContainerProps, 'input'> & {
    name: T;
    value: string | undefined;
    onChange?: (
        value: string | undefined,
        name: T,
        e: React.FormEvent<HTMLTextAreaElement>,
    ) => void;
    uiMode?: UiMode;

};

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
        onChange,
        value,
        name,
        ...textAreaProps
    } = props;

    const handleChange = React.useCallback(
        (e: React.FormEvent<HTMLTextAreaElement>) => {
            const {
                currentTarget: {
                    value: v,
                },
            } = e;

            if (onChange) {
                onChange(
                    v === '' ? undefined : v,
                    name,
                    e,
                );
            }
        },
        [name, onChange],
    );

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
                <textarea
                    {...textAreaProps}
                    onChange={handleChange}
                    value={value}
                />
            )}
        />
    );
}

export default TextArea;
