import { compareString, compareNumber, compareDate, compareBoolean } from '@togglecorp/fujs';

import HeaderCell, { HeaderCellProps } from './HeaderCell';
import Cell, { CellProps } from './Cell';
import Numeral, { NumeralProps } from '../Numeral';
import DateTime, { DateTimeProps } from '../DateTime';
import YesNo, { YesNoProps } from '../YesNo';

import { Column } from './index';
import { SortDirection, FilterType } from './types';

export function createYesNoColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => boolean | undefined | null,
    options?: {
        cellAsHeader?: boolean,
        sortable?: boolean,
        defaultSortDirection?: SortDirection,
        filterType?: FilterType,
        orderable?: boolean;
        hideable?: boolean;
        columnClassName?: string;
        headerCellRendererClassName?: string;
        headerContainerClassName?: string;
        cellRendererClassName?: string;
        cellContainerClassName?: string;
    },
) {
    const item: Column<D, K, YesNoProps, HeaderCellProps> & {
        valueSelector: (item: D) => boolean | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        cellAsHeader: options?.cellAsHeader,
        headerCellRenderer: HeaderCell,
        columnClassName: options?.columnClassName,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRenderer: YesNo,
        cellRendererParams: (_: K, datum: D): YesNoProps => ({
            value: accessor(datum),
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareBoolean(accessor(foo), accessor(bar)),
    };
    return item;
}

export function createStringColumn<D, K>(
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
        columnClassName?: string;
        headerCellRendererClassName?: string;
        headerContainerClassName?: string;
        cellRendererClassName?: string;
        cellContainerClassName?: string;
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
        columnClassName: options?.columnClassName,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
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

export function createNumberColumn<D, K>(
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
        columnClassName?: string;
        headerCellRendererClassName?: string;
        headerContainerClassName?: string;
        cellRendererClassName?: string;
        cellContainerClassName?: string;
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
        columnClassName: options?.columnClassName,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: Numeral,
        cellRendererParams: (_: K, datum: D): NumeralProps => ({
            value: accessor(datum),
            placeholder: 'N/a',
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareNumber(accessor(foo), accessor(bar)),
    };
    return item;
}

export function createDateColumn<D, K>(
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
        columnClassName?: string;
        headerCellRendererClassName?: string;
        headerContainerClassName?: string;
        cellRendererClassName?: string;
        cellContainerClassName?: string;
    },
) {
    const item: Column<D, K, DateTimeProps, HeaderCellProps> & {
        valueSelector: (item: D) => string | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        cellAsHeader: options?.cellAsHeader,
        headerCellRenderer: HeaderCell,
        columnClassName: options?.columnClassName,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRenderer: DateTime,
        cellRendererParams: (_: K, datum: D): DateTimeProps => ({
            value: accessor(datum),
            format: 'date',
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareDate(accessor(foo), accessor(bar)),
    };
    return item;
}

export function createDateTimeColumn<D, K>(
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
        columnClassName?: string;
        headerCellRendererClassName?: string;
        headerContainerClassName?: string;
        cellRendererClassName?: string;
        cellContainerClassName?: string;
    },
) {
    const item: Column<D, K, DateTimeProps, HeaderCellProps> & {
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
        columnClassName: options?.columnClassName,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: DateTime,
        cellRendererParams: (_: K, datum: D): DateTimeProps => ({
            value: accessor(datum),
            format: 'datetime',
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareDate(accessor(foo), accessor(bar)),
    };
    return item;
}
