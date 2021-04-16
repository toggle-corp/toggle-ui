import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import SearchMultiSelectInput, { SearchMultiSelectInputProps } from '#components/MultiSelectInput/SearchMultiSelectInput';
import useQuery, { entityListTransformer } from '../utils/useQuery';

export default {
    title: 'Input/SearchMultiSelectInput',
    component: SearchMultiSelectInput,
    argTypes: {},
};

interface Option {
    id: string;
    name: string;
}

const options: Option[] = [
    { id: '6', name: 'Eggplant' },
    { id: '4', name: 'Gourd' },
    { id: '1', name: 'Potato' },
    { id: '3', name: 'Pumpkin' },
    { id: '5', name: 'Spinach' },
    { id: '2', name: 'Tomato' },
];

// eslint-disable-next-line max-len
const Template: Story<SearchMultiSelectInputProps<string, string, Option, { containerClassName?: string }, never>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string[]) => {
        updateArgs({ value: e });
    };

    const [searchValue, setSearchValue] = useState('');
    const [cacheOptions, setCacheOptions] = useState<Option[] | undefined | null>([
        options[2],
        options[3],
    ]);

    const [pending, searchOptions] = useQuery(
        options,
        searchValue,
        entityListTransformer,
        false,
        // !searchValue,
    );

    return (
        <SearchMultiSelectInput
            label="Vegetables"
            {...props}
            options={cacheOptions}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.id}
            labelSelector={(d) => d.name}
            searchOptions={searchOptions}
            onSearchValueChange={setSearchValue}
            optionsPending={pending}
            onOptionsChange={setCacheOptions}
        />
    );
};

export const NoValue = Template.bind({});
NoValue.args = {
    value: undefined,
};

export const Default = Template.bind({});
Default.args = {
    value: ['1', '3'],
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: ['1', '3'],
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: ['1', '3'],
    readOnly: true,
};
