import React, { ReactNode, useState, useCallback, Children } from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { ButtonProps } from '../Button';

import Modal from '../Modal';

import styles from './styles.css';

export interface ConfirmButtonProps<N extends number | string | undefined> extends ButtonProps<N> {
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void,
    confirmButtonClassName?: string,
    cancelButtonClassName?: string,
    confirmationHeader?: ReactNode,
    confirmationMessage?: string,
    actionButtonsClassName?: string,
    children?: ReactNode;
}

function ConfirmButton<N extends number | string | undefined>(props: ConfirmButtonProps<N>) {
    const {
        confirmationHeader = 'Confirm Now !',
        confirmationMessage = 'Are you sure?',
        onConfirm,
        confirmButtonClassName,
        cancelButtonClassName,
        actionButtonsClassName,
        confirmLabel = 'Confirm',
        cancelLabel = 'Cancel',
        children,
        ...otherProps
    } = props;

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleConfirmModalShow = useCallback(() => {
        setShowConfirmModal(true);
    }, []);

    const handleConfirmModalClose = useCallback(() => {
        setShowConfirmModal(false);
    }, []);

    const handleConfirmModalConfirm = useCallback(() => {
        onConfirm();
        handleConfirmModalClose();
    }, [onConfirm, handleConfirmModalClose]);

    return (
        <>
            <Button
                {...otherProps}
                onClick={handleConfirmModalShow}
            >
                {children}
            </Button>
            {showConfirmModal && (
                <Modal
                    heading={confirmationHeader}
                    onClose={handleConfirmModalClose}
                    footer={(
                        <div className={_cs(styles.actionButtonsRow, actionButtonsClassName)}>
                            <Button
                                className={_cs(styles.actionButton, confirmButtonClassName)}
                                name="confirm-button"
                                onClick={handleConfirmModalConfirm}
                                variant="primary"
                            >
                                {confirmLabel}
                            </Button>
                            <Button
                                className={_cs(styles.actionButton, cancelButtonClassName)}
                                name="cancel-button"
                                onClick={handleConfirmModalClose}
                            >
                                {cancelLabel}
                            </Button>
                        </div>
                    )}
                >
                    {confirmationMessage}
                </Modal>
            )}
        </>
    );
}

export default ConfirmButton;
