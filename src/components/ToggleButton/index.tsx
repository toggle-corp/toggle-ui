import React from 'react';

import Button, { ButtonProps } from '../Button';

export interface ToggleButtonProps<N extends number | string | undefined> extends Omit<ButtonProps<N>, 'value' | 'onClick' | 'onChange'> {
    value: boolean;
    onChange: (
        value: boolean,
        name: N,
        e: React.MouseEvent<HTMLButtonElement>,
    ) => void;
}

function ToggleButton<N extends number | string | undefined>(props: ToggleButtonProps<N>) {
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
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export default ToggleButton;
