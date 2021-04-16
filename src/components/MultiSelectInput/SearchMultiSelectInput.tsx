import React, { useCallback, useMemo } from 'react';
import {
    _cs,
    listToMap,
    isDefined,
    unique,
} from '@togglecorp/fujs';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import SelectInputContainer, { SelectInputContainerProps } from '../SelectInputContainer';
import { rankedSearchOnList } from '../../utils';

import styles from './styles.css';

// FIXME: move this inside the select input container
// FIXME: sort before passing to group
// FIXME: grouping and selections at top confilct with each other
// FIXME: only sort selections to top on popup open

interface OptionProps {
    children: React.ReactNode;
    isActive: boolean;
}
function Option(props: OptionProps) {
    const {
        children,
        isActive,
    } = props;

    return (
        <>
            <div className={styles.icon}>
                { isActive ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }
            </div>
            <div className={styles.label}>
                { children }
            </div>
        </>
    );
}

type Def = { containerClassName?: string, title?: string; };
type OptionKey = string | number;

export type SearchMultiSelectInputProps<
    T extends OptionKey,
    K,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
    OMISSION extends string,
> = Omit<{
    value: T[] | undefined | null;
    onChange: (newValue: T[], name: K) => void;
    options: O[] | undefined | null;
    keySelector: (option: O) => T;
    labelSelector: (option: O) => string;
    name: K;
    disabled?: boolean;
    readOnly?: boolean;
    onOptionsChange?: React.Dispatch<React.SetStateAction<O[] | undefined | null>>;
    searchOptions: O[] | undefined | null;
    onSearchValueChange: (searchVal: string) => void,
}, OMISSION> & (
    SelectInputContainerProps<T, K, O, P,
        'name'
        | 'nonClearable'
        | 'onClear'
        | 'onOptionClick'
        | 'onSearchInputChange'
        | 'optionKeySelector'
        | 'optionRenderer'
        | 'optionRendererParams'
        | 'optionsFiltered'
        | 'persistentOptionPopup'
        | 'valueDisplay'
    >
);

const emptyList: unknown[] = [];

function SearchMultiSelectInput<
    T extends OptionKey,
    K extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
>(
    props: SearchMultiSelectInputProps<T, K, O, P, never>,
) {
    const {
        keySelector,
        labelSelector,
        name,
        onChange,
        onOptionsChange,
        onSearchValueChange,
        options: optionsFromProps,
        optionsPending,
        optionsPopupClassName,
        searchOptions,
        value: valueFromProps,
        ...otherProps
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);
    const value = valueFromProps ?? (emptyList as T[]);

    const optionsMap = useMemo(
        () => (
            listToMap(options, keySelector, (i) => i)
        ),
        [options, keySelector],
    );

    const [searchInputValue, setSearchInputValue] = React.useState('');

    const optionsLabelMap = useMemo(
        () => (
            listToMap(options, keySelector, labelSelector)
        ),
        [options, keySelector, labelSelector],
    );

    const optionRendererParams = React.useCallback(
        (key: OptionKey, option: O) => {
            const isActive = value.findIndex((item) => item === key) !== -1;
            // TODO: optimize using map

            return {
                children: labelSelector(option),
                containerClassName: _cs(styles.option, isActive && styles.active),
                isActive,
                title: labelSelector(option),
            };
        },
        [value, labelSelector],
    );

    const handleSearchValueChange = useCallback(
        (newValue: string) => {
            setSearchInputValue(newValue);
            onSearchValueChange(newValue);
        },
        [setSearchInputValue, onSearchValueChange],
    );

    const handleOptionClick = React.useCallback(
        (k: T, v: O) => {
            const newValue = [...value];

            const optionKeyIndex = value.findIndex((d) => d === k);
            if (optionKeyIndex !== -1) {
                newValue.splice(optionKeyIndex, 1);
            } else {
                newValue.push(k);

                if (onOptionsChange) {
                    onOptionsChange(((existingOptions) => {
                        const safeOptions = existingOptions ?? [];
                        const opt = safeOptions.find((item) => keySelector(item) === k);
                        if (opt) {
                            return existingOptions;
                        }
                        return [...safeOptions, v];
                    }));
                }
            }

            onChange(newValue, name);
        },
        [value, onChange, name, onOptionsChange, keySelector],
        // FIXME: value should not be on dependency list
    );

    const handleClear = useCallback(
        () => {
            onChange([], name);
        },
        [name, onChange],
    );

    // NOTE: we can skip this calculation if optionsShowInitially is false
    const selectedOptions = useMemo(
        () => value.map((valueKey) => optionsMap[valueKey]).filter(isDefined),
        [value, optionsMap],
    );

    const realOptions = useMemo(
        () => {
            const agg = [
                ...rankedSearchOnList(selectedOptions, searchInputValue, labelSelector),
                ...(searchOptions ?? []),
            ];
            return unique(agg, keySelector);
        },
        [selectedOptions, searchOptions, labelSelector, searchInputValue, keySelector],
    );

    const valueDisplay = useMemo(
        () => (
            value.map((v) => optionsLabelMap[v] ?? '?').join(', ')
        ),
        [value, optionsLabelMap],
    );

    return (
        <SelectInputContainer
            {...otherProps}
            name={name}
            options={realOptions}
            optionsPending={optionsPending}
            optionsFiltered={searchInputValue?.length > 0}
            optionKeySelector={keySelector}
            optionRenderer={Option}
            optionRendererParams={optionRendererParams}
            optionContainerClassName={styles.optionContainer}
            onOptionClick={handleOptionClick}
            valueDisplay={valueDisplay}
            onSearchInputChange={handleSearchValueChange}
            optionsPopupClassName={optionsPopupClassName}
            onClear={handleClear}
            persistentOptionPopup
            nonClearable={false}
        />
    );
}

export default SearchMultiSelectInput;
