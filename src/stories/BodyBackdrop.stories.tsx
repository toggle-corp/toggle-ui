import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import BodyBackdrop, { BodyBackdropProps } from '#components/BodyBackdrop';

export default {
    title: 'View/Private/BodyBackdrop',
    component: BodyBackdrop,
    argTypes: {},
};

const Template: Story<BodyBackdropProps> = (props) => (
    <BodyBackdrop
        {...props}
    >
        <div
            style={{
                backgroundColor: 'white',
                padding: '30px',
            }}
        >
            Interesting content
        </div>
    </BodyBackdrop>
);

export const Default = Template.bind({});
Default.args = {
};
