import React from 'react';
import { action } from '@storybook/addon-actions';

import SelectInput, { SelectInputProps } from '#components/SelectInput';

export default {
    title: 'Input/SelectInput',
    component: SelectInput,
    argTypes: {},
};

const Template = (args: SelectInputProps) => (
    <SelectInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'Name',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Name',
    value: 'Mr. Frozen Helium',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Name',
    value: 'Mr. Frozen Helium',
    readOnly: true,
};

export const Multiple = () => (
    <>
        <SelectInput
            label="select 1"
        />
        <SelectInput
            label="select 2"
            hint="This is a hint"
        />
        <SelectInput
            label="select 3"
            error="This is an error"
        />
        <br />
        <br />
        <br />
        <br />
        <SelectInput
            label="A little far away"
        />
    </>
);
