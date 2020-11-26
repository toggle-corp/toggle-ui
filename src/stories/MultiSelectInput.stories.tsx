import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import MultiSelectInput, { MultiSelectInputProps } from '#components/MultiSelectInput';

export default {
    title: 'Input/MultiSelectInput',
    component: MultiSelectInput,
    argTypes: {},
};

interface Option {
    key: string;
    label: string;
}

const options: Option[] = [
    { key: '1', label: 'Potato' },
    { key: '2', label: 'Tomato' },
    { key: '3', label: 'Pumpkin' },
    { key: '4', label: 'Gourd' },
    { key: '5', label: 'Spinach' },
    { key: '6', label: 'Eggplant' },
];

// eslint-disable-next-line max-len
const Template: Story<MultiSelectInputProps<string, string, Option, { containerClassName?: string }>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string[]) => {
        updateArgs({ value: e });
    };

    return (
        <MultiSelectInput
            label="Vegetables"
            {...props}
            options={options}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
        />
    );
};

export const NoValue = Template.bind({});
NoValue.args = {
    value: undefined,
};

export const Default = Template.bind({});
Default.args = {
    value: ['1', '3'],
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: ['1', '3'],
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: ['1', '3'],
    readOnly: true,
};
