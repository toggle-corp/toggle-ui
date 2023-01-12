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
    persistent: boolean;
    arrowHidden?: boolean;
    defaultShown?: boolean;
    elementRef?: React.RefObject<HTMLButtonElement>;
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
        arrowHidden,
        persistent,
        defaultShown,
        elementRef,
        ...otherProps
    } = props;

    const internalButtonRef = React.useRef<HTMLButtonElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);

    const buttonRef = elementRef ?? internalButtonRef;

    const [popupShown, setPopupShown] = React.useState(defaultShown ?? false);

    useEffect(
        () => {
            if (componentRef) {
                componentRef.current = {
                    setPopupVisibility: setPopupShown,
                };
            }
        },
        [componentRef],
    );

    useBlurEffect(
        popupShown && !persistent,
        setPopupShown,
        popupRef,
        buttonRef,
    );

    const handleShowPopup = useCallback(
        () => {
            setPopupShown((prevState) => !prevState);
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
                        {!arrowHidden && (
                            <>
                                {popupShown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </>
                        )}
                    </>
                )}
            >
                {label}
            </Button>
            {popupShown && (
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
