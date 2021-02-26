import React from 'react';
import { isNotDefined } from '@togglecorp/fujs';

export interface YesNoProps {
    value: boolean | undefined | null;
    className?: string;
}

function YesNoCell(props: YesNoProps) {
    const { value, className } = props;

    if (isNotDefined(value)) {
        return null;
    }

    return (
        <span
            className={className}
        >
            { value ? 'Yes' : 'No' }
        </span>
    );
}

export default YesNoCell;
