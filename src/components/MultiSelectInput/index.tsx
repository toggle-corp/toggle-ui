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
interface Option {
    [index: string]: any;
}

export interface MultiSelectInputProps<T extends OptionKey, K> {
    value: T[],
    onChange: (newValue: T[]) => void;
    options: Option[],
    keySelector: (option: Option) => OptionKey,
    labelSelector: (option: Option) => string,
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

function MultiSelectInput<T extends OptionKey, K>(props: MultiSelectInputProps<T, K>) {
    const {
        value,
        onChange,
        options,
        keySelector,
        labelSelector,
    } = props;

    const [searchInputValue, setSearchInputValue] = React.useState('');

    const optionsLabelMap = React.useMemo(() => (
        listToMap(options, keySelector, labelSelector)
    ), [options, keySelector, labelSelector]);

    const optionRendererParams = React.useCallback((key, option) => {
        const isActive = value.indexOf(key) !== -1;

        return {
            children: option.label,
            containerClassName: _cs(styles.option, isActive && styles.active),
            isActive,
        };
    }, [value]);

    const filteredOptions = React.useMemo(() => (
        rankedSearchOnList(options, searchInputValue, labelSelector)
    ), [options, searchInputValue, labelSelector]);

    const handleOptionClick = React.useCallback((optionKey) => {
        const optionKeyIndex = value.findIndex((d) => d === optionKey);
        const newValue = [...value];

        if (optionKeyIndex !== -1) {
            newValue.splice(optionKeyIndex, 1);
        } else {
            newValue.push(optionKey);
        }

        onChange(newValue);
    }, [value, onChange]);

    const valueDisplay = React.useMemo(() => (
        value.map((v) => optionsLabelMap[v]).join(', ')
    ), [value, optionsLabelMap]);

    return (
        <SelectInputContainer
            options={filteredOptions}
            optionKeySelector={(d) => d.key}
            optionRenderer={Option}
            optionRendererParams={optionRendererParams}
            onOptionClick={handleOptionClick}
            optionContainerClassName={styles.optionContainer}
            onSearchInputChange={setSearchInputValue}
            valueDisplay={valueDisplay}
            searchPlaceholder="Start typing to search for options"
            optionsEmptyComponent="No options found"
            persistantOptionPopup
        />
    );
}

export default MultiSelectInput;
