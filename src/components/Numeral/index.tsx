import React from 'react';
import {
    isNotDefined,
    formattedNormalize,
    Lang,
    addSeparator,
    isTruthyString,
} from '@togglecorp/fujs';

export function getAutoPrecision(value: number | undefined) {
    if (!value) {
        return 0;
    }

    const absoluteValue = Math.abs(value);
    if (absoluteValue < 1) {
        return Math.ceil(-Math.log10(absoluteValue)) + 1;
    }

    // NOTE: ignore precision for large numbers
    if (absoluteValue > 100) {
        return 0;
    }
    return 2;
}

export function formatNumber(
    value: number | undefined,
    separator: string,
    abbreviate?: boolean,
    precision?: number,
) {
    if (isNotDefined(value)) {
        return undefined;
    }

    const sanitizedValue = Number.parseFloat(String(value));
    if (Number.isNaN(sanitizedValue)) {
        return undefined;
    }

    let output = '';
    let suffix: string | undefined;

    if (abbreviate) {
        const { number, normalizeSuffix } = formattedNormalize(sanitizedValue, Lang.en);
        suffix = normalizeSuffix;
        output = isTruthyString(suffix)
            ? number.toFixed(1)
            : number.toFixed(precision);
    } else {
        output = sanitizedValue.toFixed(precision);
    }

    // TODO: do not hardcode decimal symbol

    const indexOfDecimal = output.indexOf('.');
    if (indexOfDecimal !== -1) {
        if (/\.0+$/.test(output)) {
            // Remove all trailing zeros starting immediately after decimal
            output = output.substr(0, indexOfDecimal);
        } else {
            // Remove trailing zeros after decimal
            output = output.replace(/(\.\d*[1-9]+)0+/, '$1');
        }
    }

    if (isTruthyString(separator)) {
        output = addSeparator(output, separator);
    }

    return `${output}${suffix ?? ''}`;
}

interface NumeralProps {
    value: number | undefined;
    /**
    * Max no. of digits after decimal.
    * A value of -1 will automatically calculate precision based on value
    */
    precision?: number | undefined;
    /**
    * Style for the component
    */
    className?: string;
    /**
    * Style for the component
    */
    prefixClassName?: string;
    /**
    * Style for the component
    */
    valueClassName?: string;
    /**
    * Style for the suffix
    */
    suffixClassName?: string;
    /**
    * Abbreviate the number value
    */
    abbreviate?: boolean;
    /**
    * Character used for thousand separators
    */
    separator?: string;
    /**
    * Prefix added to the value
    */
    prefix?: string;
    /**
    * Suffix added to the value
    */
    suffix?: string;
    /**
    * Content to show when value is not defined
    */
    placeholder?: string;
}

/**
 * Number formatting component
 */
function Numeral({
    value,
    precision = -1,
    className,
    abbreviate,
    separator = ',',
    prefix = '',
    suffix = '',
    placeholder = '',
    prefixClassName,
    valueClassName,
    suffixClassName,
}: NumeralProps) {
    if (isNotDefined(value)) {
        return (placeholder && (
            <span className={className}>
                {placeholder}
            </span>
        ));
    }

    const precise = precision < 0 ? getAutoPrecision(value) : precision;
    const output = formatNumber(
        value,
        separator,
        abbreviate,
        precise,
    );

    return (
        <span className={className}>
            { prefix && (
                <span className={prefixClassName}>
                    { prefix }
                </span>
            )}
            <span className={valueClassName}>
                { output }
            </span>
            { suffix && (
                <span className={suffixClassName}>
                    { suffix }
                </span>
            )}
        </span>
    );
}

export default Numeral;
