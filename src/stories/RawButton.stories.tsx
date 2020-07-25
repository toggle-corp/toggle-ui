import React from 'react';
import { action } from '@storybook/addon-actions';
// import { select, boolean } from '@storybook/addon-knobs';

import RawButton, { RawButtonProps } from '#components/RawButton';

export default {
    title: 'Input/RawButton',
    component: RawButton,
    argTypes: {},
};

const Template = (args: RawButtonProps) => (
    <RawButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Test',
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Test',
    disabled: true,
};
