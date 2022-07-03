import React, { useRef, useEffect } from 'react';
import {
    _cs,
    isDefined,
    sum,
    listToMap,
    randomString,
} from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableData from './TableData';
import styles from './styles.css';

export type TableVariant = (
    'textWrappedCells'
    | 'textTruncatedCells'
);

export const DEFAULT_COLUMN_WIDTH = 108;

export interface Column<D, K, C, H> {
    id: string;
    title: string;

    headerCellRenderer: React.ComponentType<H>;
    headerCellRendererParams: Omit<H, 'name' | 'title' | 'index' | 'className'>;
    headerCellRendererClassName?: string;
    headerContainerClassName?: string;
    columnClassName?: string;
    columnStyle?: React.CSSProperties;
    columnWidth?: number;
    columnStretch?: boolean;

    cellRenderer: React.ComponentType<C>;
    cellRendererParams: (key: K, datum: D, index: number) => Omit<C, 'className' | 'name'>;
    cellRendererClassName?: string;
    cellContainerClassName?: string;
}

function getColumnWidth<D, K, C, H>(column: Column<D, K, C, H>, width: number) {
    return width ?? column.columnWidth ?? DEFAULT_COLUMN_WIDTH;
}

type VerifyColumn<T, D, K> = unknown extends (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Column<D, K, any, any>
        ? never
        : unknown
)
    ? never
    : unknown

