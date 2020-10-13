import React from 'react';
import { useArgs } from '@storybook/client-api';
import { MdTextFields } from 'react-icons/md';

import TextArea, { TextAreaProps } from '#components/TextArea';

export default {
    title: 'Input/TextArea',
    component: TextArea,
    argTypes: {},
};

const Template = (args: TextAreaProps) => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (e) => {
        updateArgs({ value: e });
    };

    return (
        <TextArea
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    icons: <MdTextFields />,
    label: 'Name',
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Name',
    value: 'This is Text Area',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Name',
    value: 'This is Text Area',
    readOnly: true,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    icons: <MdTextFields />,
    label: 'Name',
    placeholder: 'Name',
};
