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
    parentKey: string;
    parentLabel: string;
}

const options: Option[] = [
    { key: '1', label: 'Potato Potato Potato Potato Potato Potato Potato', parentKey: '1', parentLabel: 'Brown' },
    { key: '2', label: 'Tomato', parentKey: '2', parentLabel: 'Red' },
    { key: '3', label: 'Pumpkin', parentKey: '2', parentLabel: 'Red' },
    { key: '4', label: 'Gourd', parentKey: '3', parentLabel: 'Green' },
    { key: '5', label: 'Spinach', parentKey: '3', parentLabel: 'Green' },
    { key: '6', label: 'Eggplant', parentKey: '4', parentLabel: 'PurplePurplPurplPurplPurplPurplPurplPurplPurplPurplPurplPurplPurplPurpleeeeeeeeeeeee' },
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

// eslint-disable-next-line max-len
const GroupedTemplate: Story<MultiSelectInputProps<string, string, Option, { containerClassName?: string }>> = (props) => {
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
            grouped
            groupKeySelector={(d) => d.parentKey}
            groupLabelSelector={(d) => d.parentLabel}
        />
    );
};

export const NoValueGrouped = GroupedTemplate.bind({});
NoValueGrouped.args = {
    value: undefined,
};

export const DefaultGrouped = GroupedTemplate.bind({});
DefaultGrouped.args = {
    value: ['1', '3'],
};

export const DisabledGrouped = GroupedTemplate.bind({});
DisabledGrouped.args = {
    value: ['1', '3'],
    disabled: true,
};

export const ReadOnlyGrouped = GroupedTemplate.bind({});
ReadOnlyGrouped.args = {
    value: ['1', '3'],
    readOnly: true,
};
