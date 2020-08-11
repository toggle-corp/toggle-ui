import React from 'react';
import { action } from '@storybook/addon-actions';

import InputContainer, { InputContainerProps } from '#components/InputContainer';

export default {
    title: 'Input/Private/InputContainer',
    component: InputContainer,
    argTypes: {},
};

const Template = (args: InputContainerProps) => (
    <InputContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'label',
    icons: 'icons',
    input: 'input',
    actions: 'actions',
    hintAndError: 'hint and error',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'label',
    icons: 'icons',
    input: 'input',
    actions: 'actions',
    hintAndError: 'hint and error',
    disabled: true,
};
