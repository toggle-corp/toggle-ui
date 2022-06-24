import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import YesNo, { YesNoProps } from '../../src/components/YesNo';

export default {
    title: 'View/YesNo',
    component: YesNo,
    argTypes: {},
};

const Template: Story<YesNoProps> = (args) => (
    <YesNo {...args} />
);

export const Positive = Template.bind({});
Positive.args = {
    value: true,
};

export const Negative = Template.bind({});
Negative.args = {
    value: false,
};

export const NoValue = Template.bind({});
NoValue.args = {
    value: undefined,
};
