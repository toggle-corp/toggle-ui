import React, { useCallback } from 'react';
import {
    _cs,
    listToMap,
} from '@togglecorp/fujs';
import { MdCheck } from 'react-icons/md';

import SelectInputContainer, { SelectInputContainerProps } from '../SelectInputContainer';

import styles from './styles.css';

interface OptionProps {
    children: React.ReactNode;
}
function Option(props: OptionProps) {
    const { children } = props;
    return (
        <>
            <div className={styles.icon}>
                <MdCheck />
            </div>
            <div className={styles.label}>
                { children }
            </div>
        </>
    );
}

interface DefaultEmptyComponentProps {
    optionsPending?: boolean;
    isFiltered?: boolean;
}

function DefaultEmptyComponent(props: DefaultEmptyComponentProps) {
    const {
        isFiltered = false,
        optionsPending = false,
    } = props;

    if (optionsPending) {
        // FIXME: use loading
        return (
            <div className={styles.empty}>
                Fetching options...
            </div>
        );
    }

    if (isFiltered) {
        return (
            <div className={styles.empty}>
                No matching options available.
            </div>
        );
    }

    return (
        <div className={styles.empty}>
            No options available.
        </div>
    );
}

function DefaultEmptyComponentForSelections() {
    return (
        <div className={styles.empty}>
            Nothing selected.
        </div>
    );
}

type Def = { containerClassName?: string };
type OptionKey = string | number;

export type SearchSelectInputProps<
    T extends OptionKey,
    K,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
    OMISSION extends string,
> = Omit<{
    searchOptions: O[] | undefined | null,
    onOptionsChange?: React.Dispatch<React.SetStateAction<O[] | undefined | null>>;
    onSearchValueChange: (searchVal: string) => void,
    value: T | undefined | null,
    options: O[] | undefined | null,
    keySelector: (option: O) => T,
    labelSelector: (option: O) => string,
    searchPlaceholder?: string;
    optionsEmptyComponent?: React.ReactNode;
    name: K;
    disabled?: boolean;
    readOnly?: boolean;
    searchOptionsShownInitially?: boolean;
}, OMISSION> & (
    { nonClearable: true; onChange: (newValue: T, name: K) => void }
    | { nonClearable?: false; onChange: (newValue: T | undefined, name: K) => void }
) & (
    Omit<SelectInputContainerProps<T, K, O, P>,
        'name'
        | 'nonClearable'
        | 'onClear'
        | 'onOptionClick'
        | 'onSearchInputChange'
        | 'optionKeySelector'
        | 'optionRenderer'
        | 'optionRendererParams'
        | 'optionsEmptyComponent'
        | 'valueDisplay'
    >
);
const emptyList: unknown[] = [];

// eslint-disable-next-line @typescript-eslint/ban-types
function SearchSelectInput<T extends OptionKey, K extends string, O extends object, P extends Def>(
    props: SearchSelectInputProps<T, K, O, P, never>,
) {
    const {
        keySelector,
        labelSelector,
        name,
        onChange,
        onSearchValueChange,
        options: optionsFromProps,
        optionsEmptyComponent,
        optionsPending,
        optionsPopupClassName,
        searchOptions,
        searchPlaceholder = 'Type to search',
        value,
        onOptionsChange,
        searchOptionsShownInitially = false,
        ...otherProps
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);

    const [searchInputValue, setSearchInputValue] = React.useState('');

    const optionsLabelMap = React.useMemo(() => (
        listToMap(options, keySelector, labelSelector)
    ), [options, keySelector, labelSelector]);

    const optionRendererParams = React.useCallback(
        (key: OptionKey, option: O) => {
            const isActive = key === value;

            return {
                children: labelSelector(option),
                containerClassName: _cs(styles.option, isActive && styles.active),
                isActive,
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

    const handleChange = useCallback(
        (k: T, v: O) => {
            onChange(k, name);
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
        },
        [onChange, name, onOptionsChange, keySelector],
    );

    const handleClear = useCallback(
        () => {
            if (!props.nonClearable) {
                props.onChange(undefined, name);
            }
        },
        // eslint-disable-next-line react/destructuring-assignment
        [name, props.onChange, props.nonClearable],
    );

    // NOTE: we can skip this calculation if optionsShowInitially is false
    const selectedOptions = React.useMemo(
        () => {
            const selectedValue = options?.find((item) => keySelector(item) === value);
            if (!selectedValue) {
                return undefined;
            }
            return [selectedValue];
        },
        [options, keySelector, value],
    );

    const showSelectedOptions = !searchInputValue && !searchOptionsShownInitially;

    const realOptions = showSelectedOptions
        ? selectedOptions
        : searchOptions;

    const defaultOptionsEmptyComponent = showSelectedOptions
        ? (
            <DefaultEmptyComponentForSelections />
        ) : (
            <DefaultEmptyComponent
                isFiltered={searchInputValue?.length > 0}
                optionsPending={optionsPending}
            />
        );

    return (
        <SelectInputContainer
            {...otherProps}
            name={name}
            options={realOptions}
            onSearchInputChange={handleSearchValueChange}
            optionsPending={optionsPending}
            optionKeySelector={keySelector}
            optionRenderer={Option}
            optionRendererParams={optionRendererParams}
            onOptionClick={handleChange}
            valueDisplay={value ? optionsLabelMap[value] : ''}
            searchPlaceholder={searchPlaceholder}
            optionsEmptyComponent={optionsEmptyComponent ?? defaultOptionsEmptyComponent}
            optionsPopupClassName={_cs(optionsPopupClassName, styles.optionsPopup)}
            onClear={handleClear}
        />
    );
}

export default SearchSelectInput;
