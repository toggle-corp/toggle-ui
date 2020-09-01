import React from 'react';
import BodyBackdrop, { BodyBackdropProps } from '#components/Backdrop';

export default {
    title: 'View/Private/BodyBackdrop',
    component: BodyBackdrop,
    argTypes: {},
};

export const Default = () => (
    <BodyBackdrop>
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
