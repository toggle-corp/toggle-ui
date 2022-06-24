import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DateTime, { DateTimeProps } from '../../src/components/DateTime';

export default {
    title: 'View/DateTime',
    component: DateTime,
    argTypes: {},
};

const Template: Story<DateTimeProps> = (args) => (
    <DateTime {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: '2012-10-12T23:19:07',
};

export const DateAndTime = Template.bind({});
DateAndTime.args = {
    value: '2012-10-12T23:19:07',
    format: 'datetime',
};
