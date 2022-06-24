import React, { useState, useCallback } from 'react';
import { Story } from '@storybook/react/types-6-0';
import Button from '../../src/components/Button';
import Modal, { ModalProps } from '../../src/components/Modal';

export default {
    title: 'View/Modal',
    component: Modal,
    argTypes: {},
};

const Template: Story<ModalProps> = (args) => {
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
                    heading={<h2>Test Modal</h2>}
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
