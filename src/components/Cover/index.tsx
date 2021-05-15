import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { _cs } from '@togglecorp/fujs';

import Portal from '../Portal';

import styles from './styles.css';

interface Props {
    className?: string;
    children?: React.ReactNode;
}

function Cover(props: Props) {
    const {
        className,
        children,
    } = props;

    const dummyRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const resizeObserverRef = React.useRef<ResizeObserver>();
    const mutationObserverRef = React.useRef<MutationObserver>();
    const callbackRef = React.useRef<number | undefined>();

    const queueSync = React.useCallback(() => {
        if (callbackRef.current) {
            window.cancelIdleCallback(callbackRef.current);
        }

        callbackRef.current = window.requestIdleCallback(() => {
            if (dummyRef.current && containerRef.current) {
                const bcr = dummyRef.current.parentElement?.getBoundingClientRect();
                const {
                    top,
                    left,
                    width,
                    height,
                } = bcr ?? {};
                containerRef.current.style.left = `${left}px`;
                containerRef.current.style.top = `${top}px`;
                containerRef.current.style.width = `${width}px`;
                containerRef.current.style.height = `${height}px`;
            }
        }, { timeout: 200 });
    }, []);

    const handleResize = React.useCallback(() => {
        queueSync();
    }, [queueSync]);

    const handleAttributeMutation = React.useCallback((e) => {
        if (e[0].target === containerRef.current) {
            queueSync();
        }
    }, [queueSync]);

    const handleScroll = React.useCallback(() => {
        queueSync();
    }, [queueSync]);

    React.useEffect(() => {
        const { current: container } = dummyRef;

        if (!container || !container.parentElement) {
            // GGWP
        } else {
            document.addEventListener('scroll', handleScroll);

            resizeObserverRef.current = new ResizeObserver(handleResize);
            resizeObserverRef.current.observe(container.parentElement);

            mutationObserverRef.current = new MutationObserver(handleAttributeMutation);
            mutationObserverRef.current.observe(
                document.documentElement,
                {
                    attributes: true,
                    childList: true,
                    subtree: true,
                },
            );
        }

        return () => {
            document.removeEventListener('scroll', handleScroll);

            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }

            if (mutationObserverRef.current) {
                mutationObserverRef.current.disconnect();
            }
        };
    }, [handleResize, handleAttributeMutation, handleScroll]);

    return (
        <>
            <div
                ref={dummyRef}
                className={styles.dummy}
            />
            <Portal>
                <div
                    className={_cs(styles.cover, className)}
                    ref={containerRef}
                >
                    { children }
                </div>
            </Portal>
        </>
    );
}

export default Cover;
