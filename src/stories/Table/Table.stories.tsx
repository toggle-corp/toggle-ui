import React from 'react';
import { compareString, compareNumber } from '@togglecorp/fujs';

import { Story } from '@storybook/react/types-6-0';
import Cell, { CellProps } from '#components/Table/Cell';
import Numeral, { NumeralProps } from '#components/Numeral';
import HeaderCell, { HeaderCellProps } from '#components/Table/HeaderCell';
import Table, { TableProps, Column } from '#components/Table';
import { SortDirection, FilterType } from '#components/Table/types';
import useFiltering, { useFilterState, FilterContext } from '#components/Table/useFiltering';
import useOrdering, { useOrderState, OrderContext } from '#components/Table/useOrdering';
import useSorting, { useSortState, SortContext } from '#components/Table/useSorting';

export default {
    title: 'View/Table',
    component: Table,
    argTypes: {},
};

interface Program {
    id: number;
    name: string;
    budget: number;
    date: string;
}
const data: Program[] = [
    {
        id: 1,
        name: 'Program A',
        budget: 123123,
        date: '2012-10-12',
    },
    {
        id: 2,
        name: 'Program B',
        budget: 100,
        date: '2010-11-02',
    },
    {
        id: 3,
        name: 'Program C',
        budget: 10000,
        date: '1994-04-17',
    },
    {
        id: 4,
        name: 'Program D',
        budget: 10,
        date: '2021-08-23',
    },
];

// Helper method so that during column creation, id can be re-used
function createStringColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => string | undefined | null,
    options?: {
        cellAsHeader?: boolean,
        sortable?: boolean,
        defaultSortDirection?: SortDirection,
        filterType?: FilterType,
        orderable?: boolean;
        hideable?: boolean;
    },
) {
    const item: Column<D, K, CellProps<string>, HeaderCellProps> & {
        valueSelector: (item: D) => string | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        cellAsHeader: options?.cellAsHeader,
        headerCellRenderer: HeaderCell,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRenderer: Cell,
        cellRendererParams: (_: K, datum: D): CellProps<string> => ({
            value: accessor(datum),
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareString(accessor(foo), accessor(bar)),
    };
    return item;
}
function createNumberColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => number | undefined | null,
    options?: {
        cellAsHeader?: boolean,
        sortable?: boolean,
        defaultSortDirection?: SortDirection,
        filterType?: FilterType,
        orderable?: boolean;
        hideable?: boolean;
    },
) {
    const item: Column<D, K, NumeralProps, HeaderCellProps> & {
        valueSelector: (item: D) => number | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        cellAsHeader: options?.cellAsHeader,
        headerCellRenderer: HeaderCell,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRenderer: Numeral,
        cellRendererParams: (_: K, datum: D): NumeralProps => ({
            value: accessor(datum),
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareNumber(accessor(foo), accessor(bar)),
    };
    return item;
}

const columns = [
    createNumberColumn<Program, number>(
        'id',
        'ID',
        (item) => item.id,
        { cellAsHeader: true, sortable: true, filterType: FilterType.number, orderable: true },
    ),
    createStringColumn<Program, number>(
        'name',
        'Name',
        (item) => item.name,
        { sortable: true, filterType: FilterType.string, orderable: true },
    ),
    createNumberColumn<Program, number>(
        'budget',
        'Budget',
        (item) => item.budget,
        { sortable: true, filterType: FilterType.number, orderable: true },
    ),
];

const staticColumnOrdering = [
    { name: 'id' },
    { name: 'name' },
    { name: 'budget' },
];

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

    return (
        <SortContext.Provider value={sortState}>
            <FilterContext.Provider value={filterState}>
                <OrderContext.Provider value={orderState}>
                    <Table
                        {...args}
                        columns={orderedColumns}
                        data={sortedData}
                    />
                </OrderContext.Provider>
            </FilterContext.Provider>
        </SortContext.Provider>
    );
};

export const Default = Template.bind({});
Default.args = {
    keySelector: (d) => d.id,
};
