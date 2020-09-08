import React, { useState, useCallback } from 'react';
import { useArgs } from '@storybook/client-api';

import Button from '#components/Button';
import Modal, { ModalProps } from '#components/Modal';

export default {
    title: 'View/Modal',
    component: Modal,
    argTypes: {},
};

const Header = (
    <h2>Test Modal</h2>
);

const Template = (args: ModalProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleModalShow = useCallback(() => {
        setShowModal(true);
    }, [setShowModal]);

    const handleModalClose = useCallback(() => {
        setShowModal(false);
    }, [setShowModal]);

    return (
        <>
            <Button
                name="Show Modal"
                onClick={handleModalShow}
            >
                Show Modal
            </Button>
            {showModal && (
                <Modal
                    {...args}
                    heading={Header}
                    onClose={handleModalClose}
                >
                    This is a modal
                </Modal>
            )}
        </>
    );
};

export const Default = Template.bind({});
Default.args = {};
