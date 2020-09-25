import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { BaseHeader } from './types';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';
import styles from './styles.css';

// Helper method so that during column creation, id can be re-used
export function createColumn<KK extends string, D, K, C, H>(
    modifier: (id: KK) => Omit<Column<D, K, C, H>, 'id' | 'title' | 'cellAsHeader'>,
    id: KK,
    title: string,
    cellAsHeader?: boolean,
): Column<D, K, C, H> {
    return {
        ...modifier(id),
        id,
        title,
        cellAsHeader,
    };
}

interface Column<D, K, C, H> {
    id: string;
    title: string;

    headerCellRenderer: React.ComponentType<H>;
    headerCellRendererParams: Omit<H, keyof BaseHeader>;
    headerCellRendererClassName?: string;

    cellRenderer: React.ComponentType<C>;
    cellRendererParams: (key: K, datum: D, index: number) => Omit<C, 'className' | 'name'>;
    cellRendererClassName?: string;

    cellAsHeader?: boolean;
    uiMode?: UiMode;
}

type VerifyColumn<T, D, K> = unknown extends (
    T extends Column<D, K, infer A, infer B>
        ? never
        : unknown
)
    ? never
    : unknown

export interface TableProps<D, K extends string | number, C extends Column<D, K, any, any>> {
    className?: string;
    caption?: React.ReactNode;
    keySelector: (data: D, index: number) => K;
    columns: C[] & VerifyColumn<C, D, K>;
    data: D[] | undefined;
    captionClassName?: string;
    headerRowClassName?: string;
    headerCellClassName?: string;
    rowClassName?: string;
    cellClassName?: string;
    uiMode?: UiMode;
}

function Table<D, K extends string | number, C extends Column<D, K, any, any>>(
    props: TableProps<D, K, C>,
) {
    const {
        data,
        keySelector,
        columns,
        caption,

        className,
        captionClassName,
        headerRowClassName,
        headerCellClassName,
        rowClassName,
        cellClassName,
        uiMode,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <table className={_cs(styles.table, className, themeClassName)}>
            {caption && (
                <caption
                    className={captionClassName}
                >
                    {caption}
                </caption>
            )}
            <thead>
                <tr className={_cs(styles.headerRow, headerRowClassName)}>
                    {columns.map((column, index) => {
                        const {
                            id,
                            title,
                            headerCellRenderer: Renderer,
                            headerCellRendererClassName,
                            cellAsHeader,
                            headerCellRendererParams,
                        } = column;

                        const children = (
                            <Renderer
                                {...headerCellRendererParams}
                                name={id}
                                title={title}
                                index={index}
                                className={_cs(headerCellRendererClassName, styles.headerComponent)}
                            />
                        );
                        return (
                            <th
                                key={id}
                                scope="col"
                                className={_cs(
                                    styles.headerCell,
                                    cellAsHeader && styles.stickLeft,
                                    headerCellClassName,
                                )}
                            >
                                {children}
                            </th>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {data?.map((datum, index) => {
                    const key = keySelector(datum, index);
                    return (
                        <tr
                            key={key}
                            className={_cs(styles.row, rowClassName)}
                        >
                            {columns.map((column) => {
                                const {
                                    id,
                                    cellRenderer: Renderer,
                                    cellRendererClassName,
                                    cellRendererParams,
                                    cellAsHeader,
                                } = column;
                                const otherProps = cellRendererParams(key, datum, index);
                                const children = (
                                    <Renderer
                                        {...otherProps}
                                        className={_cs(cellRendererClassName, styles.cellComponent)}
                                        name={id}
                                    />
                                );
                                if (cellAsHeader) {
                                    return (
                                        <th
                                            key={id}
                                            className={_cs(styles.rowHeaderCell, cellClassName)}
                                            scope="row"
                                        >
                                            {children}
                                        </th>
                                    );
                                }
                                return (
                                    <td
                                        key={id}
                                        className={_cs(styles.cell, cellClassName)}
                                    >
                                        {children}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Table;
