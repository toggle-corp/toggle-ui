import React from 'react';
import { action } from '@storybook/addon-actions';

import BarChart from '#components/BarChart';

export default {
    title: 'View/BarChart',
    component: BarChart,
    argTypes: {},
};

const data = [
    { label: 'Jhapa', value: 20000 },
    { label: 'Illam', value: 10000 },
    { label: 'Panchthar', value: 30000 },
    { label: 'Taplejung', value: 50000 },
];

export const Default = () => (
    <BarChart
        width={600}
        height={300}
        data={data}
        valueSelector={d => d.value}
        labelSelector={d => d.label}
    />
);
