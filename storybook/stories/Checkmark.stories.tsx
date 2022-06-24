import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Checkmark, { CheckmarkProps } from '../../src/components/Checkmark';

export default {
    title: 'Input/Private/Checkmark',
    component: Checkmark,
    argTypes: {},
};

const Template: Story<CheckmarkProps> = (args) => (
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
