import React from 'react';
import { action } from '@storybook/addon-actions';

import PasswordInput, { PasswordInputProps } from '#components/PasswordInput';

export default {
    title: 'Input/PasswordInput',
    component: PasswordInput,
    argTypes: {},
};

const Template = (args: PasswordInputProps) => (
    <PasswordInput {...args} />
);

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
