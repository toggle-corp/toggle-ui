import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Portal from '../Portal';

import styles from './styles.css';

interface Props {
    className?: string;
    parentRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
}

const defaultPlacement = {
    top: 'unset',
    right: 'unset',
    bottom: 'unset',
    left: 'unset',
    minWidth: 'unset',
    width: 'unset',
};

function getFloatPlacement(parentRef: React.RefObject<HTMLElement>) {
    const placement = {
        ...defaultPlacement,
    };

    let horizontalPosition;
    let verticalPosition;

    if (parentRef?.current) {
        const parentBCR = parentRef.current.getBoundingClientRect();
        const { x, y, width, height } = parentBCR;

        const cX = window.innerWidth / 2;
        const cY = window.innerHeight / 2;

        horizontalPosition = (cX - parentBCR.x) > 0 ? 'right' : 'left';
        verticalPosition = (cY - parentBCR.y) > 0 ? 'bottom' : 'top';

        if (horizontalPosition === 'left') {
            placement.right = `${window.innerWidth - x - width}px`;
        } else if (horizontalPosition === 'right') {
            placement.left = `${x}px`;
        }

        if (verticalPosition === 'top') {
            placement.bottom = `${window.innerHeight - y + 10}px`;
        } else if (verticalPosition === 'bottom') {
            placement.top = `${y + height + 10}px`;
        }

        placement.width = `${width}px`;
    }

    return {
        placement,
        horizontalPosition,
        verticalPosition,
    };
}

function useAttachedFloatingPlacement(parentRef: React.RefObject<HTMLElement>) {
    const [placement, setPlacement] = React.useState(
        getFloatPlacement(parentRef),
    );

    const handleScroll = React.useCallback(() => {
        setPlacement(getFloatPlacement(parentRef));
    }, [setPlacement, parentRef]);

    const handleResize = React.useCallback(() => {
        setPlacement(getFloatPlacement(parentRef));
    }, [setPlacement, parentRef]);

    React.useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleScroll, handleResize]);

    return placement;
}

const Popup = React.forwardRef<HTMLDivElement, Props>(
    (props, ref) => {
        const {
            parentRef,
            children,
            className,
        } = props;

        const {
            placement,
            horizontalPosition,
            verticalPosition,
        } = useAttachedFloatingPlacement(parentRef);

        return (
            <Portal>
                <div
                    ref={ref}
                    style={placement}
                    className={_cs(
                        styles.popup,
                        className,
                        horizontalPosition === 'left' ? styles.left : styles.right,
                        verticalPosition === 'top' ? styles.top : styles.bottom,
                    )}
                >
                    <div className={styles.tip} />
                    { children }
                </div>
            </Portal>
        );
    },
);

export default Popup;
