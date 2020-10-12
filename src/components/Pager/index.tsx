import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// import Icon from '../../General/Icon';
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
        { type: 'span', label: String(active), key: 'active' },
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
    totalCapacity: number;
    onItemsPerPageChange: (pageCapacity: number) => void;
    options: PagerOption[];
    infoHidden?: boolean;
    itemsPerPageControlHidden?: boolean;
    disabled?: boolean;
}

/*
const defaultProps = {
    activePage: 1,
    className: '',
    itemsCount: 0,
    maxItemsPerPage: 10,
    totalCapacity: 7,
    onItemsPerPageChange: () => {},
    options: ,
    showInfo: true,
    showItemsPerPageChange: true,
    disabled: false,
};
*/

const defaultOptions: PagerOption[] = [
    { label: '25', key: 25 },
    { label: '50', key: 50 },
    { label: '75', key: 75 },
    { label: '100', key: 100 },
];

function Pager(props: PagerProps) {
    const {
        activePage: activePageProps,
        className: classNameFromProps,
        itemsCount,
        onActivePageChange,
        onItemsPerPageChange,
        options = defaultOptions,
        maxItemsPerPage = 25,
        totalCapacity = 7,
        disabled = false,
        itemsPerPageControlHidden = false,
        infoHidden = false,
    } = props;

    const className = _cs(
        classNameFromProps,
        styles.pager,
    );

    const perPageTitle = 'per page';
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
        <div className={className}>
            {!itemsPerPageControlHidden && (
                <div className={styles.itemsPerPage}>
                    <SelectInput
                        name="itemsPerPageSelection"
                        className={styles.input}
                        options={options}
                        keySelector={(item) => item.key}
                        labelSelector={(item) => item.label}
                        value={maxItemsPerPage}
                        onChange={onItemsPerPageChange}
                        disabled={disabled}
                    />
                    <div className={styles.perPage}>
                        { perPageTitle }
                    </div>
                </div>
            )}
            {!infoHidden && (
                <div className={styles.currentRangeInformation}>
                    <div className={styles.showing}>
                        { showingTitle }
                    </div>
                    <div className={styles.currentItemsStart}>
                        { currentItemsStart }
                    </div>
                    <div className={styles.rangeIndicator}>
                        { rangeIndicator }
                    </div>
                    <div className={styles.currentItemsEnd}>
                        { currentItemsEnd }
                    </div>
                    <div className={styles.of}>
                        { ofTitle }
                    </div>
                    <div className={styles.itemCount}>
                        {itemsCount}
                    </div>
                </div>
            )}
            <div className={styles.pageList}>
                <Button
                    name={undefined}
                    className={styles.paginateBtn}
                    onClick={() => onActivePageChange(activePage - 1)}
                    disabled={activePage <= 1 || disabled}
                >
                    <FiChevronLeft />
                </Button>
                {pages.map((page) => (page.type === 'button' ? (
                    <Button
                        name={undefined}
                        key={`button-${page.index}`}
                        onClick={() => onActivePageChange(page.index)}
                        className={styles.paginateBtn}
                        disabled={disabled}
                    >
                        {page.index}
                    </Button>
                ) : (
                    <span
                        key={`span-${page.key}`}
                        className={_cs(styles.paginateSpan, page.key === 'active' && styles.active)}
                    >
                        {page.label}
                    </span>
                )))}
                <Button
                    name={undefined}
                    onClick={() => onActivePageChange(activePage + 1)}
                    disabled={activePage >= numPages || disabled}
                    className={styles.paginateBtn}
                >
                    <FiChevronRight />
                </Button>
            </div>
        </div>
    );
}
export default Pager;
