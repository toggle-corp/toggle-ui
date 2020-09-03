import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import List, { ListProps, GroupedListProps } from '#components/List';
import ToggleButton from '#components/ToggleButton';

export default {
    title: 'View/List',
    component: List,
    argTypes: {},
};

const Template = (args: ListProps | GroupedListProps) => (
    <List {...args} />
);

const options = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
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
    <div>
        <header>
            <h3>
                Group
                &nbsp;
                {title}
            </h3>
        </header>
        <div>
            { children }
        </div>
    </div>
);

const CollapsedGroup = ({
    title,
    children,
}) => {
    const [groupOpen, setGroupOpen] = useState(false);

    return (
        <div>
            <header>
                <ToggleButton
                    value={groupOpen}
                    onChange={setGroupOpen}
                >
                    <h3>
                        Group
                        &nbsp;
                        {title}
                    </h3>
                </ToggleButton>
            </header>
            {groupOpen && (
                <div>
                    { children }
                </div>
            )}
        </div>
    );
};

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

export const CollapsedGrouped = Template.bind({});
CollapsedGrouped.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (key, option) => ({ children: option.label }),
    groupKeySelector: (d) => d.group,
    groupRenderer: CollapsedGroup,
    groupRendererParams: (key) => ({ title: key }),
    grouped: true,
};
