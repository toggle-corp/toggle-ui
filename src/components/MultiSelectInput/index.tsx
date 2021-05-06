import React from 'react';
import SearchMultiSelectInput, { SearchMultiSelectInputProps } from './SearchMultiSelectInput';
import { rankedSearchOnList } from '../../utils';

type Def = { containerClassName?: string };
type OptionKey = string | number;

export type MultiSelectInputProps<
    T extends OptionKey,
    K extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
> = SearchMultiSelectInputProps<T, K, O, P, 'onSearchValueChange' | 'searchOptions' | 'onShowDropdownChange' | 'totalOptionsCount'>;

// eslint-disable-next-line @typescript-eslint/ban-types
function MultiSelectInput<T extends OptionKey, K extends string, O extends object, P extends Def>(
    props: MultiSelectInputProps<T, K, O, P>,
) {
    const {
        name,
        options,
        totalOptionsCount, // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars
        ...otherProps
    } = props;

    return (
        <SearchMultiSelectInput
            {...otherProps}
            name={name}
            options={options}
            sortFunction={rankedSearchOnList}
            searchOptions={options}
        />
    );
}

export default MultiSelectInput;
