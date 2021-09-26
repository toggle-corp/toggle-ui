import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import DateRangeDualInput, { Props as DateRangeDualInputProps } from '#components/DateRangeDualInput';

export default {
    title: 'Input/DateRangeDualInput',
    component: DateRangeDualInput,
    argTypes: {},
};

const Template: Story<DateRangeDualInputProps<string>> = (args) => {
    const [{
        toValue,
        fromValue,
    }, updateArgs] = useArgs();

    const handleToChange = (e: string | undefined) => {
        updateArgs({ toValue: e });
    };

    const handleFromChange = (e: string | undefined) => {
        updateArgs({ fromValue: e });
    };

    return (
        <DateRangeDualInput
            {...args}
            toValue={toValue}
            toOnChange={handleToChange}
            fromValue={fromValue}
            fromOnChange={handleFromChange}
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
    fromValue: '1992-12-27',
    toValue: '2021-07-05',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Time wasted',
    fromValue: '1992-12-27',
    toValue: '2021-07-05',
    readOnly: true,
};
