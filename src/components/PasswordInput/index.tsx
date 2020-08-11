import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput, { RawInputProps } from '../RawInput';
import ToggleButton from '../ToggleButton';

import styles from './styles.css';

export interface PasswordInputProps extends Omit<InputContainerProps & RawInputProps, 'input'> {
}

function PasswordInput(props: PasswordInputProps) {
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
            actions={
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
            }
            hintAndError={hintAndError}
            input={
                <RawInput
                    {...rawInputProps}
                    uiMode={uiMode}
                    readOnly={readOnly}
                    disabled={disabled}
                    type={showPassword ? "text" : "password"}
                />
            }
        />
    );
}

export default PasswordInput;
