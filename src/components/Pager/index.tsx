import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

function pagination(totalCapacity: number, active: number, total: number) {
    const oneSideCapacity = (totalCapacity - 1) / 2;
    const startIndex = 1;
    const lastIndex = total;

    // Once upon a time, there were two sides of a town
    // And every year, each got equal amount of ration
    // But, they had a variable demand, and each year it could change
    const right = new Side(oneSideCapacity, active - startIndex);
    const left = new Side(oneSideCapacity, lastIndex - active);

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
                ...range(startIndex, active - 1).map((i) => ({ type: 'button' as const, index: i })),
            );
        } else {
            lst.push(
                { type: 'button', index: startIndex },
                { type: 'span', label: '…', key: 'startTick' },
                ...range(active - (right.capacity - 2), active - 1).map((i) => ({ type: 'button' as const, index: i })),
            );
        }
    }

    lst.push(
        { type: 'fakeButton', label: String(active), key: 'active' },
    );

    if (left.capacity > 0) {
        if (left.excess >= 0) {
            lst.push(
                ...range(active + 1, lastIndex).map((i) => ({ type: 'button' as const, index: i })),
            );
        } else {
            lst.push(
                ...range(active + 1, active + (left.capacity - 2)).map((i) => ({ type: 'button' as const, index: i })),
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

export interface PagerProps {
    activePage: number;
    className?: string;
    itemsCount: number;
    maxItemsPerPage: number;
    onActivePageChange: (pageNumber: number) => void;
    totalCapacity?: number;
    onItemsPerPageChange: (pageCapacity: number) => void;
    options?: PagerOption[] | null;
    infoHidden?: boolean;
    itemsPerPageControlHidden?: boolean;
    disabled?: boolean;
    hideLabel?: boolean;
}

const defaultOptions: PagerOption[] = [
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
        onItemsPerPageChange,
        options,
        maxItemsPerPage = 25,
        totalCapacity = 7,
        disabled = false,
        itemsPerPageControlHidden = false,
        infoHidden = false,
        hideLabel,
    } = props;

    const showingTitle = 'Showing';
    const ofTitle = 'of';
    const rangeIndicator = '-';

    // NOTE: activePage can never be 0
    const activePage = Math.max(activePageProps, 1);
    // NOTE: number of pages can never be 0
    const numPages = Math.max(Math.ceil(itemsCount / maxItemsPerPage), 1);

    const offset = (activePage - 1) * maxItemsPerPage;
    const itemsOnPage = Math.min(maxItemsPerPage, itemsCount - offset);

    const currentItemsStart = itemsOnPage > 0 ? offset + 1 : offset;
    const currentItemsEnd = offset + itemsOnPage;

    const pages = pagination(totalCapacity, activePage, numPages);

    return (
        <div className={_cs(className, styles.pager)}>
            <div className={styles.pageList}>
                <Button
                    name={undefined}
                    className={styles.pageButton}
                    onClick={() => onActivePageChange(activePage - 1)}
                    disabled={activePage <= 1 || disabled}
                    icons={<FaChevronLeft />}
                >
                    {!hideLabel && (
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
                >
                    {!hideLabel && (
                        'Next'
                    )}
                </Button>
            </div>
            <div className={styles.infoAndConfig}>
                {!infoHidden && (
                    <div className={styles.currentRangeInformation}>
                        <div className={styles.showing}>
                            { showingTitle }
                        </div>
                        <div className={styles.range}>
                            <div className={styles.from}>
                                { currentItemsStart }
                            </div>
                            <div className={styles.separator}>
                                { rangeIndicator }
                            </div>
                            <div className={styles.to}>
                                { currentItemsEnd }
                            </div>
                        </div>
                        <div className={styles.of}>
                            { ofTitle }
                        </div>
                        <div className={styles.total}>
                            {itemsCount}
                        </div>
                    </div>
                )}
                {!itemsPerPageControlHidden && (
                    <div className={styles.itemsPerPage}>
                        <SelectInput
                            name="itemsPerPageSelection"
                            className={styles.input}
                            options={options ?? defaultOptions}
                            keySelector={(item) => item.key}
                            labelSelector={(item) => item.label}
                            value={maxItemsPerPage}
                            onChange={onItemsPerPageChange}
                            disabled={disabled}
                            searchPlaceholder=""
                            optionsPopupClassName={styles.perPageOptionPopup}
                            nonClearable
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
export default Pager;
