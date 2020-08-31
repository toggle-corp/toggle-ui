import React from 'react';
import {
    _cs,
    listToMap,
} from '@togglecorp/fujs';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import SelectInputContainer from '../SelectInputContainer';
import { rankedSearchOnList } from '../../utils';

import styles from './styles.css';

type OptionKey = string | number;
interface Option extends Object {}

export interface MultiSelectInputProps<T extends OptionKey, K> {
    value: T[];
    onChange: (newValue: T[]) => void;
    options: Option[];
    keySelector: (option: Option) => OptionKey;
    labelSelector: (option: Option) => string;
    searchPlaceholder?: string;
    optionsEmptyComponent?: React.ReactNode;
}

const Option = ({
    children,
    isActive,
}) => (
    <>
        <div className={styles.icon}>
            { isActive ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }
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

function MultiSelectInput<T extends OptionKey, K>(props: MultiSelectInputProps<T, K>) {
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

    const handleOptionClick = React.useCallback((optionKey: OptionKey) => {
        const optionKeyIndex = value.findIndex((d) => d === optionKey);
        const newValue = [...value];

        if (optionKeyIndex !== -1) {
            newValue.splice(optionKeyIndex, 1);
        } else {
            newValue.push(optionKey as T);
        }

        onChange(newValue);
    }, [value, onChange]);

    const valueDisplay = React.useMemo(() => (
        value.map((v) => optionsLabelMap[v]).join(', ')
    ), [value, optionsLabelMap]);

    return (
        <SelectInputContainer
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
            persistantOptionPopup
            optionsPopupClassName={styles.optionsPopup}
        />
    );
}

export default MultiSelectInput;
