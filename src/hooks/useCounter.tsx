import React, { useRef, useCallback, useState } from 'react';
import {
    isNotDefined,
    isDefined,
} from '@togglecorp/fujs';

function easeOutCubic(x: number): number {
    return 1 - ((1 - x) ** 3);
}

function useCounter(
    to: number | undefined | null,
    interval: number,
    easing: 'linear' | 'exp',
) {
    const [count, setCount] = useState(isDefined(to) ? 0 : undefined);
    const countRef = useRef(count);
    const fromRef = useRef(count);
    const startTimeRef = useRef<number | undefined>();
    const requestRef = useRef<number | undefined>();

    const animate = useCallback(
        (now: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = now;
            }
            const { current: startTime } = startTimeRef;
            const { current: from } = fromRef;
            const relativeTime = Math.min(now - startTime, interval);
            const relativeProgress = relativeTime / interval;
            const transitionedProgress = easing === 'linear'
                ? relativeProgress : easeOutCubic(relativeProgress);

            const relativeValue = (isNotDefined(from) || isNotDefined(to))
                ? undefined
                : from + (transitionedProgress * (to - from));

            countRef.current = relativeValue;
            setCount(relativeValue);
            if (relativeProgress < 1) {
                requestRef.current = requestAnimationFrame(animate);
            }
        },
        [interval, to, easing],
    );
    React.useEffect(() => {
        if (isNotDefined(to)) {
            countRef.current = undefined;
            setCount(undefined);
            return undefined;
        }
        startTimeRef.current = undefined;
        fromRef.current = countRef.current ?? 0;
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (isDefined(requestRef.current)) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [animate, to, interval]); // Make sure the effect runs only once

    return count;
}

export default useCounter;
