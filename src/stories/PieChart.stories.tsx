import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import PieChart, { PieChartProps } from '#components/PieChart';

export default {
    title: 'Visualization/PieChart',
    component: PieChart,
    argTypes: {},
};

interface Item {
    label: string;
    value: number;
}

const data = [
    { label: 'Jhapa', value: 20000, color: '#7fc97f' },
    { label: 'Illam', value: 10000, color: '#beaed4' },
    { label: 'Panchthar', value: 30000, color: '#fdc086' },
    { label: 'Taplejung', value: 50000, color: '#ffff99' },
];

const Template: Story<PieChartProps<Item>> = (props) => (
    <PieChart
        {...props}
        width={600}
        height={300}
        data={data}
        valueSelector={(d) => d.value}
        labelSelector={(d) => d.label}
        colorSelector={(d) => d.color}
    />
);

export const Default = Template.bind({});
Default.args = {
};
