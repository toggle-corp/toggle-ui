import React from 'react';
import { action } from '@storybook/addon-actions';

import RawInput, { RawInputProps } from '#components/RawInput';

export default {
    title: 'Input/Private/Input',
    component: RawInput,
    argTypes: {},
};

const Template = (args: RawInputProps) => (
    <RawInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};
