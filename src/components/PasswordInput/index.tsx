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
        /* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
        labelContainerClassName,
        iconsContainerClassName,
        actionsContainerClassName,
        inputSectionClassName,
        /* eslint-enable no-unused-vars, @typescript-eslint/no-unused-vars */
        className,
        label,
        icons,
        actions,
        hintAndError,
        uiMode,
        disabled,
        readOnly,
        ...rawInputProps
    } = props;

    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <InputContainer
            className={_cs(styles.passwordInput, className)}
            label={label}
            icons={icons}
            disabled={disabled}
            uiMode={uiMode}
            readOnly={readOnly}
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
            hintAndError={hintAndError}
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
