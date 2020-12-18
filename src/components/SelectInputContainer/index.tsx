import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io';

import Popup from '../Popup';
import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput from '../RawInput';
import Button from '../Button';
import RawButton from '../RawButton';
import List from '../List';
import { useBlurEffect } from '../../hooks';

import styles from './styles.css';

type Def = { containerClassName?: string };
type OptionKey = string | number;

interface GenericOptionRendererParams<P extends Def, OK extends OptionKey, O> {
    optionContainerClassName?: string;
    contentRenderer: (props: Pick<P, Exclude<keyof P, 'containerClassName'>>) => React.ReactNode;
    contentRendererParam: (key: OK, opt: O) => P;
    option: O;
    optionKey: OK;
    onClick: (optionKey: OK, option: O) => void;
}
function GenericOptionRenderer<P extends Def, OK extends OptionKey, O>({
    optionContainerClassName,
    contentRenderer,
    contentRendererParam,
    option,
    onClick,
    optionKey,
}: GenericOptionRendererParams<P, OK, O>) {
    const params = contentRendererParam(optionKey, option);
    const {
        containerClassName,
        ...props
    } = params;

    const handleClick = useCallback(
        () => {
            onClick(optionKey, option);
        },
        [optionKey, option, onClick],
    );

    return (
        <RawButton
            className={_cs(
                styles.optionRenderer,
                optionContainerClassName,
                containerClassName,
            )}
            onClick={handleClick}
            name={optionKey}
        >
            {contentRenderer(props)}
        </RawButton>
    );
}

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
            <header className={_cs(headerContainerClassName, styles.groupHeader)}>
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
    P extends Def,
    OMISSION extends string,
> = Omit<{
    name: N,
    onOptionClick: (optionKey: OK, option: O, name: N) => void;
    onSearchInputChange: (search: string) => void;
    optionContainerClassName?: string;
    optionKeySelector: (datum: O, index: number) => OK;
    optionRenderer: (props: Pick<P, Exclude<keyof P, 'containerClassName'>>) => React.ReactNode;
    optionRendererParams: (optionKey: OK, option: O) => P;
    options: O[] | undefined | null;
    optionsEmptyComponent: React.ReactNode;
    // FIXME: use this
    optionsPending?: boolean;
    optionsPopupClassName?: string;
    persistentOptionPopup?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
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
function SelectInputContainer<OK extends OptionKey, N extends string, O extends object, P extends Def>(
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
        optionsEmptyComponent,
        optionsPopupClassName,
        persistentOptionPopup,
        readOnly,
        searchPlaceholder,
        placeholder,
        uiMode,
        valueDisplay = '',
        nonClearable,
        onClear,
    } = props;

    const options = optionsFromProps ?? (emptyList as O[]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputSectionRef = React.useRef<HTMLDivElement>(null);
    const inputElementRef = React.useRef<HTMLInputElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);

    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [showDropdown, setShowDropdown] = React.useState(false);

    const handleSearchInputChange = React.useCallback((value) => {
        setSearchInputValue(value);
        onSearchInputChange(value);
    }, [setSearchInputValue, onSearchInputChange]);

    const handleSearchInputClick = React.useCallback(() => {
        if (readOnly) { return; }
        // NOTE: reset last search value
        setSearchInputValue('');
        onSearchInputChange('');

        setShowDropdown(true);
    }, [readOnly, setShowDropdown, onSearchInputChange]);

    const handlePopupBlur = React.useCallback((isClickedWithin: boolean) => {
        if (!isClickedWithin) {
            setShowDropdown(false);
        } else if (persistentOptionPopup && inputElementRef.current) {
            inputElementRef.current.focus();
        }
    }, [setShowDropdown, persistentOptionPopup]);

    useBlurEffect(showDropdown, handlePopupBlur, popupRef, containerRef);

    const handleOptionClick = React.useCallback((valueKey, value) => {
        onOptionClick(valueKey, value, name);
        if (!persistentOptionPopup) {
            setShowDropdown(false);
        }
    }, [onOptionClick, setShowDropdown, persistentOptionPopup, name]);

    const optionListRendererParams = React.useCallback((key, option) => ({
        contentRendererParam: optionRendererParams,
        option,
        optionKey: key,
        contentRenderer: optionRenderer,
        onClick: handleOptionClick,
        optionContainerClassName,
    }), [
        optionRenderer,
        optionRendererParams,
        optionContainerClassName,
        handleOptionClick,
    ]);

    const groupRendererParams = useCallback(
        (_: string | number, index: number, values: O[]) => ({
            title: props.grouped ? props.groupLabelSelector(values[index]) : '?',
        }),
        // FIXME: disabling because linter is not smart enough
        // eslint-disable-next-line react-hooks/exhaustive-deps, react/destructuring-assignment
        [props.grouped, props.groupLabelSelector],
    );

    let popup: React.ReactNode | null;
    if (options.length <= 0) {
        popup = optionsEmptyComponent;
    // eslint-disable-next-line react/destructuring-assignment
    } else if (props.grouped) {
        popup = (
            <List
                data={options}
                keySelector={optionKeySelector}
                renderer={GenericOptionRenderer}
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
                renderer={GenericOptionRenderer}
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
                        value={showDropdown ? searchInputValue : valueDisplay}
                        onChange={handleSearchInputChange}
                        onClick={handleSearchInputClick}
                        placeholder={showDropdown ? searchPlaceholder : placeholder}
                        autoComplete="off"
                    />
                )}
            />
            { showDropdown && (
                <Popup
                    elementRef={popupRef}
                    parentRef={inputSectionRef}
                    className={_cs(optionsPopupClassName, styles.popup)}
                    contentClassName={styles.popupContent}
                >
                    {popup}
                </Popup>
            )}
        </>
    );
}

export default SelectInputContainer;
