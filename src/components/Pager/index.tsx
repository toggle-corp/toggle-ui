import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import Numeral from '../Numeral';
import SelectInput from '../SelectInput';
import Button from '../Button';

import styles from './styles.css';

function range(start: number, end: number) {
    const foo: number[] = [];
    for (let i = start; i <= end; i += 1) {
        foo.push(i);
    }
    return foo;
}

class Side {
    public capacity: number;

    public demand: number;

    public excess: number;

    constructor(capacity: number, demand: number) {
        this.capacity = capacity;
        this.demand = demand;
        this.excess = this.capacity - this.demand;
    }

    hasShortage() {
        return this.excess < 0;
    }

    increaseCapacity(inc: number) {
        this.capacity += inc;
        this.excess += inc;
    }

    decreaseCapacity(dec: number) {
        this.capacity += dec;
        this.excess += dec;
    }

    optimizeCapacity() {
        if (this.excess > 0) {
            this.capacity -= this.excess;
            this.excess = 0;
        }
    }
}

type PaginationItem = {
    type: 'button';
    index: number;
} | {
    type: 'span';
    key: string;
    label: string;
} | {
    type: 'fakeButton';
    key: string;
    label: string;
};

function pagination(totalCapacity: number, activePage: number, totalPages: number) {
    const oneSideCapacity = (totalCapacity - 1) / 2;
    const startIndex = 1;
    const lastIndex = totalPages;

    // Once upon a time, there were two sides of a town
    // And every year, each got equal amount of ration
    // But, they had a variable demand, and each year it could change
    const right = new Side(oneSideCapacity, activePage - startIndex);
    const left = new Side(oneSideCapacity, lastIndex - activePage);

    // So the two sides made a treaty
    // If any of the side had an excess that year and the other side had a shortage,
    // they had to give the excess to the other side
    // Thay way, all the ration would be used
    const leftExcess = left.excess;
    const rightExcess = right.excess;
    if (right.hasShortage() && leftExcess > 0) {
        right.increaseCapacity(leftExcess);
    } else if (left.hasShortage() && right.excess > 0) {
        left.increaseCapacity(rightExcess);
    }

    left.optimizeCapacity();
    right.optimizeCapacity();

    const lst: PaginationItem[] = [];

    if (right.capacity > 0) {
        if (right.excess >= 0) {
            lst.push(
                ...range(startIndex, activePage - 1).map((i) => ({ type: 'button' as const, index: i })),
            );
        } else {
            lst.push(
                { type: 'button', index: startIndex },
                { type: 'span', label: '…', key: 'startTick' },
                ...range(activePage - (right.capacity - 2), activePage - 1).map((i) => ({ type: 'button' as const, index: i })),
            );
        }
    }

    lst.push(
        { type: 'fakeButton', label: String(activePage), key: 'active' },
    );

    if (left.capacity > 0) {
        if (left.excess >= 0) {
            lst.push(
                ...range(activePage + 1, lastIndex).map((i) => ({ type: 'button' as const, index: i })),
            );
        } else {
            lst.push(
                ...range(activePage + 1, activePage + (left.capacity - 2)).map((i) => ({ type: 'button' as const, index: i })),
                { type: 'span', label: '...', key: 'endTick' },
                { type: 'button', index: lastIndex },
            );
        }
    }

    return lst;
}

interface PagerOption {
    key: number;
    label: string;
}

export type PagerProps = {
    activePage: number;
    className?: string;
    itemsCount: number;
    maxItemsPerPage: number;
    onActivePageChange: (pageNumber: number) => void;
    totalCapacity?: number;
    options?: PagerOption[] | null;
    infoHidden?: boolean;
    disabled?: boolean;
    showLabel?: boolean;
    popupClassName?: string;
} & ({
    itemsPerPageControlHidden: true;
    onItemsPerPageChange?: (pageCapacity: number) => void;
} | {
    itemsPerPageControlHidden?: false;
    onItemsPerPageChange: (pageCapacity: number) => void;
})

const defaultOptions: PagerOption[] = [
    { label: '5 / page', key: 5 },
    { label: '10 / page', key: 10 },
    { label: '25 / page', key: 25 },
    { label: '50 / page', key: 50 },
    { label: '75 / page', key: 75 },
    { label: '100 / page', key: 100 },
];

