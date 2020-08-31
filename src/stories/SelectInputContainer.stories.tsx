import React from 'react';
import { action } from '@storybook/addon-actions';

import SelectInputContainer, { SelectInputContainerProps } from '#components/SelectInputContainer';

export default {
    title: 'Input/Private/SelectInputContainer',
    component: SelectInputContainer,
    argTypes: {},
};

const Template = (args: SelectInputContainerProps) => (
    <SelectInputContainer {...args} />
);

const options = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
    { key: '4', label: 'Option 4' },
    { key: '5', label: 'Option 5' },
];

const Option = ({ children }) => (
    <div>
        { children }
    </div>
);

export const Default = Template.bind({});
Default.args = {
    label: 'Name',
    options,
    optionKeySelector: (d) => d.key,
    optionRenderer: Option,
    optionRendererParams: (key, option) => ({ children: option.label }),
};
