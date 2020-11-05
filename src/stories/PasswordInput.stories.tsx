import React from 'react';
import { useArgs } from '@storybook/client-api';

import PasswordInput, { PasswordInputProps } from '#components/PasswordInput';

export default {
    title: 'Input/PasswordInput',
    component: PasswordInput,
    argTypes: {},
};

const Template = (args: PasswordInputProps) => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (e) => {
        updateArgs({ value: e });
    };
    return (
        <PasswordInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Password',
};

export const Readonly = Template.bind({});
Readonly.args = {
    label: 'Password',
    readOnly: true,
    value: 'xyz',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Password',
    disabled: true,
    value: 'xyz',
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    label: 'Password',
    placeholder: 'Enter Password',
};
