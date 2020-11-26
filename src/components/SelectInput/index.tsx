import React from 'react';
import SearchSelectInput, { SearchSelectInputProps } from './SearchSelectInput';
import { rankedSearchOnList } from '../../utils';

type Def = { containerClassName?: string };
type OptionKey = string | number;

const emptyList: unknown[] = [];

export type SelectInputProps<
    T extends OptionKey,
    K extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
> = SearchSelectInputProps<T, K, O, P, 'onSearchValueChange' | 'searchOptions' | 'searchOptionsShownInitially'>;

// eslint-disable-next-line @typescript-eslint/ban-types
function SelectInput<T extends OptionKey, K extends string, O extends object, P extends Def>(
    props: SelectInputProps<T, K, O, P>,
) {
    const {
        name,
        options,
        labelSelector,
        nonClearable, // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars
        onChange, // eslint-disable-line no-unused-vars, @typescript-eslint/no-unused-vars
        ...otherProps
    } = props;

    const [searchInputValue, setSearchInputValue] = React.useState('');

    const searchOptions = React.useMemo(
        () => rankedSearchOnList(options ?? (emptyList as O[]), searchInputValue, labelSelector),
        [options, searchInputValue, labelSelector],
    );

    // NOTE: this looks weird but we need to use typeguard to identify between
    // different union types (for onChange and nonClearable)
    // eslint-disable-next-line react/destructuring-assignment
    if (props.nonClearable) {
        return (
            <SearchSelectInput
                {...otherProps}
                onChange={props.onChange}
                nonClearable={props.nonClearable}
                name={name}
                options={options}
                labelSelector={labelSelector}
                onSearchValueChange={setSearchInputValue}
                searchOptions={searchOptions}
                searchOptionsShownInitially
            />
        );
    }
    return (
        <SearchSelectInput
            {...otherProps}
            // eslint-disable-next-line react/destructuring-assignment
            onChange={props.onChange}
            // eslint-disable-next-line react/destructuring-assignment
            nonClearable={props.nonClearable}
            name={name}
            options={options}
            labelSelector={labelSelector}
            onSearchValueChange={setSearchInputValue}
            searchOptions={searchOptions}
            searchOptionsShownInitially
        />
    );
}

export default SelectInput;
