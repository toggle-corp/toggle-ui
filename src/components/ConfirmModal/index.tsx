import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoMdClose } from 'react-icons/io';

import Button from '../Button';
import BodyBackdrop from '../BodyBackdrop';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

export interface ConfirmModalProps {
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
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void,
    confirmClassName?: string,
    cancelClassName?: string,
}

function ConfirmModal(props: ConfirmModalProps) {
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

        confirmLabel = 'Ok',
        cancelLabel = 'Cancel',

        onConfirm,
        confirmClassName,
        cancelClassName,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <BodyBackdrop
            uiMode={uiMode}
        >
            <div
                className={_cs(
                    className,
                    styles.confirmModal,
                    themeClassName,
                )}
            >
                {heading !== null && (
                    <div className={_cs(styles.confirmModalHeader, headingClassName)}>
                        <div className={styles.titleContainer}>
                            {heading}
                        </div>
                        {!closeButtonHidden && (
                            <Button
                                className={styles.closeButton}
                                onClick={onClose}
                                transparent
                                name="Close"
                                uiMode={uiMode}
                            >
                                <IoMdClose />
                            </Button>
                        )}
                    </div>
                )}
                <div className={_cs(styles.confirmModalBody, bodyClassName)}>
                    {children}
                </div>
                {footer && (
                    <div className={_cs(styles.confirmModalFooter, footerClassName)}>
                        {footer}
                    </div>
                )}
                <div className={_cs(styles.actionButtons)}>
                    <Button
                        className={_cs(styles.cancelButton, cancelClassName)}
                        onClick={onClose}
                        name="Cancel"
                        uiMode={uiMode}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        className={_cs(styles.confirmButton, confirmClassName)}
                        onClick={onConfirm}
                        name="Confirm"
                        uiMode={uiMode}
                        variant="primary"
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </BodyBackdrop>
    );
}

export default ConfirmModal;
