import React from 'react';
import SearchMultiSelectInput, { SearchMultiSelectInputProps } from './SearchMultiSelectInput';
import { rankedSearchOnList } from '../../utils';

type Def = { containerClassName?: string };
type OptionKey = string | number;

const emptyList: unknown[] = [];

export type MultiSelectInputProps<
    T extends OptionKey,
    K extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
> = Omit<SearchMultiSelectInputProps<T, K, O, P>, 'onSearchMultiValueChange' | 'searchOptions' | 'searchOptionsShownInitially'>;

// eslint-disable-next-line @typescript-eslint/ban-types
function MultiSelectInput<T extends OptionKey, K extends string, O extends object, P extends Def>(
    props: MultiSelectInputProps<T, K, O, P>,
) {
    const {
        name,
        options,
        labelSelector,
        ...otherProps
    } = props;

    const [searchInputValue, setSearchInputValue] = React.useState('');

    const searchOptions = React.useMemo(
        () => rankedSearchOnList(options ?? (emptyList as O[]), searchInputValue, labelSelector),
        [options, searchInputValue, labelSelector],
    );

    return (
        <SearchMultiSelectInput
            {...otherProps}
            name={name}
            options={options}
            labelSelector={labelSelector}
            onSearchValueChange={setSearchInputValue}
            searchOptions={searchOptions}
            searchOptionsShownInitially
        />
    );
}

export default MultiSelectInput;
