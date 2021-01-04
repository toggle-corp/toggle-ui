import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { MdTextFields } from 'react-icons/md';

import TextInput, { TextInputProps } from '#components/TextInput';

interface Suggestion {
    value: string;
}

const suggestions: Suggestion[] = [
    { value: 'Ram' },
    { value: 'Shyam' },
    { value: 'Hari' },
    { value: 'Gita' },
];

export default {
    title: 'Input/TextInput',
    component: TextInput,
};

const Template: Story<TextInputProps<string, Suggestion>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };
    return (
        <TextInput
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
    value: 'Mr. Frozen Helium',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Name',
    value: 'Mr. Frozen Helium',
    readOnly: true,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    icons: <MdTextFields />,
    label: 'Name',
    placeholder: 'Name',
};

export const WithSuggestion = Template.bind({});
WithSuggestion.args = {
    icons: <MdTextFields />,
    label: 'Name',
    suggestions,
    suggestionKeySelector: (item) => item.value,
    suggestionLabelSelector: (item) => item.value,
};
