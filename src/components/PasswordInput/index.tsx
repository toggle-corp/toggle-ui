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
            className={_cs(styles.passwordInput, className)}
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
                    {actions}
                    <ToggleButton
                        value={showPassword}
                        onChange={setShowPassword}
                        className={styles.showPasswordToggleButton}
                        disabled={disabled}
                        transparent
                        uiMode={uiMode}
                        compact
                        name={undefined}
                        title={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </ToggleButton>
                </>
            )}
            input={(
                <RawInput
                    // eslint-disable-next-line react/jsx-props-no-spreading
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
