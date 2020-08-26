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
interface Option {
    [index: string]: any;
}

export interface SelectInputProps<T extends OptionKey> {
    value: T,
    onChange: (newValue: T) => void;
    options: Option[],
    keySelector: (option: Option) => T,
    labelSelector: (option: Option) => string,
    searchPlaceholder?: string;
    optionsEmptyComponent?: React.ReactNode;
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

function SelectInput<T extends OptionKey>(props: SelectInputProps<T>) {
    const {
        value,
        onChange,
        options,
        keySelector,
        labelSelector,
        searchPlaceholder = 'Type to search',
        optionsEmptyComponent = <DefaultEmptyComponent />,
    } = props;

    const [searchInputValue, setSearchInputValue] = React.useState('');

    const optionsLabelMap = React.useMemo(() => (
        listToMap(options, keySelector, labelSelector)
    ), [options, keySelector, labelSelector]);

    const optionRendererParams = React.useCallback((key: OptionKey, option: Option) => {
        const isActive = key === value;

        return {
            children: option.label,
            containerClassName: _cs(styles.option, isActive && styles.active),
            isActive,
        };
    }, [value]);

    const filteredOptions = React.useMemo(() => (
        rankedSearchOnList(options, searchInputValue, labelSelector)
    ), [options, searchInputValue, labelSelector]);

    return (
        <SelectInputContainer
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
