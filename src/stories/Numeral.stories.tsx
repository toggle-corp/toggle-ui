import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import Numeral, { NumeralProps } from '#components/Numeral';

export default {
    title: 'View/Numeral',
    component: Numeral,
    argTypes: {},
};

const Template: Story<NumeralProps> = (args) => (
    <Numeral {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: 12441.1212,
};
