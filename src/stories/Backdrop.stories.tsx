import React from 'react';
// import { action } from '@storybook/addon-actions';
import Backdrop, { BackdropProps } from '#components/Backdrop';

export default {
    title: 'Backdrop',
    component: Backdrop,
    argTypes: {},
};

const Template = (args: BackdropProps) => (
    <Backdrop {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Backdrop',
    actions: 'actions',
};
