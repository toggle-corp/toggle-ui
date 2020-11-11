import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Accordion, { AccordionProps } from '#components/Accordion';

export default {
    title: 'View/Accordion',
    component: Accordion,
    argTypes: {},
};

type Option = { key: string; label: string; group: string; };

const options: Option[] = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
];

interface TitleProps {
    title: string;
}
const Title = ({ title }: TitleProps) => (
    <h3>
        {title}
    </h3>
);
interface OptionProps {
    children: React.ReactNode;
}
const Option = ({ children }: OptionProps) => (
    <div style={{ padding: '8px 4px' }}>
        { children }
    </div>
);

const Template: Story<AccordionProps<Option, OptionProps, string, TitleProps, string>> = (args) => (
    <div style={{ width: '240px' }}>
        <Accordion
            {...args}
        />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (_, option) => ({ children: option.label }),
    groupKeySelector: (d) => d.group,
    groupTitleRenderer: Title,
    groupTitleRendererParams: (key) => ({ title: key }),
};
