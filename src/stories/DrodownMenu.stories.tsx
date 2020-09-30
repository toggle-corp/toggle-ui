import React from 'react';
import { action } from '@storybook/addon-actions';
// import { select, boolean } from '@storybook/addon-knobs';

import List, { ListProps } from '#components/List';
import DropdownMenu, { DropdownMenuProps } from '#components/DropdownMenu';

const options = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
];

export default {
    title: 'Action/DropdownMenu',
    component: DropdownMenu,
    argTypes: {},
};

const Option = ({ children }) => (
    <div>
        { children }
    </div>
);

const MenuItems = () => (
    <List
        data={options}
        keySelector={(d) => d.key}
        renderer={Option}
        rendererParams={(_, option) => ({ children: option.label })}
    />
);

const Template = (args: DropdownMenuProps) => (
    <DropdownMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'DropdownMenu',
    children: <MenuItems />,
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'DropdownMenu',
    children: <MenuItems />,
    disabled: true,
};
