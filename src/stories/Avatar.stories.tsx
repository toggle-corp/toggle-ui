import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Avatar, { AvatarProps } from '#components/Avatar';

export default {
    title: 'View/Avatar',
    component: Avatar,
    argTypes: {},
};

const Template: Story<AvatarProps> = (props) => (
    <div
        style={{
            width: '100px',
            height: '100px',
        }}
    >
        <Avatar
            {...props}
        />
    </div>
);

export const Default = Template.bind({});
Default.args = {
    src: 'https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg',
    alt: 'Ram Bahadur',
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
    src: '',
    alt: 'Ram Bahadur',
};
