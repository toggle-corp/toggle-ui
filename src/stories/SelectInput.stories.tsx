import React from 'react';

import SelectInput from '#components/SelectInput';

export default {
    title: 'Input/SelectInput',
    component: SelectInput,
    argTypes: {},
};

const options = [
    { key: '1', label: 'Apple' },
    { key: '2', label: 'Banana' },
    { key: '3', label: 'Grapes' },
    { key: '4', label: 'Avocado' },
    { key: '5', label: 'Pear' },
];

export const Default = () => {
    const [value, setValue] = React.useState('1');

    return (
        <SelectInput
            label="Fruit"
            options={options}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
        />
    );
};

export const Disabled = () => {
    const [value, setValue] = React.useState('1');

    return (
        <SelectInput
            label="Fruit"
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
    const [value, setValue] = React.useState('1');

    return (
        <SelectInput
            label="Fruit"
            options={options}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
            readOnly
        />
    );
};
