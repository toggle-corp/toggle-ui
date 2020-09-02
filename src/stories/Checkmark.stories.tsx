import React from 'react';
import Checkmark, { CheckmarkProps } from '#components/Checkmark';

export default {
    title: 'Input/Private/Checkmark',
    component: Checkmark,
    argTypes: {},
};

const Template = (args: CheckmarkProps) => (
    <Checkmark {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: false,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
    value: false,
    indeterminate: true,
};
