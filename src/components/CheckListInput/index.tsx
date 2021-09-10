import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import InputContainer, { InputContainerProps } from '../InputContainer';
import List from '../List';
import Checkbox from '../Checkbox';

import styles from './styles.css';

type OptionKey = string | number;

export type CheckListInputProps<
    T extends OptionKey,
    K extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object
> = {
    value: T[] | undefined | null;
    options: O[] | undefined;
    onChange: (newValue: T[], name: K) => void;
    keySelector: (option: O) => T;
    labelSelector: (option: O) => string;
    name: K;
    checkboxClassName?: string;
    checkboxLabelClassName?: string;
    direction?: 'horizontal' | 'vertical';

} & Omit<InputContainerProps, 'input'>;

function CheckListInput<
    T extends OptionKey,
    K extends string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    O extends object,
>(props: CheckListInputProps<T, K, O>) {
    const {
        className,
        disabled,
        error,
        icons,
        actions,
        errorContainerClassName,
        hint,
        hintContainerClassName,
        label,
        labelContainerClassName,
        readOnly,
        uiMode,
        name,
        value,
        options,
        onChange,
        keySelector,
        labelSelector,
        inputContainerClassName,
        inputSectionClassName,
        actionsContainerClassName,
        iconsContainerClassName,
        checkboxLabelClassName,
        checkboxClassName,
        direction = 'horizontal',
    } = props;

    const handleCheck = useCallback((isSelected: boolean, key: T) => {
        if (isSelected) {
            onChange([...(value ?? []), key], name);
        } else {
            onChange([...(value ?? []).filter((v) => v !== key)], name);
        }
    }, [value, onChange, name]);

    const optionListRendererParams = useCallback((key: T, data: O) => ({
        name: key,
        value: (value ?? []).some((v) => v === key),
        onChange: handleCheck,
        label: labelSelector(data),
        labelClassName: checkboxLabelClassName,
        uiMode,
        disabled,
        readOnly,
    }), [
        value,
        handleCheck,
        labelSelector,
        uiMode,
        disabled,
        readOnly,
        checkboxLabelClassName,
    ]);

    return (
        <InputContainer
            className={_cs(
                styles.checkListInput,
                className,
                direction === 'horizontal' && styles.horizontal,
                direction === 'vertical' && styles.vertical,
            )}
            actionsContainerClassName={actionsContainerClassName}
            labelContainerClassName={labelContainerClassName}
            inputSectionClassName={inputSectionClassName}
            errorContainerClassName={errorContainerClassName}
            hintContainerClassName={hintContainerClassName}
            iconsContainerClassName={iconsContainerClassName}
            disabled={disabled}
            error={error}
            hint={hint}
            icons={icons}
            label={label}
            readOnly={readOnly}
            uiMode={uiMode}
            actions={actions}
            inputContainerClassName={_cs(styles.checkListContainer, inputContainerClassName)}
            input={(
                <List
                    data={options}
                    keySelector={keySelector}
                    renderer={Checkbox}
                    rendererParams={optionListRendererParams}
                    rendererClassName={checkboxClassName}
                />
            )}
        />
    );
}

export default CheckListInput;
