import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';
import { TiSortNumerically } from 'react-icons/ti';

import NumberInput, { NumberInputProps } from '#components/NumberInput';

export default {
    title: 'Input/NumberInput',
    component: NumberInput,
    argTypes: {},
};

const Template: Story<NumberInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: number | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <NumberInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    icons: <TiSortNumerically />,
    label: 'Amount',
    value: 10000,
};

export const Disabled = Template.bind({});
Disabled.args = {
    icons: <TiSortNumerically />,
    label: 'Amount',
    value: 10000,
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    icons: <TiSortNumerically />,
    label: 'Amount',
    value: 10000,
    readOnly: true,
};
