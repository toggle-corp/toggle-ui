import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import DateTimeRange, { DateTimeRangeProps } from '#components/DateTimeRange';

export default {
    title: 'View/DateTimeRange',
    component: DateTimeRange,
    argTypes: {},
};

const Template: Story<DateTimeRangeProps> = (args) => (
    <DateTimeRange {...args} />
);

export const Default = Template.bind({});
Default.args = {
    from: '2012-10-12T17:19:17',
    to: '2014-08-19T14:14:21',
};

export const DateAndTime = Template.bind({});
DateAndTime.args = {
    from: '2012-10-12T17:19:17',
    to: '2014-08-19T14:14:21',
    format: 'datetime',
};

export const OnlyFrom = Template.bind({});
OnlyFrom.args = {
    from: '2012-10-12T17:19:17',
};

export const OnlyTo = Template.bind({});
OnlyTo.args = {
    to: '2014-08-19T14:14:21',
};
