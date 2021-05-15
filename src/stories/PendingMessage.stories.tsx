import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import PendingMessage, { Props as ContainerProps } from '#components/PendingMessage';

export default {
    title: 'View/PendingMessage',
    component: PendingMessage,
    argTypes: {},
};

const Template: Story<ContainerProps> = (args) => (
    <div
        style={{
            width: '100%',
            height: '100vh',
            border: '1px solid blue',
        }}
    >
        <PendingMessage
            {...args}
        />
    </div>
);

export const Default = Template.bind({});
Default.args = {
};
