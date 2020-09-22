import React from 'react';
import { useArgs } from '@storybook/client-api';
import { action } from '@storybook/addon-actions';

import DateInput, { DateInputProps } from '#components/DateInput';

export default {
    title: 'Input/DateInput',
    component: DateInput,
    argTypes: {},
};

const Template = (args: DateInputProps) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e) => {
        updateArgs({ value: e });
    };

    return (
        <DateInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Date',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Date',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Date',
    readOnly: true,
};
