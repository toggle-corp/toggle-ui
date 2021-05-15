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

export interface Props {
    className?: string;
}

function PendingAnimation(props: Props) {
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
