import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { MdTextFields } from 'react-icons/md';

import TextArea, { TextAreaProps } from '../../src/components/TextArea';

export default {
    title: 'Input/TextArea',
    component: TextArea,
    argTypes: {},
};

const Template: Story<TextAreaProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (e: string | undefined) => {
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
