import React from 'react';
import { action } from '@storybook/addon-actions';

import List, { ListProps, GroupedListProps } from '#components/List';

export default {
    title: 'View/List',
    component: List,
    argTypes: {},
};

const Template = (args: ListProps | GroupedListProps) => (
    <List {...args} />
);

const options = [
    { key: '1', label: 'Option 1', group: 'a' },
    { key: '2', label: 'Option 2', group: 'a' },
    { key: '3', label: 'Option 3', group: 'a' },
    { key: '4', label: 'Option 4', group: 'b' },
    { key: '5', label: 'Option 5', group: 'b' },
];

const Option = ({ children }) => (
    <div>
        { children }
    </div>
);

const Group = ({
    title,
    children,
}) => (
    <div style={{ padding: '10px' }}>
        <h2>
            Group
            &nbsp;
            {title}
        </h2>
        <div>
            { children }
        </div>
    </div>
);

export const Default = Template.bind({});
Default.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (key, option) => ({ children: option.label }),
};

export const Grouped = Template.bind({});
Grouped.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (key, option) => ({ children: option.label }),
    groupKeySelector: (d) => d.group,
    groupRenderer: Group,
    groupRendererParams: (key) => ({ title: key }),
    grouped: true,
};
