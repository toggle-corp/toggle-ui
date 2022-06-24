import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { IoLogoApple } from 'react-icons/io5';

import SegmentInput, { Props as SegmentInputProps } from '../../src/components/SegmentInput';

export default {
    title: 'Input/SegmentInput',
    component: SegmentInput,
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
const Template: Story<SegmentInputProps<Option['key'], Option, Option['label'], any>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string | number) => {
        updateArgs({ value: e });
    };

    return (
        <SegmentInput
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
    rendererParams: (o) => {
        if (o.key === '1') {
            return { icons: <IoLogoApple /> };
        }

        return {};
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    name: 'test',
    value: '1',
    disabled: true,
    rendererParams: (o) => {
        if (o.key === '1') {
            return { icons: <IoLogoApple /> };
        }

        return {};
    },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    name: 'test',
    value: '1',
    readOnly: true,
    rendererParams: (o) => {
        if (o.key === '1') {
            return { icons: <IoLogoApple /> };
        }

        return {};
    },
};

export const Error = Template.bind({});
Error.args = {
    name: 'test',
    value: '1',
    error: 'This is wrong',
    rendererParams: (o) => {
        if (o.key === '1') {
            return { icons: <IoLogoApple /> };
        }

        return {};
    },
};
