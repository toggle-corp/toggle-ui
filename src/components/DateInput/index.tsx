import React, { useCallback } from 'react';
import { IoMdTime } from 'react-icons/io';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';
import Button from '../Button';
import { getLocalISOString } from '../../utils';

export type DateInputProps<T> = Omit<InputContainerProps, 'input'> & RawInputProps<T>;

function DateInput<T extends string>(props: DateInputProps<T>) {
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
        ...rawInputProps
    } = props;

    const handleNowSet = useCallback(
        () => {
            if (!onChange) {
                return;
            }
            const value = getLocalISOString().substr(0, 10);
            onChange(value, name, undefined);
        },
        [onChange, name],
    );

    return (
        <InputContainer
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
                    name={name}
                    onChange={onChange}
                    readOnly={readOnly}
                    uiMode={uiMode}
                    disabled={disabled}
                    type="date"
                />
            )}
            actions={(
                <>
                    {actions}
                    {!readOnly && (
                        <Button
                            onClick={handleNowSet}
                            disabled={disabled}
                            transparent
                            compact
                            uiMode={uiMode}
                            name={undefined}
                            title="Set now"
                        >
                            <IoMdTime />
                        </Button>
                    )}
                </>
            )}
        />
    );
}

export default DateInput;
