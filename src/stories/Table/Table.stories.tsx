import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Cell from '#components/Table/Cell';
import Numeral from '#components/Numeral';
import HeaderCell from '#components/Table/HeaderCell';
import Table, { TableProps, createColumn, Column } from '#components/Table';

export default {
    title: 'View/Table',
    component: Table,
    argTypes: {},
};

import styles from './styles.css';

interface Program {
    id: number;
    name: string;
    budget: number;
}
const data: Program[] = [
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
    type NoNull<T> = T extends null ? never : T;

    type ExtractKeys<T, M> = {
        [K in keyof Required<T>]: NoNull<Required<T>[K]> extends M ? K : never
    }[keyof T];

    type stringKeys = ExtractKeys<Program, string>;
    type numberKeys = ExtractKeys<Program, number>;

    const stringColumn = (colName: stringKeys) => ({
        headerCellRenderer: HeaderCell,
        headerCellRendererParams: {
            name: colName,
            sortable: false,
        },
        headerContainerClassName: styles.stringHeader,
        cellContainerClassName: styles.stringCell,
        cellAsHeader: true,
        cellRenderer: Cell,
        cellRendererParams: (_: number, datum: Program) => ({
            value: datum[colName],
        }),
        valueSelector: (v: Program) => v[colName],
        valueType: 'string',
    });

    const numberColumn = (colName: numberKeys) => ({
        headerCellRenderer: HeaderCell,
        headerCellRendererParams: {
            name: colName,
            sortable: false,
        },
        cellAsHeader: true,
        cellRenderer: Numeral,
        cellRendererParams: (_: number, datum: Program) => ({
            value: datum[colName],
        }),
        valueSelector: (v: Program) => v[colName],
        valueType: 'number',
    });

    return [
        createColumn(numberColumn, 'id', 'Id'),
        createColumn(stringColumn, 'name', 'Name'),
        createColumn(numberColumn, 'budget', 'Budget'),
    ];
};

const Template: Story<TableProps<Program, number, Column<Program, number, any, any>>> = (args) => (
    <Table
        {...args}
    />
);

export const Default = Template.bind({});
Default.args = {
    data,
    keySelector: (d) => d.id,
    columns: getColumns(),
};
