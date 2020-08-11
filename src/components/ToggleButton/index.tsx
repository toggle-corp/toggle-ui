import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { ButtonProps } from '../Button';

export interface ToggleButtonProps extends Omit<ButtonProps, 'value' | 'onClick' | 'onChange'> {
    value: boolean;
    onChange: (value: boolean, name: string | undefined, e: React.MouseEvent<HTMLButtonElement>) => void; 
}

function ToggleButton(props: ToggleButtonProps) {
    const {
        value,
        onChange,
        ...otherProps
    } = props;

    const handleButtonClick = React.useCallback((name, e) => {
        if (onChange) {
            onChange(!value, name, e);
        }
    }, [onChange, value]);

    return (
        <Button
            onClick={handleButtonClick}
            {...otherProps}
        />
    );
}

export default ToggleButton;
