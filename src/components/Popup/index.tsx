import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { getFloatPlacement } from '#utils/common';

import styles from './styles.css';

interface Props {
    className?: string;
    parentRef: React.RefObject<HTMLElement>;
    // forwardedRef: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
}

function getFloatPlacement(parentRef: React.RefObject<HTMLElement>) {
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

const Popup = React.forwardRef<HTMLDivElement, Props>(
    (props, ref) => {
        const {
            parentRef,
            children,
            // forwardedRef,
            className,
        } = props;

        const style = getFloatPlacement(parentRef);

        return (
            <div
                ref={ref}
                style={style}
                className={_cs(styles.dropdownContainer, className)}
            >
                { children }
            </div>
        );
    },
);

export default Popup;
