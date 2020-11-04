import React from 'react';
import Avatar from '#components/Avatar';

export default {
    title: 'View/Avatar',
    component: Avatar,
    argTypes: {},
};

export const Default = () => (
    <div
        style={{
            width: '100px',
            height: '100px',
        }}
    >
        <Avatar
            src="https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg"
            alt="hero"
        />
    </div>
);
