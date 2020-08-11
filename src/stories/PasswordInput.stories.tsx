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
    label: 'Password input',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};

