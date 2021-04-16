import React, { useCallback, useState } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io';

import GenericOption, { ContentBaseProps, OptionKey } from '../GenericOption';
import Popup from '../Popup';
import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput from '../RawInput';
import Button from '../Button';
import List from '../List';
import { useBlurEffect } from '../../hooks';
import useKeyboard from '../useKeyboard';

import EmptyOptions from './EmptyOptions';
import styles from './styles.css';

interface GroupProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    headerContainerClassName?: string;
    childrenContainerClassName?: string;
}
function Group({
    className,
    title,
    children,
    headerContainerClassName,
    childrenContainerClassName,
}: GroupProps) {
    return (
        <div className={_cs(className, styles.group)}>
            <header
                className={_cs(headerContainerClassName, styles.groupHeader)}
                title={title}
            >
                {title}
            </header>
            <div className={_cs(childrenContainerClassName, styles.groupChildren)}>
                { children }
            </div>
        </div>
    );
}
export type SelectInputContainerProps<
    OK extends OptionKey,
    N,
    O,
    P extends ContentBaseProps,
    OMISSION extends string,
> = Omit<{
    name: N,
    selectedKey?: OK;
    onOptionClick: (optionKey: OK, option: O, name: N) => void;
    onSearchInputChange: (search: string) => void;
    optionContainerClassName?: string;
    optionKeySelector: (datum: O, index: number) => OK;
    optionRenderer: (props: Pick<P, Exclude<keyof P, 'containerClassName' | 'title'>>) => React.ReactNode;
    optionRendererParams: (optionKey: OK, option: O) => P;
    options: O[] | undefined | null;
    optionsPending?: boolean;
    optionsFiltered?: boolean;
    optionsPopupClassName?: string;
    persistentOptionPopup?: boolean;
    placeholder?: string;
    valueDisplay: string;

    nonClearable?: boolean;
    onClear: () => void;
}, OMISSION> & Omit<InputContainerProps, 'input'> & ({
    grouped: true;
    groupLabelSelector: (option: O) => string;
    groupKeySelector: (option: O) => string | number;
} | {
    grouped?: false;
    groupLabelSelector?: undefined;
    groupKeySelector?: undefined;
});

const emptyList: unknown[] = [];

