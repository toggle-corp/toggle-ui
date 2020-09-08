import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Popup from '../Popup';
import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput from '../RawInput';
import RawButton, { RawButtonProps } from '../RawButton';
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
    onClick: RawButtonProps<OK>['onClick'];
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
            {contentRenderer(props)}
        </RawButton>
    );
}

export interface SelectInputContainerProps<OK extends OptionKey, N, O, P extends Def> extends Omit<InputContainerProps, 'input'> {
    name: N,
    onOptionClick: (optionKey: OK, name: N) => void;
    onSearchInputChange: (search: string) => void;
    optionContainerClassName?: string;
    optionKeySelector: (datum: O, index: number) => OK;
    optionRenderer: (props: Pick<P, Exclude<keyof P, 'containerClassName'>>) => React.ReactNode;
    optionRendererParams: (optionKey: OK, option: O) => P;
    options: O[];
    optionsEmptyComponent: React.ReactNode;
    optionsPending?: boolean;
    optionsPopupClassName?: string;
    persistantOptionPopup?: boolean;
    searchPlaceholder?: string;
    valueDisplay: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types, max-len
function SelectInputContainer<OK extends OptionKey, N extends string, O extends object, P extends Def>(
    props: SelectInputContainerProps<OK, N, O, P>,
) {
    const {
        actions,
        actionsContainerClassName,
        className,
        disabled,
        name,
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
        valueDisplay = '',
        onSearchInputChange,
        persistantOptionPopup,
        searchPlaceholder,
        optionsEmptyComponent,
        optionsPopupClassName,
    } = props;

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
        } else if (persistantOptionPopup && inputElementRef.current) {
            inputElementRef.current.focus();
        }
    }, [setShowDropdown, persistantOptionPopup]);

    useBlurEffect(showDropdown, handlePopupBlur, popupRef, containerRef);

    const handleOptionClick = React.useCallback((value) => {
        onOptionClick(value, name);
        if (!persistantOptionPopup) {
            setShowDropdown(false);
        }
    }, [onOptionClick, setShowDropdown, persistantOptionPopup, name]);

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
                        name={name}
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
                    elementRef={popupRef}
                    parentRef={inputSectionRef}
                    className={_cs(optionsPopupClassName, styles.popup)}
                    contentClassName={styles.popupContent}
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
