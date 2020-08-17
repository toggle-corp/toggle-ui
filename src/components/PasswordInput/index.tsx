import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';
import ToggleButton from '../ToggleButton';

import styles from './styles.css';

export type PasswordInputProps<T> = Omit<InputContainerProps, 'input'> & RawInputProps<T>;

function PasswordInput<T extends string>(props: PasswordInputProps<T>) {
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

    const [showPassword, setShowPassword] = React.useState(false);

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
            actions={(
                <>
                    <ToggleButton
                        value={showPassword}
                        onChange={setShowPassword}
                        className={styles.showPasswordToggleButton}
                        disabled={disabled}
                        transparent
                        uiMode={uiMode}
                    >
                        { showPassword ? <IoMdEyeOff /> : <IoMdEye /> }
                    </ToggleButton>
                    { actions }
                </>
            )}
            input={(
                <RawInput
                    {...rawInputProps}
                    uiMode={uiMode}
                    readOnly={readOnly}
                    disabled={disabled}
                    type={showPassword ? 'text' : 'password'}
                />
            )}
        />
    );
}

export default PasswordInput;
