import React from 'react';
import { action } from '@storybook/addon-actions';
// import { select, boolean } from '@storybook/addon-knobs';

import Button, { ButtonProps } from '#components/Button';

export default {
    title: 'Input/Button',
    component: Button,
    argTypes: {},
};

const Template = (args: ButtonProps) => (
    <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
    children: 'Test',
};

export const Transparent = Template.bind({});
Transparent.args = {
    children: 'Test',
    transparent: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Test',
    disabled: true,
};

export const Variants = () => (
    <>
        <Button variant='primary'>
            Primary
        </Button>
        <Button variant='accent'>
            Accent
        </Button>
        <Button variant='warning'>
            Warning
        </Button>
        <Button variant='danger'>
            Danger
        </Button>
        <Button
            variant='primary'
            transparent
        >
            Primary transparent
        </Button>
        <Button
            variant='accent'
            transparent
        >
            Accent transparent
        </Button>
        <Button
            variant='warning'
            transparent
        >
            Warning transparent
        </Button>
        <Button
            variant='danger'
            transparent
        >
            Danger transparent
        </Button>
        <Button
            variant='primary'
            disabled
        >
            Primary disabled
        </Button>
        <Button
            variant='accent'
            disabled
        >
            Accent disabled
        </Button>
        <Button
            variant='warning'
            disabled
        >
            Warning disabled
        </Button>
        <Button
            variant='danger'
            disabled
        >
            Danger disabled
        </Button>
        <Button
            variant='primary'
            disabled
            transparent
        >
            Primary transparent disabled
        </Button>
        <Button
            variant='accent'
            disabled
            transparent
        >
            Accent transparent disabled
        </Button>
        <Button
            variant='warning'
            disabled
            transparent
        >
            Warning transparent disabled
        </Button>
        <Button
            variant='danger'
            disabled
            transparent
        >
            Danger transparent disabled
        </Button>
    </>
)
