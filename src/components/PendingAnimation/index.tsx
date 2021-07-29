import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

function Circle() {
    return (
        <div className={styles.circle}>
            <div className={styles.innerCircle} />
        </div>
    );
}

export interface PendingAnimationProps {
    className?: string;
}

function PendingAnimation(props: PendingAnimationProps) {
    const {
        className,
    } = props;

    return (
        <div className={_cs(styles.pendingAnimation, className)}>
            <Circle />
            <Circle />
            <Circle />
        </div>
    );
}

export default PendingAnimation;