// eslint-disable-next-line @typescript-eslint/ban-types, max-len
function SelectInputContainer<OK extends OptionKey, N extends string, O extends object, P extends ContentBaseProps>(
    props: SelectInputContainerProps<OK, N, O, P, never>,
) {
    const {
        actions,
        actionsContainerClassName,
        className,
        disabled,
        error,
        errorContainerClassName,
        hint,
        hintContainerClassName,
        icons,
        iconsContainerClassName,
        inputSectionClassName,
        label,
        labelContainerClassName,
        name,
        onOptionClick,
        onSearchInputChange,
        optionContainerClassName,
        optionKeySelector,
        optionRenderer,
        optionRendererParams,
        options: optionsFromProps,
        optionsPopupClassName,
        persistentOptionPopup,
        readOnly,
        placeholder,
        uiMode,
        valueDisplay = '',
        nonClearable,
        onClear,
        optionsPending,
        optionsFiltered,
        selectedKey,
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);

    const optionsEmpty = options.length <= 0;

    const [focused, setFocused] = useState(false);
    const [
        focusedKey,
        setFocusedKey,
    ] = React.useState<{ key: OK, mouse?: boolean } | undefined>();

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputSectionRef = React.useRef<HTMLDivElement>(null);
    const inputElementRef = React.useRef<HTMLInputElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);

    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [showDropdown, setShowDropdown] = React.useState(false);

    const handleSearchInputChange = React.useCallback((value) => {
        if (!showDropdown) {
            setShowDropdown(true);
            setFocusedKey(selectedKey ? { key: selectedKey } : undefined);
        }
        setSearchInputValue(value);
        onSearchInputChange(value);
    }, [showDropdown, setSearchInputValue, onSearchInputChange, selectedKey]);

    const handleShowDropdown = useCallback(
        () => {
            // FIXME: this is not atomic
            // FIXME: call only once
            if (!showDropdown) {
                setShowDropdown(true);
                setSearchInputValue('');
                onSearchInputChange('');
                setFocusedKey(selectedKey ? { key: selectedKey } : undefined);
            }
        },
        [showDropdown, onSearchInputChange, selectedKey],
    );

    const handleHideDropdown = useCallback(
        () => {
            setShowDropdown(false);
            setFocusedKey(undefined);
        },
        [],
    );

    const handleSearchInputClick = React.useCallback(
        () => {
            if (readOnly) {
                return;
            }
            handleShowDropdown();
        },
        [readOnly, handleShowDropdown],
    );

    const handlePopupBlur = React.useCallback((isClickedWithin: boolean) => {
        if (!isClickedWithin) {
            handleHideDropdown();
        } else if (persistentOptionPopup && inputElementRef.current) {
            inputElementRef.current.focus();
        }
    }, [handleHideDropdown, persistentOptionPopup]);

    useBlurEffect(showDropdown, handlePopupBlur, popupRef, containerRef);

    const handleOptionClick = React.useCallback(
        (valueKey: OK, value: O) => {
            onOptionClick(valueKey, value, name);
            if (!persistentOptionPopup) {
                handleHideDropdown();
            }
        },
        [onOptionClick, handleHideDropdown, persistentOptionPopup, name],
    );

    const optionListRendererParams = React.useCallback((key, option) => ({
        contentRendererParam: optionRendererParams,
        option,
        optionKey: key,
        focusedKey,
        contentRenderer: optionRenderer,
        onClick: handleOptionClick,
        onFocus: setFocusedKey,
        optionContainerClassName: _cs(optionContainerClassName, styles.listItem),
    }), [
        optionRenderer,
        optionRendererParams,
        optionContainerClassName,
        handleOptionClick,
        focusedKey,
    ]);

    const groupRendererParams = useCallback(
        (_: string | number, __: number, values: O[]) => ({
            title: props.grouped ? props.groupLabelSelector(values[0]) : '?',
        }),
        // FIXME: disabling because linter is not smart enough
        // eslint-disable-next-line react-hooks/exhaustive-deps, react/destructuring-assignment
        [props.grouped, props.groupLabelSelector],
    );

    const handleKeyDown = useKeyboard(
        focusedKey,
        selectedKey,
        optionKeySelector,
        options,
        showDropdown,

        setFocusedKey,
        handleHideDropdown,
        handleShowDropdown,
        handleOptionClick,
    );

    let popup: React.ReactNode | null;
    // eslint-disable-next-line react/destructuring-assignment
    if (props.grouped) {
        popup = (
            <List
                data={options}
                keySelector={optionKeySelector}
                renderer={GenericOption}
                rendererParams={optionListRendererParams}
                grouped
                groupRenderer={Group}
                groupRendererParams={groupRendererParams}
                groupKeySelector={props.groupKeySelector}
            />
        );
    } else {
        popup = (
            <List
                data={options}
                keySelector={optionKeySelector}
                renderer={GenericOption}
                rendererParams={optionListRendererParams}
            />
        );
    }

    return (
        <>
            <InputContainer
                ref={containerRef}
                inputSectionRef={inputSectionRef}
                actions={(
                    <>
                        {actions}
                        {!readOnly && !nonClearable && (
                            <Button
                                onClick={onClear}
                                disabled={disabled}
                                transparent
                                compact
                                uiMode={uiMode}
                                name={undefined}
                                title="Clear"
                            >
                                <IoMdClose />
                            </Button>
                        )}
                        {!readOnly && (showDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                    </>
                )}
                actionsContainerClassName={actionsContainerClassName}
                className={className}
                disabled={disabled}
                error={error}
                errorContainerClassName={errorContainerClassName}
                hint={hint}
                hintContainerClassName={hintContainerClassName}
                icons={icons}
                iconsContainerClassName={iconsContainerClassName}
                inputSectionClassName={inputSectionClassName}
                label={label}
                labelContainerClassName={labelContainerClassName}
                readOnly={readOnly}
                uiMode={uiMode}
                input={(
                    <RawInput
                        name={name}
                        elementRef={inputElementRef}
                        readOnly={readOnly}
                        uiMode={uiMode}
                        disabled={disabled}
                        value={(showDropdown || focused) ? searchInputValue : valueDisplay}
                        onChange={handleSearchInputChange}
                        onClick={handleSearchInputClick}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={valueDisplay ?? placeholder}
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                    />
                )}
            />
            {showDropdown && (
                <Popup
                    elementRef={popupRef}
                    parentRef={inputSectionRef}
                    className={_cs(optionsPopupClassName, styles.popup)}
                    contentClassName={styles.popupContent}
                >
                    {popup}
                    <EmptyOptions
                        filtered={optionsFiltered}
                        pending={optionsPending}
                        empty={optionsEmpty}
                    />
                </Popup>
            )}
        </>
    );
}

export default SelectInputContainer;
