import React from 'react';

import { MdCancel, MdPerson } from 'react-icons/md';

import Chip, { ChipProps } from '#components/Chip';

import styles from './styles.css';

export default {
    title: 'View/Chip',
    component: Chip,
    argTypes: {},
};

const Template = (args: ChipProps) => (
    <Chip
        {...args}
        action={
            <MdCancel />
        }
        className={styles.chip}
    />
);

export const Default = Template.bind({});
Default.args = {};

export const Variants = () => (
    <div className={styles.chipVariants}>
        <section>
            <h3>Variants</h3>
            <div className={styles.content}>
                <Chip
                    label="Default"
                    className={styles.chip}
                    variant="default"
                />
                <Chip
                    label="Primary"
                    className={styles.chip}
                    variant="primary"
                />
                <Chip
                    label="Accent"
                    className={styles.chip}
                    variant="accent"
                />
                <Chip
                    label="Warning"
                    className={styles.chip}
                    variant="warning"
                />
                <Chip
                    className={styles.chip}
                    label="Danger"
                    variant="danger"
                />
            </div>
        </section>
        <section>
            <h3>Icon, Action and Children</h3>
            <div className={styles.content}>
                <Chip
                    label="Basic"
                    className={styles.chip}
                />
                <Chip
                    label="Left Icon"
                    icon={<MdPerson />}
                    className={styles.chip}
                />
                <Chip
                    label="Only Action"
                    className={styles.chip}
                    action={<MdCancel />}
                    actionClassName={styles.roundButton}
                />

                <Chip
                    label="Icon and Action"
                    icon={<MdPerson />}
                    className={styles.chip}
                    action={<MdCancel />}
                    actionClassName={styles.roundButton}
                />

                <Chip
                    className={styles.chip}
                    label="Text Icon"
                    icon="I am a text"
                    action={<MdCancel />}
                />

                <Chip
                    className={styles.chip}
                >
                    I am children
                </Chip>
            </div>
        </section>
    </div>
);
