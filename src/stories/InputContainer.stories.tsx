import React from 'react';
import { action } from '@storybook/addon-actions';

import InputContainer, { InputContainerProps } from '#components/InputContainer';
import RawInput from '#components/RawInput';

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
    input: (<RawInput type="text" placeholder="Here goes the input" />),
    actions: 'actions',
};

export const Error = Template.bind({});
Error.args = {
    label: 'label',
    icons: 'icons',
    input: (<RawInput type="text" placeholder="Here goes the input" />),
    actions: 'actions',
    error: 'Some error occured',
};

export const Hint = Template.bind({});
Hint.args = {
    label: 'label',
    icons: 'icons',
    input: (<RawInput type="text" placeholder="Here goes the input" />),
    actions: 'actions',
    hint: 'Please get this hint',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'label',
    icons: 'icons',
    input: (<RawInput type="text" placeholder="Here goes the input" />),
    actions: 'actions',
    hint: 'hint',
    error: 'error',
    disabled: true,
};
