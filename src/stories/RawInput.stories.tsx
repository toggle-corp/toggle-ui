import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import RawInput from '#components/RawInput';
import type { RawInputProps } from '#components/RawInput';

export default {
    title: 'Input/Private/RawInput',
    component: RawInput,
    argTypes: {},
};

const Template: Story<RawInputProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <RawInput
            {...args}
            value={value}
            onChange={handleChange}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};
