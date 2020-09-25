import { useState, useCallback, useMemo } from 'react';
import { listToMap, compareNumber } from '@togglecorp/fujs';

interface OrderStateItem {
    name: string;
}

export function useOrderState<T extends OrderStateItem>(keys: T[]) {
    const [ordering, setOrdering] = useState(keys);

    const moveOrderingItem = useCallback(
        (drag: string, drop: string) => {
            const dragPosition = ordering.findIndex(o => o.name === drag);
            const dropPosition = ordering.findIndex(o => o.name === drop);
            if (dragPosition === dropPosition) {
                return;
            }
            if (dragPosition === -1 || dropPosition === -1) {
                console.error('Drag or drop item could not be found');
                return;
            }
            const dragItem = ordering[dragPosition];

            setOrdering((oldOrdering) => {
                const newOrdering = [...oldOrdering];
                if (dragPosition > dropPosition) {
                    newOrdering.splice(dragPosition, 1);
                    newOrdering.splice(dropPosition, 0, dragItem);
                } else {
                    newOrdering.splice(dropPosition + 1, 0, dragItem);
                    newOrdering.splice(dragPosition, 1);
                }
                return newOrdering;
            });
        },
        [ordering],
    );

    return {
        ordering,
        moveOrderingItem,
        setOrdering,
    };
}

interface OrderColumn {
    id: string;
}

function useOrdering<T extends OrderColumn, K extends OrderStateItem>(
    columns: T[],
    ordering: K[],
) {
    const filteredData = useMemo(
        () => {
            const mapping = listToMap(
                ordering,
                item => item.name,
                (item, __, index) => ({
                    ...item,
                    order: index,
                }),
            );
            const sortedColumns = columns
                .filter(foo => !!mapping[foo.id])
                .sort((foo, bar) => {
                    // FIXME: this can be optimized
                    const fooOrder = mapping[foo.id]?.order;
                    const barOrder = mapping[bar.id]?.order;
                    return compareNumber(fooOrder, barOrder);
                });
            return sortedColumns;
        },
        [ordering, columns],
    );

    return filteredData;
}

export default useOrdering;
