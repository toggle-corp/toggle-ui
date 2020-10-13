import React from 'react';
import {
    _cs,
    listToMap,
} from '@togglecorp/fujs';
import { MdCheck } from 'react-icons/md';

import SelectInputContainer, { SelectInputContainerProps } from '../SelectInputContainer';
import { rankedSearchOnList } from '../../utils';

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

function DefaultEmptyComponent() {
    return (
        <div className={styles.empty}>
            No options available
        </div>
    );
}

type Def = { containerClassName?: string };
type OptionKey = string | number;
export type SelectInputProps<
    T extends OptionKey,
    K,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
    P extends Def,
> = {
    value: T,
    onChange: (newValue: T, name: K) => void;
    options: O[] | undefined,
    keySelector: (option: O) => T,
    labelSelector: (option: O) => string,
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
function SelectInput<T extends OptionKey, K extends string, O extends object, P extends Def>(
    props: SelectInputProps<T, K, O, P>,
) {
    const {
        value,
        onChange,
        options = (emptyList as O[]),
        keySelector,
        labelSelector,
        searchPlaceholder = 'Type to search',
        optionsEmptyComponent,
        optionsPopupClassName,
        ...otherProps
    } = props;

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

    const filteredOptions = React.useMemo(() => (
        rankedSearchOnList(options, searchInputValue, labelSelector)
    ), [options, searchInputValue, labelSelector]);

    return (
        <SelectInputContainer
            {...otherProps}
            options={filteredOptions}
            optionKeySelector={keySelector}
            optionRenderer={Option}
            optionRendererParams={optionRendererParams}
            onOptionClick={onChange}
            onSearchInputChange={setSearchInputValue}
            valueDisplay={optionsLabelMap[value]}
            searchPlaceholder={searchPlaceholder}
            optionsEmptyComponent={optionsEmptyComponent ?? <DefaultEmptyComponent />}
            optionsPopupClassName={_cs(optionsPopupClassName, styles.optionsPopup)}
        />
    );
}

export default SelectInput;
