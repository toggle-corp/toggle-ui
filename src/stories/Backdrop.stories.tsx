import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Backdrop, { BackdropProps } from '#components/Backdrop';

export default {
    title: 'View/Private/Backdrop',
    component: Backdrop,
    argTypes: {},
};

const Template: Story<BackdropProps> = (props) => {
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
            <Backdrop
                {...props}
                parentRef={ref}
            >
                Child
            </Backdrop>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
};
