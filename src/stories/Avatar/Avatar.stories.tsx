import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import Avatar, { AvatarProps } from '#components/Avatar';

import styles from './styles.css';

export default {
    title: 'View/Avatar',
    component: Avatar,
    argTypes: {},
};

const Template: Story<AvatarProps> = (props) => (
    <Avatar
        className={styles.ultraLarge}
        {...props}
    />
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

export const DifferentSizes = () => (
    <div className={styles.content}>
        <Avatar alt="Ram Bahadur" className={styles.small} />
        <Avatar alt="Ram Bahadur" className={styles.medium} />
        <Avatar alt="Ram Bahadur" className={styles.large} />
        <Avatar alt="Ram Bahadur" className={styles.extraLarge} />
        <Avatar alt="Ram Bahadur" className={styles.superLarge} />
        <Avatar alt="Ram Bahadur" className={styles.ultraLarge} />
    </div>
);
