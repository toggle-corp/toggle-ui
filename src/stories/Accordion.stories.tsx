import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';

import Accordion, { AccordionProps } from '#components/Accordion';

export default {
    title: 'View/Accordion',
    component: Accordion,
    argTypes: {},
};

const Template = (args: AccordionProps) => (
    <div style={{ width: '240px' }}>
        <Accordion
            {...args}
        />
    </div>
);

const options = [
    { key: '1', label: 'Superman', group: 'Air' },
    { key: '2', label: 'Batman', group: 'Land' },
    { key: '3', label: 'Flash', group: 'Land' },
    { key: '4', label: 'Wonder Woman', group: 'Air' },
    { key: '5', label: 'Green Lantern', group: 'Air' },
];

const Title = ({ title }) => (
    <h3>
        {title}
    </h3>
);

const Option = ({ children }) => (
    <div style={{ padding: '8px 4px' }}>
        { children }
    </div>
);

export const Default = Template.bind({});
Default.args = {
    data: options,
    keySelector: (d) => d.key,
    renderer: Option,
    rendererParams: (key, option) => ({ children: option.label }),
    groupKeySelector: (d) => d.group,
    groupRendererParams: (key) => ({ title: key }),
    groupTitleRenderer: Title,
    groupTitleRendererParams: (key) => ({ title: key }),
};
