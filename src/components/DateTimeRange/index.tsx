import React from 'react';
import { isNotDefined, isDefined, _cs } from '@togglecorp/fujs';

import DateTime from '../DateTime';

import styles from './styles.css';

export interface DateTimeRangeProps {
    from: string | undefined | null;
    to: string | undefined | null;
    className?: string;
    dateTimeClassName?: string;
    format?: 'date' | 'datetime';
}

function DateTimeRange(props: DateTimeRangeProps) {
    const {
        className,
        from,
        to,
        dateTimeClassName,
        format,
    } = props;

    if (isNotDefined(from) && isNotDefined(to)) {
        return null;
    }

    return (
        <span className={_cs(styles.dateTimeRange, className)}>
            <DateTime
                className={_cs(styles.dateTimeClassName, dateTimeClassName)}
                value={from}
                format={format}
            />
            {isDefined(from) && isDefined(to) && (
                <span className={styles.to}>
                    to
                </span>
            )}
            <DateTime
                className={_cs(styles.dateTimeClassName, dateTimeClassName)}
                value={to}
                format={format}
            />
        </span>
    );
}

export default DateTimeRange;
