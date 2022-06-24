import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import List, { ListProps } from '../../src/components/List';
import ToggleButton from '../../src/components/ToggleButton';

export default {
    title: 'View/List',
    component: List,
    argTypes: {},
};

interface Option {
    key: string;
    label: string;
    group: string;
}

const options: Option[] = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
];

interface OptionProps {
    children: React.ReactNode
}
const Option = ({ children }: OptionProps) => (
    <div>
        { children }
    </div>
);

interface GroupProps {
    title: string;
    children: React.ReactNode;
}
const Group = ({
    title,
    children,
}: GroupProps) => (
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
}: GroupProps) => {
    const [groupOpen, setGroupOpen] = useState(false);

    return (
        <div>
            <header>
                <ToggleButton
                    value={groupOpen}
                    onChange={setGroupOpen}
                    name={undefined}
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

const Template: Story<ListProps<Option, OptionProps, string, GroupProps, string>> = (args) => (
    <List {...args} />
);

export const Default = Template.bind({});
Default.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (_, option) => ({ children: option.label }),
};

export const Grouped = Template.bind({});
Grouped.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (_, option) => ({ children: option.label }),
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
    rendererParams: (_, option) => ({ children: option.label }),
    groupKeySelector: (d) => d.group,
    groupRenderer: CollapsedGroup,
    groupRendererParams: (key) => ({ title: key }),
    grouped: true,
};