function Pager(props: PagerProps) {
    const {
        activePage: activePageProps,
        className,
        itemsCount,
        onActivePageChange,
        options,
        maxItemsPerPage = 25,
        totalCapacity = 7,
        disabled = false,
        infoHidden,
        showLabel,
        popupClassName,
    } = props;

    const showingTitle = 'Showing';
    const ofTitle = 'of';
    const rangeIndicator = '-';

    // NOTE: number of pages can never be 0
    const numPages = Math.max(Math.ceil(itemsCount / maxItemsPerPage), 1);
    // NOTE: activePage can never be 0 and be greater than numPages
    const activePage = Math.min(Math.max(activePageProps, 1), numPages);

    const offset = (activePage - 1) * maxItemsPerPage;
    const itemsOnPage = Math.min(maxItemsPerPage, itemsCount - offset);

    const currentItemsStart = itemsOnPage > 0 ? offset + 1 : offset;
    const currentItemsEnd = offset + itemsOnPage;

    const pages = pagination(totalCapacity, activePage, numPages);

    const pageList = pages.length > 1 && (
        <div className={styles.pageList}>
            <Button
                name={undefined}
                className={styles.pageButton}
                onClick={() => onActivePageChange(activePage - 1)}
                disabled={activePage <= 1 || disabled}
                icons={<FaChevronLeft />}
                transparent
            >
                {showLabel && (
                    'Prev'
                )}
            </Button>
            {pages.map((page) => {
                if (page.type === 'button') {
                    return (
                        <Button
                            key={`button-${page.index}`}
                            name={undefined}
                            onClick={() => onActivePageChange(page.index)}
                            className={styles.pageButton}
                            disabled={disabled}
                            transparent
                        >
                            {page.index}
                        </Button>
                    );
                }
                if (page.type === 'fakeButton') {
                    return (
                        <Button
                            key={`button-${page.key}`}
                            variant="accent"
                            name={undefined}
                            className={_cs(styles.pageButton, styles.active)}
                            transparent
                        >
                            {page.label}
                        </Button>
                    );
                }
                return (
                    <div
                        key={`span-${page.key}`}
                        className={styles.pageSpan}
                    >
                        {page.label}
                    </div>
                );
            })}
            <Button
                name={undefined}
                onClick={() => onActivePageChange(activePage + 1)}
                disabled={activePage >= numPages || disabled}
                className={styles.pageButton}
                actions={<FaChevronRight />}
                transparent
            >
                {showLabel && (
                    'Next'
                )}
            </Button>
        </div>
    );

    const info = !infoHidden && (itemsCount > maxItemsPerPage) && (
        <div className={styles.currentRangeInformation}>
            <div className={styles.showing}>
                { showingTitle }
            </div>
            <div className={styles.range}>
                <Numeral
                    className={styles.from}
                    value={currentItemsStart}
                />
                <div className={styles.separator}>
                    { rangeIndicator }
                </div>
                <Numeral
                    className={styles.to}
                    value={currentItemsEnd}
                />
            </div>
            <div className={styles.of}>
                { ofTitle }
            </div>
            <Numeral
                className={styles.total}
                value={itemsCount}
            />
        </div>
    );

    const itemsPerPageOptions = options ?? defaultOptions;

    const minOption = Math.min(0, ...itemsPerPageOptions.map((opt) => opt.key));

    const itemPerPageControl = !props.itemsPerPageControlHidden && (itemsCount > minOption) && (
        <div className={styles.itemsPerPage}>
            <SelectInput
                name="itemsPerPageSelection"
                className={styles.input}
                options={itemsPerPageOptions}
                keySelector={(item) => item.key}
                labelSelector={(item) => item.label}
                value={maxItemsPerPage}
                onChange={props.onItemsPerPageChange}
                disabled={disabled}
                optionsPopupClassName={_cs(styles.perPageOptionPopup, popupClassName)}
                nonClearable
            />
        </div>
    );

    if (!pageList && !itemPerPageControl && !info) {
        return null;
    }

    return (
        <div className={_cs(className, styles.pager)}>
            {pageList}
            {(info || itemPerPageControl) && (
                <div className={styles.infoAndConfig}>
                    {info}
                    {itemPerPageControl}
                </div>
            )}
        </div>
    );
}
export default Pager;
