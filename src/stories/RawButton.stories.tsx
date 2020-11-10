import React from 'react';
import { Story } from '@storybook/react/types-6-0';
// import { select, boolean } from '@storybook/addon-knobs';

import RawButton, { RawButtonProps } from '#components/RawButton';

export default {
    title: 'Action/Private/RawButton',
    component: RawButton,
    argTypes: {},
};

const Template: Story<RawButtonProps<string>> = (args) => (
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
