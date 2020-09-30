import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import useBlurEffect from '../../hooks/useBlurEffect';

import Portal from '../Portal';
import RawButton from '../RawButton';
import Dropdown from '../Dropdown';

import styles from './styles.css';

export interface DropdownMenuProps {
    className?: string;
    dropdownContainerClassName?: string;
    children: React.ReactNode;
    label: React.ReactNode;
    disabled?: boolean;
    uiMode?: UiMode;
}
function DropdownMenu(props: DropdownMenuProps) {
    const {
        className,
        dropdownContainerClassName,
        children,
        label,
        disabled,
        uiMode,
    } = props;

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const [showDropdown, setShowDropdown] = React.useState(false);

    useBlurEffect(showDropdown, setShowDropdown, dropdownRef, buttonRef);

    const handleShowDropdown = useCallback(
        () => {
            setShowDropdown(true);
        },
        [],
    );

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);
    return (
        <>
            <RawButton
                className={_cs(
                    className,
                    styles.dropdownMenu,
                    showDropdown && styles.dropdownShown,
                    themeClassName,
                )}
                name="dropdown-button"
                elementRef={buttonRef}
                onClick={handleShowDropdown}
                disabled={disabled}
                uiMode={uiMode}
            >
                { label }
            </RawButton>
            {showDropdown && (
                <Portal>
                    <Dropdown
                        ref={dropdownRef}
                        className={dropdownContainerClassName}
                        parentRef={buttonRef}
                        uiMode={uiMode}
                    >
                        { children }
                    </Dropdown>
                </Portal>
            )}
        </>
    );
}

export default DropdownMenu;
