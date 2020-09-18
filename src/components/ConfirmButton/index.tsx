import React, { ReactNode, useState, useCallback, Children } from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { ButtonProps } from '../Button';

import Modal from '../Modal';

import styles from './styles.css';

export interface ConfirmButtonProps<N extends number | string | undefined> extends ButtonProps<N> {
    confirmLabel?: ReactNode;
    cancelLabel?: ReactNode;
    onConfirm: () => void,
    confirmButtonClassName?: string,
    cancelButtonClassName?: string,
    confirmationHeader?: ReactNode,
    confirmationMessage?: ReactNode,
    actionButtonsClassName?: string,
    children?: ReactNode;
    onCancel: () => void,
}

function ConfirmButton<N extends number | string | undefined>(props: ConfirmButtonProps<N>) {
    const {
        confirmationHeader = 'Confirmation',
        confirmationMessage = 'Are you sure?',
        onConfirm,
        onCancel,
        confirmButtonClassName,
        cancelButtonClassName,
        actionButtonsClassName,
        confirmLabel = 'Confirm',
        cancelLabel = 'Cancel',
        ...otherProps
    } = props;

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleConfirmModalShow = useCallback(() => {
        setShowConfirmModal(true);
    }, []);

    const handleConfirmModalClose = useCallback(() => {
        onCancel();
        setShowConfirmModal(false);
    }, [onCancel]);

    const handleConfirmModalConfirm = useCallback(() => {
        onConfirm();
        setShowConfirmModal(false);
    }, [onConfirm]);

    return (
        <>
            <Button
                {...otherProps}
                onClick={handleConfirmModalShow}
            />
            {showConfirmModal && (
                <Modal
                    heading={confirmationHeader}
                    onClose={handleConfirmModalClose}
                    footer={(
                        <div className={_cs(styles.actionButtonsRow, actionButtonsClassName)}>
                            <Button
                                className={_cs(styles.actionButton, cancelButtonClassName)}
                                name="cancel-button"
                                onClick={handleConfirmModalClose}
                            >
                                {cancelLabel}
                            </Button>
                            <Button
                                className={_cs(styles.actionButton, confirmButtonClassName)}
                                name="confirm-button"
                                onClick={handleConfirmModalConfirm}
                                variant="primary"
                                autoFocus
                            >
                                {confirmLabel}
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
