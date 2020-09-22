import React from 'react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import { TiSortNumerically } from 'react-icons/ti';

import NumberInput, { NumberInputProps } from '#components/NumberInput';

export default {
    title: 'Input/NumberInput',
    component: NumberInput,
    argTypes: {},
};

const Template = (args: NumberInputProps) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e) => {
        updateArgs({ value: e });
    };

    console.log('outside', value);

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
    label: 'Value',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Amount',
    value: 10000,
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Amount',
    value: 20000,
    readOnly: true,
};
