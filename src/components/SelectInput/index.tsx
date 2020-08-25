import React from 'react';
import {
    _cs,
    listToMap,
    isFalsyString,
    caseInsensitiveSubmatch,
    compareStringSearch,
} from '@togglecorp/fujs';

import SelectInputContainer from '../SelectInputContainer';

import styles from './styles.css';

type OptionKey = string | number;
interface Option {
    [index: string]: any;
}

export interface SelectInputProps<T extends OptionKey, K> {
    value: T,
    onChange: (newValue: T) => void;
    options: Option[],
    keySelector: (option: Option) => OptionKey,
    labelSelector: (option: Option) => string,
}

const Option = ({
    children,
    className,
}) => (
    <div className={className}>
        { children }
    </div>
);

function SelectInput<T extends OptionKey, K>(props: SelectInputProps<T, K>) {
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

    const optionRendererParams = React.useCallback((key, option) => ({
        children: option.label,
        className: _cs(styles.option, key === value && styles.active),
    }), [value]);

    const filteredOptions = React.useMemo(() => {
        if (isFalsyString(searchInputValue)) {
            return options;
        }

        return options
            .filter((option) => caseInsensitiveSubmatch(labelSelector(option), searchInputValue))
            .sort((a, b) => compareStringSearch(
                labelSelector(a),
                labelSelector(b),
                searchInputValue,
            ));
    }, [options, searchInputValue, labelSelector]);

    return (
        <SelectInputContainer
            options={filteredOptions}
            optionKeySelector={(d) => d.key}
            optionRenderer={Option}
            optionRendererParams={optionRendererParams}
            onOptionClick={onChange}
            optionContainerClassName={styles.optionContainer}
            onSearchInputChange={setSearchInputValue}
            valueDisplay={optionsLabelMap[value]}
            searchPlaceholder="Start typing to search for options"
            optionsEmptyComponent="No options found"
        />
    );
}

export default SelectInput;
