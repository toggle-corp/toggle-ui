import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import SwitchIcon, { SwitchIconProps } from '#components/SwitchIcon';

export default {
    title: 'Input/Private/SwitchIcon',
    component: SwitchIcon,
    argTypes: {},
};

const Template: Story<SwitchIconProps> = (args) => (
    <SwitchIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: false,
};
