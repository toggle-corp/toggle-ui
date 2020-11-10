import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import BarChart, { BarChartProps } from '#components/BarChart';

export default {
    title: 'Visualization/BarChart',
    component: BarChart,
    argTypes: {},
};

interface Item {
    label: string;
    value: number;
}

const data = [
    { label: 'Jhapa', value: 20000 },
    { label: 'Illam', value: 10000 },
    { label: 'Panchthar', value: 30000 },
    { label: 'Taplejung', value: 50000 },
];

const Template: Story<BarChartProps<Item>> = (props) => (
    <BarChart
        {...props}
        width={600}
        height={300}
        data={data}
        valueSelector={(d) => d.value}
        labelSelector={(d) => d.label}
    />
);

export const Default = Template.bind({});
Default.args = {
};
