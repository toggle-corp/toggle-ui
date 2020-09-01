import React from 'react';
import {
    _cs,
    listToMap,
} from '@togglecorp/fujs';
import { MdCheck } from 'react-icons/md';

import SelectInputContainer from '../SelectInputContainer';
import { rankedSearchOnList } from '../../utils';

import styles from './styles.css';

type OptionKey = string | number;

export interface SelectInputProps<T extends OptionKey, K, O> {
    value: T,
    onChange: (newValue: T, name: K) => void;
    options: O[],
    keySelector: (option: O) => T,
    labelSelector: (option: O) => string,
    searchPlaceholder?: string;
    optionsEmptyComponent?: React.ReactNode;
    name: K;
}

const Option = ({
    children,
}) => (
    <>
        <div className={styles.icon}>
            <MdCheck />
        </div>
        <div className={styles.label}>
            { children }
        </div>
    </>
);

const DefaultEmptyComponent = () => (
    <div className={styles.empty}>
        No options available
    </div>
);

// eslint-disable-next-line @typescript-eslint/ban-types
function SelectInput<T extends OptionKey, K extends string, O extends Object>(
    props: SelectInputProps<T, K, O>,
) {
    const {
        value,
        onChange,
        options,
        keySelector,
        labelSelector,
        searchPlaceholder = 'Type to search',
        optionsEmptyComponent = <DefaultEmptyComponent />,
        name,
    } = props;

    const [searchInputValue, setSearchInputValue] = React.useState('');

    const optionsLabelMap = React.useMemo(() => (
        listToMap(options, keySelector, labelSelector)
    ), [options, keySelector, labelSelector]);

    const optionRendererParams = React.useCallback((key: OptionKey, option: O) => {
        const isActive = key === value;

        return {
            children: labelSelector(option),
            containerClassName: _cs(styles.option, isActive && styles.active),
            isActive,
        };
    }, [value, labelSelector]);

    const filteredOptions = React.useMemo(() => (
        rankedSearchOnList(options, searchInputValue, labelSelector)
    ), [options, searchInputValue, labelSelector]);

    return (
        <SelectInputContainer
            name={name}
            options={filteredOptions}
            optionKeySelector={keySelector}
            optionRenderer={Option}
            optionRendererParams={optionRendererParams}
            onOptionClick={onChange}
            onSearchInputChange={setSearchInputValue}
            valueDisplay={optionsLabelMap[value]}
            searchPlaceholder={searchPlaceholder}
            optionsEmptyComponent={optionsEmptyComponent}
            optionsPopupClassName={styles.optionsPopup}
        />
    );
}

export default SelectInput;
