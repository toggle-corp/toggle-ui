import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Popup from '../Popup';
import InputContainer, { InputContainerProps } from '../InputContainer';
import RawInput from '../RawInput';
import RawButton from '../RawButton';
import { useBlurEffect } from '../../hooks';

import styles from './styles.css';

type SelectInputProps<T> = Omit<InputContainerProps, 'input'>;

function SelectInput<T>(props: SelectInputProps<T>) {
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
    } = props;

    const containerRef = React.useRef(null);
    const inputSectionRef = React.useRef(null);
    const inputElementRef = React.useRef(null);
    const popupRef = React.useRef(null);

    const [searchInputValue, setSearchInputValue] = React.useState('');
    const [showDropdown, setShowDropdown] = React.useState(false);

    const handleSearchInputChange = React.useCallback((value) => {
        setSearchInputValue(value);
    }, [setSearchInputValue]);

    const handleSearchInputClick = React.useCallback(() => {
        setShowDropdown(true);
    }, [setShowDropdown]);

    const handlePopupBlur = React.useCallback((isClickedWithin: boolean) => {
        if (!isClickedWithin) {
            setShowDropdown(false);
        }

        inputElementRef?.current?.focus();
    }, [setShowDropdown]);

    useBlurEffect(showDropdown, handlePopupBlur, popupRef, containerRef);

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
                    <RawInput<T>
                        ref={inputElementRef}
                        readOnly={readOnly}
                        uiMode={uiMode}
                        disabled={disabled}
                        value={searchInputValue}
                        onChange={handleSearchInputChange}
                        onClick={handleSearchInputClick}
                    />
                )}
            />
            { showDropdown && (
                <Popup
                    ref={popupRef}
                    parentRef={inputSectionRef}
                >
                    <p>
                        Popup
                    </p>
                    <p>
                        Woo
                    </p>
                    <p>
                        So good
                    </p>
                    <p>
                        Woohoo
                    </p>
                </Popup>
            )}
        </>
    );
}

export default SelectInput;
