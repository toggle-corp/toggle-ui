import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import LoadingAnimation, { LoadingAnimationProps } from '#components/LoadingAnimation';

export default {
    title: 'View/LoadingAnimation',
    component: LoadingAnimation,
    argTypes: {},
};

const Template: Story<LoadingAnimationProps> = (props) => (
    <LoadingAnimation {...props} />
);

export const Default = Template.bind({});
Default.args = {
};

export const Compact = Template.bind({});
Compact.args = {
    compact: true,
};
