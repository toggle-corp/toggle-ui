import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';

import TimeInput, { TimeInputProps } from '../../src/components/TimeInput';

export default {
    title: 'Input/TimeInput',
    component: TimeInput,
    argTypes: {},
};

const Template: Story<TimeInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
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
