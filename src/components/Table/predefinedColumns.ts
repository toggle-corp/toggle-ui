import { compareString, compareNumber, compareDate, compareBoolean, _cs } from '@togglecorp/fujs';

import HeaderCell, { HeaderCellProps } from './HeaderCell';
import Cell, { CellProps } from './Cell';
import Numeral, { NumeralProps } from '../Numeral';
import DateTime, { DateTimeProps } from '../DateTime';
import YesNo, { YesNoProps } from '../YesNo';

import { Column } from './index';
import ExpandButton, { ExpandButtonProps } from './ExpandButton';
import { SortDirection, FilterType } from './types';

import styles from './styles.css';

type Options<D, K, CompProps, HeaderProps> = {
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
    columnWidth?: Column<D, K, CompProps, HeaderProps>['columnWidth'];
    columnStyle?: Column<D, K, CompProps, HeaderProps>['columnStyle'];
}

export function createYesNoColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => boolean | undefined | null,
    options?: Options<D, K, YesNoProps, HeaderCellProps>,
) {
    const item: Column<D, K, YesNoProps, HeaderCellProps> & {
        valueSelector: (item: D) => boolean | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        columnClassName: options?.columnClassName,
        headerCellRenderer: HeaderCell,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: YesNo,
        cellRendererParams: (_: K, datum: D): YesNoProps => ({
            value: accessor(datum),
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareBoolean(accessor(foo), accessor(bar)),
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}

export function createStringColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => string | undefined | null,
    options?: Options<D, K, CellProps<string>, HeaderCellProps>,
) {
    const item: Column<D, K, CellProps<string>, HeaderCellProps> & {
        valueSelector: (item: D) => string | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        columnClassName: options?.columnClassName,
        headerCellRenderer: HeaderCell,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: Cell,
        cellRendererParams: (_: K, datum: D): CellProps<string> => ({
            value: accessor(datum),
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareString(accessor(foo), accessor(bar)),
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}

export function createNumberColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => number | undefined | null,
    options?: Options<D, K, NumeralProps, HeaderCellProps>,
) {
    const item: Column<D, K, NumeralProps, HeaderCellProps> & {
        valueSelector: (item: D) => number | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        columnClassName: options?.columnClassName,
        headerCellRenderer: HeaderCell,
        headerCellRendererClassName: _cs(
            styles.numberCellHeader,
            options?.headerCellRendererClassName,
        ),
        headerContainerClassName: options?.headerContainerClassName,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
            titleClassName: styles.title,
            titleContainerClassName: styles.titleContainer,
        },
        cellRendererClassName: _cs(
            styles.numberCell,
            options?.cellRendererClassName,
        ),
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: Numeral,
        cellRendererParams: (_: K, datum: D): NumeralProps => ({
            value: accessor(datum),
            placeholder: 'N/a',
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareNumber(accessor(foo), accessor(bar)),
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}

export function createDateColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => string | undefined | null,
    options?: Options<D, K, DateTimeProps, HeaderCellProps>,
) {
    const item: Column<D, K, DateTimeProps, HeaderCellProps> & {
        valueSelector: (item: D) => string | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        columnClassName: options?.columnClassName,
        headerCellRenderer: HeaderCell,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: DateTime,
        cellRendererParams: (_: K, datum: D): DateTimeProps => ({
            value: accessor(datum),
            format: 'date',
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareDate(accessor(foo), accessor(bar)),
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}

export function createDateTimeColumn<D, K>(
    id: string,
    title: string,
    accessor: (item: D) => string | undefined | null,
    options?: Options<D, K, DateTimeProps, HeaderCellProps>,
) {
    const item: Column<D, K, DateTimeProps, HeaderCellProps> & {
        valueSelector: (item: D) => string | undefined | null,
        valueComparator: (foo: D, bar: D) => number,
    } = {
        id,
        title,
        columnClassName: options?.columnClassName,
        headerCellRenderer: HeaderCell,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        headerCellRendererParams: {
            sortable: options?.sortable,
            filterType: options?.filterType,
            orderable: options?.orderable,
            hideable: options?.hideable,
        },
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: DateTime,
        cellRendererParams: (_: K, datum: D): DateTimeProps => ({
            value: accessor(datum),
            format: 'datetime',
        }),
        valueSelector: accessor,
        valueComparator: (foo: D, bar: D) => compareDate(accessor(foo), accessor(bar)),
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}

export function createExpandColumn<D, K extends number | string | undefined>(
    id: string,
    title: string,
    onClick: (rowId: K) => void,
    expandedRowId: K | undefined,
    options?: Options<D, K, ExpandButtonProps<K>, HeaderCellProps>,
) {
    const item: Column<D, K, ExpandButtonProps<K>, HeaderCellProps> = {
        id,
        title,
        columnClassName: options?.columnClassName,
        headerCellRenderer: HeaderCell,
        headerCellRendererClassName: options?.headerCellRendererClassName,
        headerContainerClassName: options?.headerContainerClassName,
        headerCellRendererParams: {
            sortable: false,
            filterType: undefined,
            orderable: false,
            hideable: false,
        },
        cellRendererClassName: options?.cellRendererClassName,
        cellContainerClassName: options?.cellContainerClassName,
        cellRenderer: ExpandButton,
        cellRendererParams: (rowId: K) => ({
            rowId,
            onClick,
            expanded: rowId === expandedRowId,
        }),
        // valueSelector
        // valueComparator
        columnWidth: options?.columnWidth,
        columnStyle: options?.columnStyle,
    };
    return item;
}
