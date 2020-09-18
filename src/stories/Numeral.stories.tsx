import React from 'react';

import Numeral, { NumeralProps } from '#components/Numeral';

export default {
    title: 'View/Numeral',
    component: Numeral,
    argTypes: {},
};

const Template = (args: NumeralProps) => (
    <Numeral {...args} />
);

export const Default = Template.bind({});
Default.args = {
    value: 12441.1212,
};
