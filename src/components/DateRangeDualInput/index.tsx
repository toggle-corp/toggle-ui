import React, { useCallback, useMemo } from 'react';
import {
    isDefined,
} from '@togglecorp/fujs';

import DateRangeInput, {
    Props as DateRangeInputProps,
    Value as DateRangeInputValue,
} from '../DateRangeInput';

type DateRangeProps<N extends string | number | undefined> = Omit<DateRangeInputProps<N>, 'onChange' | 'name' | 'value'>;

export interface Props<N extends string | number | undefined> extends DateRangeProps<N> {
    fromName: N;
    toName: N;
    fromValue: string | undefined | null;
    toValue: string | undefined | null;
    fromOnChange?: (value: string | undefined, name: N) => void;
    toOnChange?: (value: string | undefined, name: N) => void;
    fromError?: string | undefined | null;
    toError?: string | undefined | null;
}

function DateRangeDualInput<N extends string | number | undefined>(props: Props<N>) {
    const {
        fromName,
        toName,
        fromValue,
        toValue,
        fromOnChange,
        toOnChange,
        fromError,
        toError,
        ...otherProps
    } = props;

    const value = useMemo(
        () => ((fromValue && toValue)
            ? ({ startDate: fromValue, endDate: toValue })
            : undefined
        ),
        [toValue, fromValue],
    );

    const handleValueChange = useCallback((newVal: DateRangeInputValue | undefined) => {
        if (!newVal) {
            return;
        }
        if (fromOnChange) {
            fromOnChange(newVal.startDate, fromName);
        }
        if (toOnChange) {
            toOnChange(newVal.endDate, toName);
        }
    }, [
        toOnChange,
        fromOnChange,
        toName,
        fromName,
    ]);

    const error = useMemo(() => {
        const errors = [
            toError,
            fromError,
        ].filter(isDefined);
        return errors.length > 0 ? errors.join(', ') : undefined;
    }, [toError, fromError]);

    return (
        <DateRangeInput
            name={undefined}
            value={value}
            onChange={handleValueChange}
            error={error}
            {...otherProps}
        />
    );
}

export default DateRangeDualInput;
