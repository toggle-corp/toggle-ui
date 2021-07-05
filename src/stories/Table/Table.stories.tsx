import React from 'react';
import { isDefined } from '@togglecorp/fujs';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import Table, { TableProps, Column } from '#components/Table';
import useFiltering, { useFilterState, FilterContext } from '#components/Table/useFiltering';
import useOrdering, { useOrderState, OrderContext } from '#components/Table/useOrdering';
import useSorting, { useSortState, SortContext } from '#components/Table/useSorting';
import useRowExpansionOnClick from '#components/Table/useRowExpansionOnClick';
import useRowExpansion from '#components/Table/useRowExpansion';
import {
    createExpandColumn,
    createStringColumn,
    createNumberColumn,
    createDateColumn,
    createDateTimeColumn,
    createYesNoColumn,
} from '#components/Table/predefinedColumns';

import styles from './styles.css';

export default {
    title: 'View/Table',
    component: Table,
    argTypes: {},
};

interface Program {
    id: number;
    name: string;
    budget: number | undefined;
    date: string;
}
const data: Program[] = [
    {
        id: 1,
        name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        budget: 123123,
        date: '2012-10-12T12:00:00',
    },
    {
        id: 2,
        name: 'Program B',
        budget: 100,
        date: '2010-11-02T10:12:10',
    },
    {
        id: 3,
        name: 'Program C',
        budget: 10000,
        date: '1994-04-17T01:04:12',
    },
    {
        id: 4,
        name: 'Program D',
        budget: undefined,
        date: '2021-08-23T06:01:18',
    },
];

const columns = [
    createNumberColumn<Program, number>(
        'id',
        'ID',
        (item) => item.id,
        {
            sortable: true,
            orderable: true,
            columnClassName: styles.idColumn,
        },
    ),
    createStringColumn<Program, number>(
        'name',
        'Name',
        (item) => item.name,
        {
            sortable: true,
            filterType: 'string',
            orderable: true,
            cellAsHeader: true,
            columnClassName: styles.name,
        },
    ),
    createNumberColumn<Program, number>(
        'budget',
        'Budget',
        (item) => item.budget,
        {
            sortable: true,
            filterType: 'number',
            orderable: true,
            columnClassName: styles.budget,
        },
    ),
    createDateColumn<Program, number>(
        'date',
        'Date',
        (item) => item.date,
        { sortable: true, orderable: true },
    ),
    createDateTimeColumn<Program, number>(
        'datetime',
        'Date Time',
        (item) => item.date,
        { sortable: true, orderable: true },
    ),
    createYesNoColumn<Program, number>(
        'aboveBudget',
        'Above Budget',
        (item) => isDefined(item.budget) && item.budget > 100,
        { sortable: true, orderable: true },
    ),
];

const staticColumnOrdering = [
    { name: 'id' },
    { name: 'name' },
    { name: 'budget' },
    { name: 'date' },
    { name: 'datetime' },
    { name: 'aboveBudget' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<TableProps<Program, number, Column<Program, number, any, any>>> = (args) => {
    const sortState = useSortState();
    const { sorting } = sortState;

    const filterState = useFilterState();
    const { filtering } = filterState;

    const orderState = useOrderState(staticColumnOrdering);
    const { ordering } = orderState;

    const orderedColumns = useOrdering(columns, ordering);
    const filteredData = useFiltering(filtering, orderedColumns, data);
    const sortedData = useSorting(sorting, orderedColumns, filteredData);

    const [rowModifier] = useRowExpansionOnClick<Program, number>(
        ({ datum }: { datum: Program }) => (
            <div key={`expanded-${datum.id}`}>
                {datum.name}
            </div>
        ),
    );

    return (
        <SortContext.Provider value={sortState}>
            <FilterContext.Provider value={filterState}>
                <OrderContext.Provider value={orderState}>
                    <Table
                        {...args}
                        columns={orderedColumns}
                        data={sortedData}
                        rowModifier={rowModifier}
                    />
                </OrderContext.Provider>
            </FilterContext.Provider>
        </SortContext.Provider>
    );
};

const tableKeySelector = (p: Program) => p.id;

export const Default = Template.bind({});
Default.args = {
    keySelector: tableKeySelector,
};

export const ManualRowExpansion = () => {
    const [{ expandedRow }, updateArgs] = useArgs();

    const handleClick = React.useCallback((rowId: number) => {
        updateArgs({ expandedRow: expandedRow === rowId ? undefined : rowId });
    }, [expandedRow, updateArgs]);

    const rowModifier = useRowExpansion<Program, number>(
        expandedRow,
        ({ datum }) => (
            <div key={`expanded-${datum.id}`}>
                {datum.name}
            </div>
        ),
    );

    const columnsWithAction = [
        createExpandColumn<Program, number>(
            'expand-button',
            '',
            handleClick,
            expandedRow,
        ),
        ...columns,
    ];

    return (
        <Table
            keySelector={tableKeySelector}
            columns={columnsWithAction}
            data={data}
            rowModifier={rowModifier}
        />
    );
};
