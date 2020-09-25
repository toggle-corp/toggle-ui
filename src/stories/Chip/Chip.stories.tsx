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
        label="default with acition"
        action={
            <MdCancel />
        }
    />
);

export const Default = Template.bind({});
Default.args = {};

export const Variants = () => (
    <div className={styles.chipVariants}>
        <section>
            <div className={styles.content}>
                <Chip
                    label="Basic"
                    className={styles.chip}
                />
                <Chip
                    label="Left Icon"
                    icon={<MdPerson size={20} />}
                    className={styles.chip}
                />
                <Chip
                    label="Only Action"
                    className={styles.chip}
                    action={<MdCancel size={20} />}
                    actionClassName={styles.roundButton}
                />

                <Chip
                    label="Icon and Action"
                    icon={<MdPerson size={20} />}
                    className={styles.chip}
                    action={<MdCancel size={20} />}
                    actionClassName={styles.roundButton}
                />

                <Chip
                    label="Text Icon"
                    icon="I am text"
                    action={<MdCancel size={20} />}
                />
            </div>
        </section>
    </div>
);
