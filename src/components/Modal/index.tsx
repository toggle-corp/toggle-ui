import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoMdClose } from 'react-icons/io';

import Button from '../Button';
import BodyBackdrop from '../BodyBackdrop';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface ModalProps {
    children?: React.ReactNode;
    heading?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    bodyClassName?: string;
    headingClassName?: string;
    footerClassName?: string;
    onClose: () => void;
    uiMode?: UiMode;
    closeButtonHidden?: boolean;
}

function Modal(props: ModalProps) {
    const {
        heading,
        children,
        footer,

        className,
        headingClassName,
        bodyClassName,
        footerClassName,

        onClose,
        uiMode,

        closeButtonHidden,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <BodyBackdrop
            uiMode={uiMode}
        >
            <div
                className={_cs(
                    className,
                    styles.modal,
                    themeClassName,
                )}
            >
                {heading !== null && (
                    <div className={_cs(styles.modalHeader, headingClassName)}>
                        <div className={styles.titleContainer}>
                            {heading}
                        </div>
                        {!closeButtonHidden && (
                            <div className={styles.actions}>
                                <Button
                                    className={styles.closeButton}
                                    onClick={onClose}
                                    transparent
                                    name="Close"
                                    uiMode={uiMode}
                                >
                                    <IoMdClose />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                <div className={_cs(styles.modalBody, bodyClassName)}>
                    {children}
                </div>
                {footer && (
                    <div className={_cs(styles.modalFooter, footerClassName)}>
                        {footer}
                    </div>
                )}
            </div>
        </BodyBackdrop>
    );
}

export default Modal;
