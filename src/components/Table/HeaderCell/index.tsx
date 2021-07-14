import React, {
    memo,
    useCallback,
    useState,
    useRef,
    useContext,
} from 'react';
import { _cs } from '@togglecorp/fujs';

import {
    FaSortUp,
    FaSortDown,
    FaSort,
    FaLessThanEqual,
    FaGreaterThanEqual,
    FaSearch,
    FaGripVertical,
} from 'react-icons/fa';
import {
    IoMdEyeOff,
} from 'react-icons/io';

import { UiMode } from '../../ThemeContext';
import Button from '../../Button';
import TextInput from '../../TextInput';
import NumberInput from '../../NumberInput';

import { BaseHeader, SortDirection, FilterType } from '../types';
import { SortContext } from '../useSorting';
import { FilterContext } from '../useFiltering';
import { OrderContext } from '../useOrdering';
import { HideContext } from '../useHiding';

import { useDropHandler } from '../../../hooks';

import styles from './styles.css';

export interface HeaderCellProps extends BaseHeader {
    uiMode?: UiMode;

    sortable?: boolean;
    defaultSortDirection?: SortDirection;
    filterType?: FilterType;
    orderable?: boolean;
    hideable?: boolean;
}

interface DropInfo {
    name: string;
    index: number;
}

let tempDropInfo: DropInfo | undefined;

function HeaderCell(props: HeaderCellProps) {
    const {
        className,
        uiMode,
        titleClassName,
        titleContainerClassName,
        title,
        name,
        index,

        sortable,
        defaultSortDirection = 'asc',
        filterType,
        orderable,
        hideable,
    } = props;

    const {
        setHidden: onHide,
    } = useContext(HideContext);

    const {
        moveOrderingItem: onReorder,
    } = useContext(OrderContext);

    const {
        setFilteringItem: onFilterValueChange,
        getFilteringItem,
    } = useContext(FilterContext);

    const filterValue = getFilteringItem(name);

    const {
        sorting,
        setSorting: onSortChange,
    } = useContext(SortContext);

    const sortDirection = sorting?.name === name
        ? sorting.direction
        : undefined;

    const containerRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [dropInfo, setDropInfo] = useState<DropInfo | undefined>();

    const handleHideClick = useCallback(
        () => {
            if (onHide) {
                onHide(name);
            }
        },
        [onHide, name],
    );

    const handleSortClick = useCallback(
        () => {
            if (!onSortChange) {
                return;
            }
            let newSortDirection: SortDirection | undefined;
            if (!sortDirection) {
                newSortDirection = defaultSortDirection;
            } else if (sortDirection === 'asc') {
                newSortDirection = 'dsc';
            } else if (sortDirection === 'dsc') {
                newSortDirection = 'asc';
            }

            if (newSortDirection) {
                onSortChange({ name, direction: newSortDirection });
            } else {
                onSortChange(undefined);
            }
        },
        [name, onSortChange, sortDirection, defaultSortDirection],
    );

    const handleStringFilterChange = useCallback(
        (value: string | undefined) => {
            if (onFilterValueChange) {
                onFilterValueChange(
                    name,
                    { ...filterValue, subMatch: value },
                );
            }
        },
        [name, filterValue, onFilterValueChange],
    );

    const handleNumericFilterMinChange = useCallback(
        (value: number | undefined) => {
            if (onFilterValueChange) {
                onFilterValueChange(
                    name,
                    { ...filterValue, greaterThanOrEqualTo: value },
                );
            }
        },
        [name, filterValue, onFilterValueChange],
    );

    const handleNumericFilterMaxChange = useCallback(
        (value: number | undefined) => {
            if (onFilterValueChange) {
                onFilterValueChange(
                    name,
                    { ...filterValue, lessThanOrEqualTo: value },
                );
            }
        },
        [name, filterValue, onFilterValueChange],
    );

    const handleDragStart = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            setDragging(true);

            if (containerRef.current) {
                const size = containerRef.current.getBoundingClientRect();
                e.dataTransfer.setDragImage(containerRef.current, size.width, 0);
            }
            const content: DropInfo = {
                name,
                index,
            };
            e.dataTransfer.dropEffect = 'move';
            e.dataTransfer.setData('text/plain', JSON.stringify(content));

            tempDropInfo = content;
        },
        [index, name],
    );

    const handleDragEnd = useCallback(
        () => {
            setDragging(false);

            tempDropInfo = undefined;
        },
        [],
    );

    const handleDragEnter = useCallback(
        () => {
            // NOTE: this is a hack as we event.dataTransfer.getData() doesn't work
            setDropInfo(tempDropInfo);
        },
        [],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            if (!onReorder) {
                return;
            }

            try {
                const data = e.dataTransfer.getData('text/plain');
                const parsedData = JSON.parse(data) as DropInfo;

                if (parsedData.name) {
                    onReorder(parsedData.name, name);
                }
            } catch (ex) {
                console.error(ex);
            }
        },
        [name, onReorder],
    );

    const {
        dropping,
        onDragOver,
        onDragEnter,
        onDragLeave,
        onDrop,
    } = useDropHandler(handleDragEnter, handleDrop);

    return (
        <div
            ref={containerRef}
            className={_cs(
                className,
                styles.headerCell,
                dragging && styles.dragging,
                (!dragging && dropping) && (
                    dropInfo && index > dropInfo.index
                        ? styles.droppingBehind
                        : styles.dropping
                ),
            )}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div
                className={_cs(titleContainerClassName, styles.titleContainer)}
            >
                {sortable && (
                    <Button
                        name="header-cell-sort"
                        transparent
                        onClick={handleSortClick}
                        title="Sort column"
                        uiMode={uiMode}
                        compact
                    >
                        {!sortDirection && <FaSort />}
                        {sortDirection === 'asc' && <FaSortUp />}
                        {sortDirection === 'dsc' && <FaSortDown />}
                    </Button>
                )}
                <div
                    className={_cs(titleClassName, styles.title)}
                >
                    {title}
                </div>
                {hideable && (
                    <Button
                        name="header cell hide"
                        className={styles.hideButton}
                        transparent
                        onClick={handleHideClick}
                        title="Hide column"
                        uiMode={uiMode}
                        compact
                    >
                        <IoMdEyeOff />
                    </Button>
                )}
                {orderable && (
                    <div
                        className={styles.grip}
                        role="presentation"
                        draggable
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <FaGripVertical />
                    </div>
                )}
            </div>
            { filterType && (
                <div className={styles.filterContainer}>
                    {filterType === 'string' && (
                        <TextInput
                            name="textFilter"
                            icons={<FaSearch className={styles.icon} />}
                            className={styles.textInput}
                            inputContainerClassName={styles.rawInputContainer}
                            value={filterValue?.subMatch}
                            placeholder="Search"
                            onChange={handleStringFilterChange}
                        />
                    )}
                    {filterType === 'number' && (
                        <>
                            <NumberInput
                                name="numberFilterMin"
                                icons={<FaGreaterThanEqual className={styles.icon} />}
                                className={styles.numberInput}
                                inputContainerClassName={styles.rawInputContainer}
                                value={filterValue?.greaterThanOrEqualTo}
                                placeholder="Min"
                                type="number"
                                onChange={handleNumericFilterMinChange}
                            />
                            <NumberInput
                                name="numberFilterMax"
                                icons={<FaLessThanEqual className={styles.icon} />}
                                className={styles.numberInput}
                                inputContainerClassName={styles.rawInputContainer}
                                value={filterValue?.lessThanOrEqualTo}
                                placeholder="Max"
                                onChange={handleNumericFilterMaxChange}
                            />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default memo(HeaderCell);
