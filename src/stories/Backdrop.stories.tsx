import React from 'react';
import Backdrop from '#components/Backdrop';

export default {
    title: 'View/Private/Backdrop',
    component: Backdrop,
    argTypes: {},
};

export const Default = () => {
    const ref = React.useRef(null);

    return (
        <div
            ref={ref}
            style={{
                width: '90px',
                height: '80px',
                border: '1px solid red',
                position: 'relative',
            }}
        >
            This is the parent content
            <Backdrop>
                Child
            </Backdrop>
        </div>
    );
};
