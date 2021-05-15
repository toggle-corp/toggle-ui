import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Cover from '../Cover';
import PendingAnimation from '../PendingAnimation';
import styles from './styles.css';

export interface Props {
    className?: string;
    message?: string;
}

function PendingMessage(props: Props) {
    const {
        className,
        message = 'Please wait...',
    } = props;

    return (
        <Cover className={_cs(styles.pendingMessage, className)}>
            <PendingAnimation />
            <div className={styles.message}>
                { message }
            </div>
        </Cover>
    );
}

export default PendingMessage;
