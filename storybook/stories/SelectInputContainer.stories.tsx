import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { BsCheckAll } from 'react-icons/bs';
import SelectInputContainer, { SelectInputContainerProps } from '../../src/components/SelectInputContainer';
import Button from '../../src/components/Button';

export default {
    title: 'Input/Private/SelectInputContainer',
    component: SelectInputContainer,
    argTypes: {},
};

interface Option {
    key: string;
    label: string;
}

const options: Option[] = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
    { key: '4', label: 'Option 4' },
    { key: '5', label: 'Option 5' },
];

// eslint-disable-next-line max-len
const Template: Story<SelectInputContainerProps<string, string, Option, { containerClassName?: string, children: React.ReactNode }, never>> = (props) => (
    <SelectInputContainer {...props} />
);

interface OptionItemProps {
    children: React.ReactNode;
}
const OptionItem = ({ children }: OptionItemProps) => (
    <div>
        { children }
    </div>
);

export const Default = Template.bind({});
Default.args = {
    label: 'Name',
    options,
    optionKeySelector: (d) => d.key,
    optionRenderer: OptionItem,
    optionRendererParams: (_, option) => ({ children: option.label }),
    valueDisplay: '',
};

export const WithAction = Template.bind({});
WithAction.args = {
    label: 'Name',
    options,
    optionKeySelector: (d) => d.key,
    optionRenderer: OptionItem,
    optionRendererParams: (_, option) => ({ children: option.label }),
    valueDisplay: '',
    actions: <Button name={undefined} transparent compact><BsCheckAll /></Button>,
};
