import {
    isTruthy,
    isFalsyString,
    caseInsensitiveSubmatch,
    compareStringSearch,
} from '@togglecorp/fujs';

// eslint-disable-next-line import/prefer-default-export
export function rankedSearchOnList<T>(
    list: T[],
    searchString: string | undefined,
    labelSelector: (item: T) => string,
) {
    if (isFalsyString(searchString)) {
        return list;
    }

    return list
        .filter((option) => caseInsensitiveSubmatch(labelSelector(option), searchString))
        .sort((a, b) => compareStringSearch(
            labelSelector(a),
            labelSelector(b),
            searchString,
        ));
}

const INT_LIMIT = 9007199254740992;

const sanitizeNumber = (value = '') => {
    if (value === '') {
        return value;
    }

    const newValue = value.replace(/[^0-9]/g, '');
    if (newValue === '') {
        return newValue;
    }

    const realValue = +newValue;
    // NOTE: Limit integer value to MAX_LIMIT
    return (
        isTruthy(realValue)
            ? String(Math.min(INT_LIMIT, realValue))
            : newValue
    );
};

const isSign = (value: string) => value === '-';

export const getNumberAndSign = (value = '') => {
    if (Number.isNaN(value)) {
        return { sign: '-' };
    }

    const stringValue = value.toString();
    const firstCharacter = stringValue.charAt(0);

    if (isSign(firstCharacter)) {
        return {
            sign: '-',
            number: sanitizeNumber(stringValue.substring(1)),
        };
    }

    return { number: sanitizeNumber(stringValue) };
};
