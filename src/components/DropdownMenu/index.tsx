import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import useBlurEffect from '../../hooks/useBlurEffect';

import Popup from '../Popup';
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
    const containerRef = React.useRef<HTMLDivElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);

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
        <div
            className={_cs(className, themeClassName, styles.dropdownMenu)}
            ref={containerRef}
        >
            <RawButton
                className={styles.dropdownButton}
                name="dropdown-button"
                elementRef={buttonRef}
                onClick={handleShowDropdown}
                disabled={disabled}
                uiMode={uiMode}
            >
                { label }
            </RawButton>
            {showDropdown && (
                <Popup
                    elementRef={popupRef}
                    parentRef={containerRef}
                    className={styles.popup}
                    contentClassName={styles.popupContent}
                >
                    <Dropdown
                        ref={dropdownRef}
                        className={dropdownContainerClassName}
                        parentRef={containerRef}
                        uiMode={uiMode}
                    >
                        { children }
                    </Dropdown>
                </Popup>
            )}
        </div>
    );
}

export default DropdownMenu;
