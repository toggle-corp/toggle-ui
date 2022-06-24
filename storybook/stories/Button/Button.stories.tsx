import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IoIosSend } from 'react-icons/io';
// import { select, boolean } from '@storybook/addon-knobs';

import Button, {
    ButtonProps,
    useButtonFeatures,
    ButtonVariant,
} from '../../src/components/Button';
import VisualFeedback from '../../src/components/VisualFeedback';

import styles from './styles.css';

export default {
    title: 'Action/Button',
    component: Button,
    argTypes: {},
};

const Template: Story<ButtonProps<string>> = (args) => (
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
                <Button name={undefined}>
                    Default
                </Button>
                <Button variant="primary" name={undefined}>
                    Primary
                </Button>
                <Button variant="accent" name={undefined}>
                    Accent
                </Button>
                <Button variant="warning" name={undefined}>
                    Warning
                </Button>
                <Button variant="danger" name={undefined}>
                    Danger
                </Button>
            </div>
        </section>
        <section>
            <h3>Normal and Disabled</h3>
            <div className={styles.content}>
                <Button disabled name={undefined}>
                    Default
                </Button>
                <Button
                    variant="primary"
                    disabled
                    name={undefined}
                >
                    Primary
                </Button>
                <Button
                    variant="accent"
                    disabled
                    name={undefined}
                >
                    Accent
                </Button>
                <Button
                    variant="warning"
                    disabled
                    name={undefined}
                >
                    Warning
                </Button>
                <Button
                    variant="danger"
                    disabled
                    name={undefined}
                >
                    Danger
                </Button>
            </div>
        </section>
        <section>
            <h3>Transparent</h3>
            <div className={styles.content}>
                <Button transparent name={undefined}>
                    Default
                </Button>
                <Button
                    variant="primary"
                    transparent
                    name={undefined}
                >
                    Primary
                </Button>
                <Button
                    variant="accent"
                    transparent
                    name={undefined}
                >
                    Accent
                </Button>
                <Button
                    variant="warning"
                    transparent
                    name={undefined}
                >
                    Warning
                </Button>
                <Button
                    variant="danger"
                    transparent
                    name={undefined}
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
                    name={undefined}
                >
                    Default
                </Button>
                <Button
                    variant="primary"
                    disabled
                    transparent
                    name={undefined}
                >
                    Primary
                </Button>
                <Button
                    variant="accent"
                    disabled
                    transparent
                    name={undefined}
                >
                    Accent
                </Button>
                <Button
                    variant="warning"
                    disabled
                    transparent
                    name={undefined}
                >
                    Warning
                </Button>
                <Button
                    variant="danger"
                    disabled
                    transparent
                    name={undefined}
                >
                    Danger
                </Button>
            </div>
        </section>
    </div>
);

interface ButtonLikeLinkProps {
    className?: string;
    children: React.ReactNode;
    icons?: React.ReactNode;
    variant?: ButtonVariant;
    href: string;
}
const ButtonLikeLink = (props: ButtonLikeLinkProps) => {
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
