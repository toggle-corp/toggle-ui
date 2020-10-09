import React from 'react';
import { action } from '@storybook/addon-actions';
import { MdTextFields } from 'react-icons/md';

import TextArea, { TextAreaProps } from '#components/TextArea';

export default {
    title: 'Input/TextArea',
    component: TextArea,
    argTypes: {},
};

const Template = (args: TextAreaProps) => (
    <TextArea {...args} />
);

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
