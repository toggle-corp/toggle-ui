import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import ConfirmButton, { ConfirmButtonProps } from '#components/ConfirmButton';

export default {
    title: 'Action/ConfirmButton',
    component: ConfirmButton,
    argTypes: {},
};

const Template: Story<ConfirmButtonProps<string>> = (args) => (
    <ConfirmButton
        {...args}
        name="confirm-button"
        confirmationHeader={<h2>Confirm Action?</h2>}
        confirmationMessage="Confirmation message"
    >
        Confirm Button
    </ConfirmButton>
);

export const Default = Template.bind({});
Default.args = {};
