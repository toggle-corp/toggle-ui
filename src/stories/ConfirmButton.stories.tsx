import React from 'react';

import ConfirmButton, { ConfirmButtonProps } from '#components/ConfirmButton';

export default {
    title: 'Action/ConfirmButton',
    component: ConfirmButton,
    argTypes: {},
};

const ConfirmationHeader = (
    <h2>Confirm Action?</h2>
);

const Template = (args: ConfirmButtonProps) => (
    <ConfirmButton
        {...args}
        name="confirm-button"
        confirmationHeader={ConfirmationHeader}
        confirmationMessage="Confirmation message"
        onConfirm={() => console.log('confirmed')}
    >
        Confirm Button
    </ConfirmButton>
);

export const Default = Template.bind({});
Default.args = {};
