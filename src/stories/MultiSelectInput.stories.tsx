import React from 'react';

import MultiSelectInput from '#components/MultiSelectInput';

export default {
    title: 'Input/MultiSelectInput',
    component: MultiSelectInput,
    argTypes: {},
};

const options = [
    { key: '1', label: 'Potato' },
    { key: '2', label: 'Tomato' },
    { key: '3', label: 'Pumpkin' },
    { key: '4', label: 'Gourd' },
    { key: '5', label: 'Spinach' },
    { key: '6', label: 'Eggplant' },
];

export const Default = () => {
    const [value, setValue] = React.useState(['1', '3']);

    return (
        <MultiSelectInput
            label="Vegetables"
            options={options}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
        />
    );
};

export const Disabled = () => {
    const [value, setValue] = React.useState(['1', '3']);

    return (
        <MultiSelectInput
            label="Vegetables"
            options={options}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
            disabled
        />
    );
};

export const ReadOnly = () => {
    const [value, setValue] = React.useState(['1', '3']);

    return (
        <MultiSelectInput
            label="Vegetables"
            options={options}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
            readOnly
        />
    );
};
