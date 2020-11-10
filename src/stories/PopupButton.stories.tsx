import React from 'react';
// import { select, boolean } from '@storybook/addon-knobs';
import { Story } from '@storybook/react/types-6-0';
import List from '#components/List';
import PopupButton, { PopupButtonProps } from '#components/PopupButton';

export default {
    title: 'Action/PopupButton',
    component: PopupButton,
    argTypes: {},
};

const options = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
];

interface OptionProps {
    children: React.ReactNode;
}
const Option = ({ children }: OptionProps) => (
    <div>
        { children }
    </div>
);
const MenuItems = () => (
    <div style={{ padding: '12px' }}>
        <List
            data={options}
            keySelector={(d) => d.key}
            renderer={Option}
            rendererParams={(_, option) => ({ children: option.label })}
        />
    </div>
);

const Template: Story<PopupButtonProps<string>> = (args) => (
    <PopupButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'PopupButton',
    transparent: true,
    children: <MenuItems />,
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'PopupButton',
    children: <MenuItems />,
    transparent: true,
    disabled: true,
};
