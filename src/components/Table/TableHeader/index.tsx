import React from 'react';
import {
    _cs,
    isDefined,
} from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props<N extends string | number> extends Omit<React.HTMLProps<HTMLTableHeaderCellElement>, 'ref' | 'name'> {
    name?: N
    onResize?: (newWidth: number, name: N | undefined) => void;
    onResizeComplete?: (newWidth: number, name: N | undefined) => void;
}

function TableHeader<N extends string | number>(props: Props<N>) {
    const {
        className,
        children,
        onResize,
        onResizeComplete,
        name,
        ...otherProps
    } = props;

    const elementRef = React.useRef<HTMLTableHeaderCellElement>(null);
    const mouseDownXOnResizeHandleRef = React.useRef<number | undefined>();
    const headingWidthRef = React.useRef<number | undefined>();
    const finalHeadingWidthRef = React.useRef<number | undefined>();

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        if (isDefined(mouseDownXOnResizeHandleRef.current) && elementRef.current && onResize) {
            e.preventDefault();
            e.stopPropagation();
            const dx = e.clientX - mouseDownXOnResizeHandleRef.current;
            if (isDefined(headingWidthRef.current)) {
                const newWidth = headingWidthRef.current + dx;
                finalHeadingWidthRef.current = newWidth;
                onResize(newWidth, name);
            } else {
                headingWidthRef.current = elementRef.current?.offsetWidth;
            }
        }
    }, [onResize, name]);

    const handleResizeHandleMouseDown = React.useCallback((e: React.MouseEvent) => {
        mouseDownXOnResizeHandleRef.current = e.clientX;
        headingWidthRef.current = elementRef.current?.offsetWidth;
        window.addEventListener('mousemove', handleMouseMove, true);
    }, [handleMouseMove]);

    React.useEffect(() => {
        const handleMouseUp = () => {
            mouseDownXOnResizeHandleRef.current = undefined;
            headingWidthRef.current = undefined;
            if (onResizeComplete && isDefined(finalHeadingWidthRef.current)) {
                onResizeComplete(finalHeadingWidthRef.current, name);
            }
            window.removeEventListener('mousemove', handleMouseMove, true);
        };

        window.addEventListener('mouseup', handleMouseUp, true);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp, true);
            window.removeEventListener('mousemove', handleMouseMove, true);
        };
    }, [handleMouseMove, name, onResizeComplete]);

    return (
        <th
            ref={elementRef}
            className={_cs(
                className,
                styles.th,
            )}
            {...otherProps}
        >
            {onResize && (
                <div
                    role="presentation"
                    className={styles.resizeHandle}
                    onMouseDown={handleResizeHandleMouseDown}
                />
            )}
            {children}
        </th>
    );
}

export default TableHeader;
