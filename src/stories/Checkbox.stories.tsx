import React from 'react';
import { useArgs } from '@storybook/client-api';
import Checkbox, { CheckboxProps } from '#components/Checkbox';

export default {
    title: 'Input/Checkbox',
    component: Checkbox,
    argTypes: {},
};

const Template = (args: CheckboxProps) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e) => {
        updateArgs({ value: e });
    };

    return (
        <Checkbox
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Ready!',
    value: false,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
    label: 'Get set!',
    value: false,
    indeterminate: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
    label: 'GO! GO! GO!',
    value: false,
    readOnly: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Can\'t check it',
    value: false,
    disabled: true,
};
