import React from 'react';
import {
    isNotDefined,
    formattedNormalize,
    Lang,
    addSeparator,
    isTruthyString,
} from '@togglecorp/fujs';

export function getAutoPrecision(
    value: number | undefined,
    largeNumber: number,
    defaultPrecision: number,
) {
    if (!value) {
        return 0;
    }

    const absoluteValue = Math.abs(value);
    if (absoluteValue < 1) {
        // NOTE: the value is hardcoded here
        return Math.ceil(-Math.log10(absoluteValue)) + 1;
    }

    // NOTE: ignore precision for large numbers
    if (absoluteValue > largeNumber) {
        return 0;
    }
    return defaultPrecision;
}

function formatNumberRaw(
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
    let suffix : string | undefined;

    if (abbreviate) {
        const { number, normalizeSuffix } = formattedNormalize(sanitizedValue, Lang.en);
        suffix = normalizeSuffix;
        // NOTE: the value is hardcoded here
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

    return {
        value: output,
        valueSuffix: suffix,
    };
}

export interface NumeralProps {
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
    * Style for the abbreviation suffix
    */
    abbrClassName?: string;
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
    /**
    * Specify the value for a large number. Digits after decimal are hidden for large numbers
    */
    largeNumber?: number;
    /**
    * The no. of digits after decimal to show
    */
    defaultPrecision?: number;
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
    abbrClassName,
    largeNumber = 100,
    defaultPrecision = 2,
}: NumeralProps) {
    const fallback = (placeholder && (
        <span className={className}>
            {placeholder}
        </span>
    ));

    if (isNotDefined(value)) {
        return fallback;
    }

    const precise = precision < 0
        ? getAutoPrecision(value, largeNumber, defaultPrecision)
        : precision;
    const output = formatNumberRaw(
        value,
        separator,
        abbreviate,
        precise,
    );

    if (isNotDefined(output)) {
        return fallback;
    }

    return (
        <span className={className}>
            { prefix && (
                <span className={prefixClassName}>
                    { prefix }
                </span>
            )}
            <span className={valueClassName}>
                { output.value }
            </span>
            {isTruthyString(output.valueSuffix) && (
                <span className={abbrClassName}>
                    { output.valueSuffix }
                </span>
            )}
            {suffix && (
                <span className={suffixClassName}>
                    { suffix }
                </span>
            )}
        </span>
    );
}

export default Numeral;
