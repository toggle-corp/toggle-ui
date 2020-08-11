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
    label: 'Enter text',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Enter text',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Name',
    value: 'Mr. Frozen Helium',
    readOnly: true,
};
