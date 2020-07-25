import React from 'react';
import { action } from '@storybook/addon-actions';
// import { select, boolean } from '@storybook/addon-knobs';

import Button, { ButtonProps } from '#components/Button';

export default {
    title: 'Input/Button',
    component: Button,
    argTypes: {},
};

const Template = (args: ButtonProps) => (
    <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Test',
};

export const Transparent = Template.bind({});
Transparent.args = {
    children: 'Test',
    transparent: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Test',
    disabled: true,
};