export interface RowOptions<D, K> {
    rowKey: K,
    row: React.ReactElement;
    cells: React.ReactElement[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: Column<D, K, any, any>[];
    datum: D;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableProps<D, K extends string | number, C extends Column<D, K, any, any>> {
    className?: string;
    caption?: React.ReactNode;
    keySelector: (data: D, index: number) => K;
    columns: C[] & VerifyColumn<C, D, K>;
    data: D[] | undefined | null;
    containerClassName?: string;
    captionClassName?: string;
    headerRowClassName?: string;
    headerCellClassName?: string;
    rowClassName?: string;
    cellClassName?: string;
    uiMode?: UiMode;
    rowModifier?: (rowOptions: RowOptions<D, K>) => React.ReactNode;
    fixedColumnWidth?: boolean;
    resizableColumn?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<D, K extends string | number, C extends Column<D, K, any, any>>(
    props: TableProps<D, K, C>,
) {
    const {
        data,
        keySelector,
        columns,
        caption,

        containerClassName,
        className,
        captionClassName,
        headerRowClassName,
        headerCellClassName,
        rowClassName,
        cellClassName,
        uiMode,
        rowModifier,
        fixedColumnWidth,
        resizableColumn,
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);

    const [tableName] = React.useState(() => randomString());

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);
    const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({});

    useEffect(() => {
        setColumnWidths((cols) => {
            if (!containerRef.current) {
                return cols;
            }

            const size = containerRef.current.getBoundingClientRect();
            const { width: parentWidth } = size;

            let newColumnWidths: { id: string, width: number, stretch: boolean }[] = columns.map(
                (col) => ({
                    id: col.id,
                    stretch: !!col.columnStretch,
                    width: getColumnWidth(col, cols[col.id]),
                }),
            );

            const totalStretchableWidth = sum(
                newColumnWidths
                    .filter((item) => item.stretch)
                    .map((item) => item.width),
            );
            const totalNonStretchableWidth = sum(
                newColumnWidths
                    .filter((item) => !item.stretch)
                    .map((item) => item.width),
            );

            const stretchFactor = (parentWidth - totalNonStretchableWidth) / totalStretchableWidth;

            if (stretchFactor > 1) {
                newColumnWidths = newColumnWidths.map((item) => ({
                    ...item,
                    width: item.stretch
                        // NOTE: may need to use floor
                        ? item.width * stretchFactor
                        : item.width,
                }));
            }
            return listToMap(
                newColumnWidths,
                (item) => item.id,
                (item) => item.width,
            );
        });
    }, [columns]);

    const handleColumnResize = React.useCallback((width: number, name: string | undefined) => {
        const column = document.getElementById(`${tableName}-${name}`);
        if (column) {
            column.style.width = `${width}px`;

            if (fixedColumnWidth) {
                const table = document.getElementById(tableName);
                if (table) {
                    const totalWidth = sum(columns.map((c) => (
                        c.id === name ? width : columnWidths[c.id]
                    )));
                    table.style.width = `${totalWidth}px`;
                }
            }
        }
    }, [tableName, columnWidths, columns, fixedColumnWidth]);

    const handleColumnResizeComplete = React.useCallback(
        (width: number, name: string | undefined) => {
            if (isDefined(name)) {
                setColumnWidths((prevColumnWidths) => ({
                    ...prevColumnWidths,
                    [name]: width,
                }));
            }
        },
        [setColumnWidths],
    );

    const width = React.useMemo(() => (
        sum(columns.map((c) => columnWidths[c.id]))
    ), [columnWidths, columns]);

    return (
        <div
            ref={containerRef}
            className={_cs(styles.container, containerClassName)}
        >
            {Object.keys(columnWidths).length > 0 && (
                <table
                    className={_cs(styles.table, className, themeClassName)}
                    style={fixedColumnWidth ? { width: `${width}px` } : undefined}
                    id={tableName}
                >
                    {caption && (
                        <caption className={captionClassName}>
                            {caption}
                        </caption>
                    )}
                    <colgroup>
                        {columns.map((column) => {
                            const {
                                id,
                                columnClassName,
                            } = column;

                            const columnWidth = columnWidths[id];
                            const style = { width: `${columnWidth}px` };

                            return (
                                <col
                                    id={`${tableName}-${id}`}
                                    style={style}
                                    key={id}
                                    className={_cs(styles.column, columnClassName)}
                                />
                            );
                        })}
                    </colgroup>
                    <thead>
                        <TableRow
                            className={_cs(styles.headerRow, headerRowClassName)}
                        >
                            {columns.map((column, index) => {
                                const {
                                    id,
                                    title,
                                    headerCellRenderer: Renderer,
                                    headerCellRendererClassName,
                                    headerCellRendererParams,
                                    headerContainerClassName,
                                } = column;

                                const children = (
                                    <Renderer
                                        {...headerCellRendererParams}
                                        name={id}
                                        title={title}
                                        index={index}
                                        className={_cs(
                                            headerCellRendererClassName,
                                            styles.headerComponent,
                                        )}
                                    />
                                );
                                return (
                                    <TableHeader
                                        key={id}
                                        scope="col"
                                        name={id}
                                        onResize={resizableColumn ? handleColumnResize : undefined}
                                        onResizeComplete={
                                            resizableColumn ? handleColumnResizeComplete : undefined
                                        }
                                        className={_cs(
                                            styles.headerCell,
                                            headerCellClassName,
                                            headerContainerClassName,
                                        )}
                                    >
                                        {children}
                                    </TableHeader>
                                );
                            })}
                        </TableRow>
                    </thead>
                    <tbody>
                        {data?.map((datum, index) => {
                            const key = keySelector(datum, index);
                            const cells = columns.map((column) => {
                                const {
                                    id,
                                    cellRenderer: Renderer,
                                    cellRendererClassName,
                                    cellRendererParams,
                                    cellContainerClassName,
                                } = column;

                                const otherProps = cellRendererParams(key, datum, index);
                                const children = (
                                    <Renderer
                                        {...otherProps}
                                        className={cellRendererClassName}
                                        name={id}
                                    />
                                );
                                return (
                                    <TableData
                                        key={id}
                                        className={_cs(
                                            styles.cell,
                                            cellClassName,
                                            cellContainerClassName,
                                        )}
                                    >
                                        {children}
                                    </TableData>
                                );
                            });

                            const row = (
                                <TableRow
                                    key={key}
                                    className={_cs(styles.row, rowClassName)}
                                >
                                    { cells }
                                </TableRow>
                            );

                            let modifiedRow: React.ReactNode = row;

                            if (rowModifier) {
                                modifiedRow = rowModifier({
                                    rowKey: key,
                                    row,
                                    cells,
                                    columns,
                                    datum,
                                });
                            }

                            return modifiedRow;
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Table;
