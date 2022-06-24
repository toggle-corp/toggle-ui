import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import useCounter from '../../src/hooks/useCounter';
import Numeral, { NumeralProps } from '../../src/components/Numeral';

export default {
    title: 'View/Numeral',
    component: Numeral,
    argTypes: {},
};

const Template: Story<NumeralProps & { counter?: boolean }> = (args) => {
    const {
        counter,
        value,
        ...otherArgs
    } = args;

    const counterValue1 = useCounter(value, 2000, 'linear');
    const counterValue2 = useCounter(value, 2000, 'exp');

    if (counter) {
        return (
            <>
                <div>
                    <Numeral
                        value={counterValue1}
                        {...otherArgs}
                    />
                </div>
                <div>
                    <Numeral
                        value={counterValue2 ? Math.round(counterValue2) : 0}
                        {...otherArgs}
                    />
                </div>
            </>
        );
    }

    return (
        <Numeral
            value={value}
            {...otherArgs}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    value: 12441.1212,
};

export const WithCounter = Template.bind({});
WithCounter.args = {
    value: 10,
    counter: true,
    abbreviate: true,
};
