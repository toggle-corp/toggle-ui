import React from 'react';
import { useArgs } from '@storybook/client-api';

import TimeInput, { TimeInputProps } from '#components/TimeInput';

export default {
    title: 'Input/TimeInput',
    component: TimeInput,
    argTypes: {},
};

const Template = (args: TimeInputProps) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e) => {
        updateArgs({ value: e });
    };

    return (
        <TimeInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'Time',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Time',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Time',
    readOnly: true,
};
