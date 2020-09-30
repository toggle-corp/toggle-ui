import { memo } from 'react';

import {
    isFalsyString,
    caseInsensitiveSubmatch,
    compareStringSearch,
} from '@togglecorp/fujs';

// eslint-disable-next-line import/prefer-default-export
export function rankedSearchOnList<T>(
    list: T[],
    searchString: string | undefined,
    labelSelector: (item: T) => string,
) {
    if (isFalsyString(searchString)) {
        return list;
    }

    return list
        .filter((option) => caseInsensitiveSubmatch(labelSelector(option), searchString))
        .sort((a, b) => compareStringSearch(
            labelSelector(a),
            labelSelector(b),
            searchString,
        ));
}

export const typedMemo: (<T>(c: T) => T) = memo;

export function getFloatPlacement(parentRef: React.RefObject<HTMLElement>) {
    const placement = {
        top: 'unset',
        right: 'unset',
        bottom: 'unset',
        left: 'unset',
        minWidth: 'unset',
        width: 'unset',
    };

    if (parentRef.current) {
        const parentBCR = parentRef.current.getBoundingClientRect();
        const { x, y, width, height } = parentBCR;

        const cX = window.innerWidth / 2;
        const cY = window.innerHeight / 2;

        const horizontalPosition = (cX - parentBCR.x) > 0 ? 'right' : 'left';
        const verticalPosition = (cY - parentBCR.y) > 0 ? 'bottom' : 'top';

        if (horizontalPosition === 'left') {
            placement.right = `${window.innerWidth - x - width}px`;
        } else if (horizontalPosition === 'right') {
            placement.left = `${x}px`;
        }

        if (verticalPosition === 'top') {
            placement.bottom = `${window.innerHeight - y}px`;
        } else if (verticalPosition === 'bottom') {
            placement.top = `${y + height}px`;
        }

        placement.width = `${width}px`;
        placement.minWidth = '240px';
    }

    return placement;
}
