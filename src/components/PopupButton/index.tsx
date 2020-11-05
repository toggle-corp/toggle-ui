import React, { useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import useBlurEffect from '../../hooks/useBlurEffect';

import Popup from '../Popup';
import Button, { ButtonProps } from '../Button';

import styles from './styles.css';

export interface PopupButtonProps<N extends number | string | undefined> extends Omit<ButtonProps<N>, 'label'> {
    popupContainerClassName?: string;
    label: React.ReactNode;
}
function PopupButton<N extends number | string | undefined>(props: PopupButtonProps<N>) {
    const {
        popupContainerClassName,
        children,
        label,
        name,
        actions,
        ...otherProps
    } = props;

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const popupRef = React.useRef<HTMLDivElement>(null);

    const [showPopup, setShowPopup] = React.useState(false);

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
                    className={_cs(styles.popup, popupContainerClassName)}
                    contentClassName={styles.popupContent}
                >
                    {children}
                </Popup>
            )}
        </>
    );
}

export default PopupButton;