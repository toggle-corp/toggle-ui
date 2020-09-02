import React from 'react';
import SwitchIcon, { SwitchIconProps } from '#components/SwitchIcon';

export default {
    title: 'Input/Private/SwitchIcon',
    component: SwitchIcon,
    argTypes: {},
};

const Template = (args: SwitchIconProps) => (
    <SwitchIcon {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: false,
};
