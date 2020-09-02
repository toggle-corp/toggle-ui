import React from 'react';
import { useArgs } from '@storybook/client-api';

import Switch, { SwitchProps } from '#components/Switch';

export default {
    title: 'Input/Switch',
    component: Switch,
    argTypes: {},
};

const Template = (args: SwitchProps) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e) => {
        updateArgs({ value: e });
    };

    return (
        <Switch
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    label: 'This is awesome or what?',
    value: false,
};
