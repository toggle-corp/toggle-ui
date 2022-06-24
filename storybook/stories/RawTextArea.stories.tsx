import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import RawTextArea from '../../src/components/RawTextArea';
import type { RawTextAreaProps } from '../../src/components/RawTextArea';

export default {
    title: 'Input/Private/RawTextArea',
    component: RawTextArea,
    argTypes: {},
};

const Template: Story<RawTextAreaProps<string>> = (args) => {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <RawTextArea
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
