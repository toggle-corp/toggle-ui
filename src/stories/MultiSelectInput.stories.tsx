import React from 'react';

import MultiSelectInput from '#components/MultiSelectInput';

export default {
    title: 'Input/MultiSelectInput',
    component: MultiSelectInput,
    argTypes: {},
};

const options = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
    { key: '4', label: 'Option 4' },
    { key: '5', label: 'Option 5' },
    { key: '6', label: 'Number 6 in the option' },
];

export const Default = () => {
    const [value, setValue] = React.useState(['1', '3']);

    return (
        <MultiSelectInput
            options={options}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
        />
    );
};
