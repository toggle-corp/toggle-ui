import React from 'react';
import { action } from '@storybook/addon-actions';

import TextInput, { TextInputProps } from '#components/TextInput';

export default {
    title: 'Input/TextInput',
    component: TextInput,
    argTypes: {},
};

const Template = (args: TextInputProps) => (
    <TextInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};

