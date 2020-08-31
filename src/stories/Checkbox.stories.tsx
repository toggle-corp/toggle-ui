import React from 'react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import Checkbox, { CheckboxProps } from '#components/Checkbox';

export default {
    title: 'Input/Checkbox',
    component: Checkbox,
    argTypes: {},
};

const Template = (args: CheckboxProps) => {
    const [{ value }, updateArgs] = useArgs();

    const handleClick = (e) => {
        updateArgs({ value: e });
    };

    return (
        <Checkbox
            {...args}
            value={value}
            onChange={handleClick}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Checkbox',
    value: false,
    disabled: false,
    indeterminate: false,
    readOnly: false,
};

export const Readonly = Template.bind({});
Readonly.args = {
    label: 'Checkbox',
    value: false,
    disabled: false,
    indeterminate: false,
    readOnly: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Checkbox',
    value: false,
    indeterminate: false,
    readOnly: false,
    disabled: true,
};
