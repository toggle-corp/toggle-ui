import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import InputContainer, { InputContainerProps } from '../../src/components/InputContainer';
import RawInput from '../../src/components/RawInput';

export default {
    title: 'Input/Private/InputContainer',
    component: InputContainer,
    argTypes: {},
};

const Template: Story<InputContainerProps> = (args) => (
    <InputContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'label',
    icons: 'icons',
    input: (<RawInput name="in" value={undefined} type="text" placeholder="Here goes the input" />),
    actions: 'actions',
};

export const Error = Template.bind({});
Error.args = {
    label: 'label',
    icons: 'icons',
    input: (<RawInput name="in" value={undefined} type="text" placeholder="Here goes the input" />),
    actions: 'actions',
    error: 'Some error occured',
};

export const Hint = Template.bind({});
Hint.args = {
    label: 'label',
    icons: 'icons',
    input: (<RawInput name="in" value={undefined} type="text" placeholder="Here goes the input" />),
    actions: 'actions',
    hint: 'Please get this hint',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'label',
    icons: 'icons',
    input: (<RawInput name="in" value={undefined} type="text" placeholder="Here goes the input" />),
    actions: 'actions',
    hint: 'hint',
    error: 'error',
    disabled: true,
};
