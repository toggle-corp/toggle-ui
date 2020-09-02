import React from 'react';

import Checkbox, { CheckboxProps } from '../Checkbox';
import SwitchIcon from '../SwitchIcon';

export interface SwitchProps<K extends boolean, N extends string> extends Omit<CheckboxProps<K, N>, 'indeterminate' | 'checkmark'> {
}

function Switch<K extends boolean, N extends string>(props: SwitchProps<K, N>) {
    return (
        <Checkbox
            {...props}
            checkmark={SwitchIcon}
        />
    );
}

export default Switch;
