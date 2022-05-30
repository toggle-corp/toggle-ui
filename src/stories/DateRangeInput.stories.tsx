import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import DateRangeInput, { Props as DateRangeInputProps, Value } from '#components/DateRangeInput';

export default {
    title: 'Input/DateRangeInput',
    component: DateRangeInput,
    argTypes: {},
};

const Template: Story<DateRangeInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: Value | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <DateRangeInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Time wasted',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Time wasted',
    value: {
        startDate: '1992-12-27',
        endDate: '2021-07-05',
    },
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Time wasted',
    value: {
        startDate: '1992-12-27',
        endDate: '2021-07-05',
    },
    readOnly: true,
};
