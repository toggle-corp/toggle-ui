import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Popup from '../Popup';
import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput from '../RawInput';
import RawButton, { RawButtonProps } from '../RawButton';
import List from '../List';
import { useBlurEffect } from '../../hooks';

import styles from './styles.css';

type OptionKey = string | number;
interface Option { [index: string]: any; }

export interface SelectInputContainerProps<T extends OptionKey> extends Omit<InputContainerProps, 'input'> {
    options: Option[];
    optionKeySelector: (datum: Option, index: number) => T;
    optionRenderer: React.ReactNode;
    optionRendererParams: (optionKey: OptionKey, option: Option) => React.ReactNode;
    onOptionClick: (optionKey: T) => void;
    optionContainerClassName?: string;
    onSearchInputChange: (search: string) => void;
    valueDisplay: string;
    persistantOptionPopup?: boolean;
    searchPlaceholder?: string;
    optionsPopupClassName?: string;
    optionsPending?: boolean;
    optionsEmptyComponent: React.ReactElement;
}

function GenericOptionRenderer<T>({
    optionContainerClassName,
    contentRenderer: Renderer,
    contentRendererParam,
    option,
    onClick,
    optionKey,
}: {
    optionContainerClassName?: string;
    contentRenderer: React.ReactNode<T>;
    contentRendererParam: (key: OptionKey, option: Option) => T & { containerClassName?: string; };
    option: Option;
    optionKey: OptionKey;
    onClick: RawButtonProps['onClick'];
}) {
    const params = contentRendererParam(optionKey, option);
    const {
        containerClassName,
        ...props
    } = params;

    return (
        <RawButton
            className={_cs(
                styles.optionRenderer,
                optionContainerClassName,
                containerClassName,
            )}
            onClick={onClick}
            name={optionKey}
        >
            <Renderer {...props} />
        </RawButton>
    );
}

function SelectInputContainer<T extends OptionKey>(props: SelectInputContainerProps<T>) {
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
        readOnly,
        uiMode,
        options,
        optionKeySelector,
        optionRenderer,
        optionRendererParams,
        onOptionClick,
        optionContainerClassName,
        valueDisplay,
        onSearchInputChange,
        persistantOptionPopup,
        searchPlaceholder,
        optionsEmptyComponent,
        optionsPopupClassName,
    } = props;

    const containerRef = React.useRef(null);
    const inputSectionRef = React.useRef(null);
    const inputElementRef = React.useRef(null);
    const popupRef = React.useRef(null);

    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [showDropdown, setShowDropdown] = React.useState(false);

    const handleSearchInputChange = React.useCallback((value) => {
        setSearchInputValue(value);
        onSearchInputChange(value);
    }, [setSearchInputValue, onSearchInputChange]);

    const handleSearchInputClick = React.useCallback(() => {
        setShowDropdown(true);
    }, [setShowDropdown]);

    const handlePopupBlur = React.useCallback((isClickedWithin: boolean) => {
        if (!isClickedWithin) {
            setShowDropdown(false);
        } else if (persistantOptionPopup) {
            inputElementRef?.current?.focus();
        }
    }, [setShowDropdown, persistantOptionPopup]);

    useBlurEffect(showDropdown, handlePopupBlur, popupRef, containerRef);

    const handleOptionClick = React.useCallback((value) => {
        onOptionClick(value);
        if (!persistantOptionPopup) {
            setShowDropdown(false);
        }
    }, [onOptionClick, setShowDropdown, persistantOptionPopup]);

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

    return (
        <>
            <InputContainer
                ref={containerRef}
                inputSectionRef={inputSectionRef}
                actions={actions}
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
                        elementRef={inputElementRef}
                        readOnly={readOnly}
                        uiMode={uiMode}
                        disabled={disabled}
                        value={showDropdown ? searchInputValue : valueDisplay}
                        onChange={handleSearchInputChange}
                        onClick={handleSearchInputClick}
                        placeholder={searchPlaceholder}
                    />
                )}
            />
            { showDropdown && (
                <Popup
                    ref={popupRef}
                    parentRef={inputSectionRef}
                    className={_cs(optionsPopupClassName, styles.popup)}
                >
                    { options.length === 0 ? (
                        optionsEmptyComponent
                    ) : (
                        <List
                            data={options}
                            keySelector={optionKeySelector}
                            renderer={GenericOptionRenderer}
                            rendererParams={optionListRendererParams}
                        />
                    )}
                </Popup>
            )}
        </>
    );
}

export default SelectInputContainer;
