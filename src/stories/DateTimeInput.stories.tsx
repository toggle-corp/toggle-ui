import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';

import DateTimeInput, { DateTimeInputProps } from '#components/DateTimeInput';

export default {
    title: 'Input/DateTimeInput',
    component: DateTimeInput,
    argTypes: {},
};

const Template: Story<DateTimeInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <DateTimeInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Date & Time',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Date & Time',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Date & Time',
    readOnly: true,
    value: '2020-11-11T11:03',
};
