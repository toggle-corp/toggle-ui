import React from 'react';
import { IoIosSend } from 'react-icons/io';
// import { select, boolean } from '@storybook/addon-knobs';

import Button, {
    ButtonProps,
    useButtonFeatures,
} from '#components/Button';
import VisualFeedback from '#components/VisualFeedback';

import styles from './styles.css';

export default {
    title: 'Action/Button',
    component: Button,
    argTypes: {},
};

const Template = (args: ButtonProps) => (
    <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Click me!',
};

export const Variants = () => (
    <div className={styles.buttonVariants}>
        <section>
            <h3>Normal</h3>
            <div className={styles.content}>
                <Button>
                    Default
                </Button>
                <Button variant="primary">
                    Primary
                </Button>
                <Button variant="accent">
                    Accent
                </Button>
                <Button variant="warning">
                    Warning
                </Button>
                <Button variant="danger">
                    Danger
                </Button>
            </div>
        </section>
        <section>
            <h3>Normal and Disabled</h3>
            <div className={styles.content}>
                <Button disabled>
                    Default
                </Button>
                <Button
                    variant="primary"
                    disabled
                >
                    Primary
                </Button>
                <Button
                    variant="accent"
                    disabled
                >
                    Accent
                </Button>
                <Button
                    variant="warning"
                    disabled
                >
                    Warning
                </Button>
                <Button
                    variant="danger"
                    disabled
                >
                    Danger
                </Button>
            </div>
        </section>
        <section>
            <h3>Transparent</h3>
            <div className={styles.content}>
                <Button transparent>
                    Default
                </Button>
                <Button
                    variant="primary"
                    transparent
                >
                    Primary
                </Button>
                <Button
                    variant="accent"
                    transparent
                >
                    Accent
                </Button>
                <Button
                    variant="warning"
                    transparent
                >
                    Warning
                </Button>
                <Button
                    variant="danger"
                    transparent
                >
                    Danger
                </Button>
            </div>
        </section>
        <section>
            <h3>Transparent and Disabled</h3>
            <div className={styles.content}>
                <Button
                    disabled
                    transparent
                >
                    Default
                </Button>
                <Button
                    variant="primary"
                    disabled
                    transparent
                >
                    Primary
                </Button>
                <Button
                    variant="accent"
                    disabled
                    transparent
                >
                    Accent
                </Button>
                <Button
                    variant="warning"
                    disabled
                    transparent
                >
                    Warning
                </Button>
                <Button
                    variant="danger"
                    disabled
                    transparent
                >
                    Danger
                </Button>
            </div>
        </section>
    </div>
);

const ButtonLikeLink = (props) => {
    const {
        className,
        children,
        icons,
        variant,
        href,
    } = props;

    const {
        children: buttonChildren,
        className: buttonClassName,
    } = useButtonFeatures({
        className,
        icons,
        children,
        variant,
    });

    return (
        <a
            className={buttonClassName}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            <VisualFeedback />
            { buttonChildren }
        </a>
    );
};

export const UseButtonFeatures = () => (
    <ButtonLikeLink
        className={styles.buttonLikeLink}
        icons={<IoIosSend />}
        variant="accent"
        href="https://togglecorp.com"
    >
        Goto Togglecorp
    </ButtonLikeLink>
);
