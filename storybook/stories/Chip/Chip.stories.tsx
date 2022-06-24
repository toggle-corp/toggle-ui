import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { MdCancel, MdPerson } from 'react-icons/md';

import Chip, { ChipProps } from '../../../src/components/Chip';

import styles from './styles.css';

export default {
    title: 'View/Chip',
    component: Chip,
    argTypes: {},
};

const Template: Story<ChipProps> = (args) => (
    <Chip {...args} />
);

export const Default = Template.bind({});
Default.args = {
    className: styles.chip,
    label: 'Default',
};

export const IconAndAction = () => (
    <div className={styles.chipIconsAndActions}>
        <Chip
            className={styles.chip}
            label="Basic"
        />
        <Chip
            className={styles.chip}
            label="Left Icon"
            icon={<MdPerson />}
        />
        <Chip
            className={styles.chip}
            label="Only Action"
            action={<MdCancel />}
            actionClassName={styles.roundButton}
        />
        <Chip
            className={styles.chip}
            label="Icon and Action"
            icon={<MdPerson />}
            action={<MdCancel />}
            actionClassName={styles.roundButton}
        />
        <Chip
            className={styles.chip}
            label="Text Icon"
            icon="I am a text"
            action={<MdCancel />}
        />
        <Chip className={styles.chip}>
            I am children
        </Chip>
    </div>
);

export const Variants = () => (
    <div className={styles.chipVariants}>
        <Chip
            className={styles.chip}
            label="Default"
            variant="default"
        />
        <Chip
            className={styles.chip}
            label="Primary"
            variant="primary"
        />
        <Chip
            className={styles.chip}
            label="Accent"
            variant="accent"
        />
        <Chip
            className={styles.chip}
            label="Warning"
            variant="warning"
        />
        <Chip
            className={styles.chip}
            label="Danger"
            variant="danger"
        />
    </div>
);
