import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import SelectInput, { SelectInputProps } from '#components/SelectInput';

export default {
    title: 'Input/SelectInput',
    component: SelectInput,
    argTypes: {},
};

interface Option {
    key: string;
    label: string;
}

const options: Option[] = [
    { key: '1', label: 'Apple' },
    { key: '2', label: 'Banana' },
    { key: '3', label: 'Grapes' },
    { key: '4', label: 'Avocado' },
    { key: '5', label: 'Pear' },
];

// eslint-disable-next-line max-len
const Template: Story<SelectInputProps<string, string, Option, { containerClassName?: string }>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string) => {
        updateArgs({ value: e });
    };

    return (
        <SelectInput
            label="Fruit"
            {...props}
            value={value}
            options={options}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
            onChange={setValue}
            nonClearable
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    value: '1',
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: '1',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: '1',
    readOnly: true,
};
