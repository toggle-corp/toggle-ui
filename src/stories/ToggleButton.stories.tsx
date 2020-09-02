import React from 'react';
import { useArgs } from '@storybook/client-api';

import ToggleButton, { ToggleButtonProps } from '#components/ToggleButton';

export default {
    title: 'Action/ToggleButton',
    component: ToggleButton,
    argTypes: {},
};

const Template = (args: ToggleButton) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e) => {
        updateArgs({ value: e });
    };

    return (
        <ToggleButton
            {...args}
            value={value}
            onChange={handleChange}
        >
            {value ? 'Toggle: on' : 'Toggle: off'}
        </ToggleButton>
    );
};

export const Default = Template.bind({});
Default.args = {
    children: 'Toggle: off',
    value: false,
};
