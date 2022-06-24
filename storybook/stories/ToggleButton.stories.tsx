import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';

import ToggleButton, { ToggleButtonProps } from '../../src/components/ToggleButton';

export default {
    title: 'Action/ToggleButton',
    component: ToggleButton,
    argTypes: {},
};

const Template: Story<ToggleButtonProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: boolean | undefined) => {
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
