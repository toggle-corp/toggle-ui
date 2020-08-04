import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { ResizeObserver } from 'resize-observer';

import styles from './styles.css';

export interface VisualFeedbackProps {
    className?: string;
    disabled?: boolean;
}

function VisualFeedback(props: VisualFeedbackProps) {
    const {
        className,
        disabled,
    } = props;
    const ref = React.useRef<HTMLDivElement>(null);

    const handleResize = React.useCallback(() => {
        if (ref.current) {
            const { current } = ref;
            const { parentElement } = current;

            if (parentElement) {
                const bcr = parentElement.getBoundingClientRect();
                current.style.left = `${bcr.x}px`;
                current.style.top = `${bcr.y}px`;
                current.style.width = `${bcr.width}px`;
                current.style.height = `${bcr.height}px`;
            }
        }

    }, [ref]);

    React.useEffect(handleResize, [ref, handleResize]);

    React.useEffect(() => {
        const observer = new ResizeObserver(handleResize);

        if (ref.current && ref.current.parentElement) {
            observer.observe(ref.current.parentElement);
        }
    }, [ref, handleResize]);

    return (
        <div
            ref={ref}
            className={_cs(
                className,
                styles.visualFeedback,
                disabled && styles.disabled,
            )}
        />
    );
}

export default VisualFeedback;
