import React, { useCallback, useMemo, useState } from 'react';
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
    searchOptions?: O[] | undefined | null;
    keySelector: (option: O) => T;
    labelSelector: (option: O) => string;
    name: K;
    disabled?: boolean;
    readOnly?: boolean;
    onOptionsChange?: React.Dispatch<React.SetStateAction<O[] | undefined | null>>;
    sortFunction?: (options: O[], search: string, labelSelector: (option: O) => string) => O[];
    onSearchValueChange?: (value: string) => void;
    onShowDropdownChange?: (value: boolean) => void;
}, OMISSION> & (
    SelectInputContainerProps<T, K, O, P,
        'name'
        | 'nonClearable'
        | 'onClear'
        | 'onOptionClick'
        | 'optionKeySelector'
        | 'optionRenderer'
        | 'optionRendererParams'
        | 'optionsFiltered'
        | 'persistentOptionPopup'
        | 'valueDisplay'
        | 'optionContainerClassName'
        | 'searchText'
        | 'onSearchTextChange'
        | 'dropdownShown'
        | 'onDropdownShownChange'
        | 'focused'
        | 'onFocusedChange'
        | 'focusedKey'
        | 'onFocusedKeyChange'
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
        options: optionsFromProps,
        optionsPending,
        value: valueFromProps,
        sortFunction,
        searchOptions: searchOptionsFromProps,
        onSearchValueChange,
        onShowDropdownChange,
        ...otherProps
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);
    const searchOptions = searchOptionsFromProps ?? (emptyList as O[]);
    const value = valueFromProps ?? (emptyList as T[]);

    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const [
        focusedKey,
        setFocusedKey,
    ] = React.useState<{ key: T, mouse?: boolean } | undefined>();

    const [selectedKeys, setSelectedKeys] = useState<{
        [key: string]: boolean,
    }>({});

    const optionsMap = useMemo(
        () => (
            listToMap(options, keySelector, (i) => i)
        ),
        [options, keySelector],
    );

    const optionsLabelMap = useMemo(
        () => (
            listToMap(options, keySelector, labelSelector)
        ),
        [options, keySelector, labelSelector],
    );

    const valueDisplay = useMemo(
        () => (
            value.map((v) => optionsLabelMap[v] ?? '?').join(', ')
        ),
        [value, optionsLabelMap],
    );

    // NOTE: we can skip this calculation if optionsShowInitially is false
    const selectedOptions = useMemo(
        () => value.map((valueKey) => optionsMap[valueKey]).filter(isDefined),
        [value, optionsMap],
    );

    const realOptions = useMemo(
        () => {
            const allOptions = unique(
                [...searchOptions, ...selectedOptions],
                keySelector,
            );

            const initiallySelected = allOptions
                .filter((item) => selectedKeys[keySelector(item)]);
            const initiallyNotSelected = allOptions
                .filter((item) => !selectedKeys[keySelector(item)]);

            if (sortFunction) {
                return [
                    ...rankedSearchOnList(initiallySelected, searchInputValue, labelSelector),
                    ...sortFunction(initiallyNotSelected, searchInputValue, labelSelector),
                ];
            }

            return [
                ...rankedSearchOnList(initiallySelected, searchInputValue, labelSelector),
                ...initiallyNotSelected,
            ];
        },
        [
            keySelector,
            labelSelector,
            searchInputValue,
            searchOptions,
            selectedKeys,
            selectedOptions,
            sortFunction,
        ],
    );

    const handleSearchValueChange = useCallback(
        (searchValue: string) => {
            setSearchInputValue(searchValue);
            if (onSearchValueChange) {
                onSearchValueChange(searchValue);
            }
        },
        [onSearchValueChange],
    );

    const handleChangeDropdown = useCallback(
        (myVal: boolean) => {
            setShowDropdown(myVal);
            if (onShowDropdownChange) {
                onShowDropdownChange(myVal);
            }
            if (myVal) {
                setSelectedKeys(
                    listToMap(
                        value,
                        (item) => item,
                        () => true,
                    ),
                );
                setFocusedKey(undefined);
            } else {
                setSelectedKeys({});
                setFocusedKey(undefined);
                setSearchInputValue('');
                if (onSearchValueChange) {
                    onSearchValueChange('');
                }
            }
        },
        [value, onSearchValueChange, onShowDropdownChange],
    );

    const optionRendererParams = useCallback(
        (key: OptionKey, option: O) => {
            const isActive = value.findIndex((item) => item === key) !== -1;

            return {
                children: labelSelector(option),
                containerClassName: _cs(styles.option, isActive && styles.active),
                title: labelSelector(option),
                isActive,
            };
        },
        [labelSelector, value],
    );

    // FIXME: value should not be on dependency list
    const handleOptionClick = useCallback(
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
    );

    const handleClear = useCallback(
        () => {
            onChange([], name);
        },
        [name, onChange],
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
            onClear={handleClear}
            searchText={searchInputValue}
            onSearchTextChange={handleSearchValueChange}
            dropdownShown={showDropdown}
            onDropdownShownChange={handleChangeDropdown}
            focused={focused}
            onFocusedChange={setFocused}
            focusedKey={focusedKey}
            onFocusedKeyChange={setFocusedKey}
            persistentOptionPopup
            nonClearable={false}
        />
    );
}

export default SearchMultiSelectInput;
