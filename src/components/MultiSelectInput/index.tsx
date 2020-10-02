import React from 'react';
import {
    _cs,
    listToMap,
} from '@togglecorp/fujs';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import SelectInputContainer, { SelectInputContainerProps } from '../SelectInputContainer';
import { rankedSearchOnList } from '../../utils';

import styles from './styles.css';

type OptionKey = string | number;

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

function DefaultEmptyComponent() {
    return (
        <div className={styles.empty}>
            No options available
        </div>
    );
}

type Def = { containerClassName?: string };

// eslint-disable-next-line @typescript-eslint/ban-types
export type MultiSelectInputProps<
    T extends OptionKey,
    K,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
> = {
    value: T[] | undefined;
    onChange: (newValue: T[], name: K) => void;
    options: O[] | undefined;
    keySelector: (option: O) => T;
    labelSelector: (option: O) => string;
    searchPlaceholder?: string;
    optionsEmptyComponent?: React.ReactNode;
    name: K;
    disabled?: boolean;
    readOnly?: boolean;
} & Omit<
    SelectInputContainerProps<T, K, O, P>,
        'optionsEmptyComponent'
        | 'optionKeySelector'
        | 'optionRenderer'
        | 'optionRendererParams'
        | 'onOptionClick'
        | 'name'
        | 'valueDisplay'
        | 'onSearchInputChange'
    >;

const emptyList: unknown[] = [];

// eslint-disable-next-line @typescript-eslint/ban-types
function MultiSelectInput<T extends OptionKey, K extends string, O extends object, P extends Def>(
    props: MultiSelectInputProps<T, K, O, P>,
) {
    const {
        value = (emptyList as T[]),
        onChange,
        options = (emptyList as O[]),
        keySelector,
        labelSelector,
        searchPlaceholder = 'Type to search',
        optionsEmptyComponent = <DefaultEmptyComponent />,
        name,
        ...otherProps
    } = props;

    const [searchInputValue, setSearchInputValue] = React.useState('');

    const optionsLabelMap = React.useMemo(() => (
        listToMap(options, keySelector, labelSelector)
    ), [options, keySelector, labelSelector]);

    const optionRendererParams = React.useCallback((key, option) => {
        // TODO: optimize using map
        const isActive = value.indexOf(key) !== -1;

        return {
            children: labelSelector(option),
            containerClassName: _cs(styles.option, isActive && styles.active),
            isActive,
        };
    }, [value, labelSelector]);

    const filteredOptions = React.useMemo(() => (
        rankedSearchOnList(options, searchInputValue, labelSelector)
    ), [options, searchInputValue, labelSelector]);

    const handleOptionClick = React.useCallback((optionKey: T) => {
        const optionKeyIndex = value.findIndex((d) => d === optionKey);
        const newValue = [...value];

        if (optionKeyIndex !== -1) {
            newValue.splice(optionKeyIndex, 1);
        } else {
            newValue.push(optionKey);
        }

        onChange(newValue, name);
    }, [value, onChange, name]);

    const valueDisplay = React.useMemo(() => (
        value.map((v) => optionsLabelMap[v]).join(', ')
    ), [value, optionsLabelMap]);

    return (
        <SelectInputContainer
            {...otherProps}
            name={name}
            options={filteredOptions}
            optionKeySelector={keySelector}
            optionRenderer={Option}
            optionRendererParams={optionRendererParams}
            onOptionClick={handleOptionClick}
            optionContainerClassName={styles.optionContainer}
            onSearchInputChange={setSearchInputValue}
            valueDisplay={valueDisplay}
            searchPlaceholder={searchPlaceholder}
            optionsEmptyComponent={optionsEmptyComponent}
            persistentOptionPopup
            optionsPopupClassName={styles.optionsPopup}
        />
    );
}

export default MultiSelectInput;
