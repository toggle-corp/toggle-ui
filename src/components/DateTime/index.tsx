import React from 'react';
import { isNotDefined } from '@togglecorp/fujs';

export interface DateTimeProps {
    value: string | undefined | null;
    className?: string;
    format?: 'date' | 'datetime';
}

const datetimeFormatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
});
const dateFormatter = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
});

function DateTime(props: DateTimeProps) {
    const {
        value,
        className,
        format = 'date',
    } = props;

    if (isNotDefined(value)) {
        return null;
    }

    const date = Date.parse(value);
    const formatter = format === 'datetime'
        ? datetimeFormatter
        : dateFormatter;
    const dateString = formatter.format(date);
    return (
        <time
            dateTime={value}
            className={className}
        >
            {dateString}
        </time>
    );
}

export default DateTime;
