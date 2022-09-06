import React, { ReactNode, useState, useCallback } from 'react';
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
    children?: ReactNode;
    onCancel?: () => void,
}

function ConfirmButton<N extends number | string | undefined>(props: ConfirmButtonProps<N>) {
    const {
        confirmationHeader = 'Confirmation',
        confirmationMessage = 'Are you sure?',
        onConfirm,
        onCancel,
        confirmButtonClassName,
        cancelButtonClassName,
        confirmLabel = 'Confirm',
        cancelLabel = 'Cancel',
        ...otherProps
    } = props;

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleConfirmModalShow = useCallback(() => {
        setShowConfirmModal(true);
    }, []);

    const handleConfirmModalClose = useCallback(() => {
        if (onCancel) {
            onCancel();
        }

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
                    footerClassName={styles.actionButtonsRow}
                    freeHeight
                    size="medium"
                    footer={(
                        <>
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
                        </>
                    )}
                >
                    {confirmationMessage}
                </Modal>
            )}
        </>
    );
}

export default ConfirmButton;
