import React from 'react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import { TiSortNumerically } from 'react-icons/ti';

import Cell from '#components/Table/Cell';
import HeaderCell from '#components/Table/HeaderCell';
import Table, { TableProps, createColumn } from '#components/Table';

interface Program {
    id: number;
    name: string;
    budget: number;
}
const data:Program[] = [
    {
        id: 1,
        name: 'Program A',
        budget: 123123,
    },
    {
        id: 2,
        name: 'Program B',
        budget: 100,
    },
    {
        id: 3,
        name: 'Program C',
        budget: 10000,
    },
    {
        id: 4,
        name: 'Program D',
        budget: 10,
    },
];

const getColumns = () => {
    const column = (colName: string) => ({
        headerCellRenderer: HeaderCell,
        headerCellRendererParams: {
            name: colName,
            sortable: false,
        },
        cellAsHeader: true,
        cellRenderer: Cell,
        cellRendererParams: (key: number, datum: Program) => ({
            value: datum[colName],
        }),
        valueSelector: (v: Program) => v[colName],
        valueType: 'string',
    });

    return [
        createColumn(column, 'id', 'Id'),
        createColumn(column, 'name', 'Name'),
        createColumn(column, 'budget', 'Budget'),
    ];
};

export default {
    title: 'View/Table',
    component: Table,
    argTypes: {},
};

const Template = (args: TableProps) => (
    <Table
        {...args}
    />
);

const columns = getColumns();
export const Default = Template.bind({});
Default.args = {
    data,
    keySelector: (d: Program) => d.id,
    columns,
};
