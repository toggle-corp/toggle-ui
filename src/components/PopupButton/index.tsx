import React, { useCallback, useEffect } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import useBlurEffect from '../../hooks/useBlurEffect';

import Popup from '../Popup';
import Button, { ButtonProps } from '../Button';

import styles from './styles.css';

export interface PopupButtonProps<N extends number | string | undefined> extends Omit<ButtonProps<N>, 'label'> {
    popupClassName?: string;
    popupContentClassName?: string;
    label: React.ReactNode;
    componentRef?: React.MutableRefObject<{
        setPopupVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    } | null>;
}
function PopupButton<N extends number | string | undefined>(props: PopupButtonProps<N>) {
    const {
        popupClassName,
        popupContentClassName,
        children,
        label,
        name,
        actions,
        componentRef,
        ...otherProps
    } = props;

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);

    const [showPopup, setShowPopup] = React.useState(false);

    useEffect(
        () => {
            if (componentRef) {
                componentRef.current = {
                    setPopupVisibility: setShowPopup,
                };
            }
        },
        [componentRef],
    );

    useBlurEffect(showPopup, setShowPopup, popupRef, buttonRef);

    const handleShowPopup = useCallback(
        () => {
            setShowPopup(true);
        },
        [],
    );

    return (
        <>
            <Button
                {...otherProps}
                name={name}
                elementRef={buttonRef}
                onClick={handleShowPopup}
                actions={(
                    <>
                        {actions}
                        {showPopup ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </>
                )}
            >
                {label}
            </Button>
            {showPopup && (
                <Popup
                    elementRef={popupRef}
                    parentRef={buttonRef}
                    className={_cs(styles.popup, popupClassName)}
                    contentClassName={_cs(styles.popupContent, popupContentClassName)}
                >
                    {children}
                </Popup>
            )}
        </>
    );
}

export default PopupButton;
