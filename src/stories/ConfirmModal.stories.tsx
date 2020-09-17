import React, { useState, useCallback } from 'react';

import Button from '#components/Button';
import ConfirmModal, { ConfirmModalProps } from '#components/ConfirmModal';

export default {
    title: 'View/ConfirmModal',
    component: ConfirmModal,
    argTypes: {},
};

const Header = (
    <h2>Test Confirm Modal</h2>
);

const Template = (args: ConfirmModalProps) => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleConfirmModalShow = useCallback(() => {
        setShowConfirmModal(true);
    }, [setShowConfirmModal]);

    const handleConfirmModalClose = useCallback(() => {
        setShowConfirmModal(false);
    }, [setShowConfirmModal]);

    const handleConfirmModalAction = useCallback(() => {
        // handle confirmation action here
        setShowConfirmModal(false);
    }, [setShowConfirmModal]);

    return (
        <>
            <Button
                name="Show Confirm Modal"
                onClick={handleConfirmModalShow}
            >
                Confirm Modal
            </Button>
            {showConfirmModal && (
                <ConfirmModal
                    {...args}
                    heading={Header}
                    onClose={handleConfirmModalClose}
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                    onConfirm={handleConfirmModalAction}
                >
                    Do you confirm?
                </ConfirmModal>
            )}
        </>
    );
};

export const Default = Template.bind({});
Default.args = {};
