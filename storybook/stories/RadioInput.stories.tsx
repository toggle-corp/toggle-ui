import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import RadioInput, { Props as RadioInputProps } from '../../src/components/RadioInput';

export default {
    title: 'Input/RadioInput',
    component: RadioInput,
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

// eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
const Template: Story<RadioInputProps<Option['key'], Option, Option['label'], any>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string | number) => {
        updateArgs({ value: e });
    };

    return (
        <RadioInput
            label="Fruit"
            {...props}
            value={value}
            options={options}
            keySelector={(d: Option) => d.key}
            labelSelector={(d: Option) => d.label}
            onChange={setValue}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    name: 'test',
    value: '1',
};

export const Disabled = Template.bind({});
Disabled.args = {
    name: 'test',
    value: '1',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    name: 'test',
    value: '1',
    readOnly: true,
};

export const Error = Template.bind({});
Error.args = {
    name: 'test',
    value: '1',
    error: 'This is wrong',
};
