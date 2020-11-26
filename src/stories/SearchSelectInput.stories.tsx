import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import SearchSelectInput, { SearchSelectInputProps } from '#components/SelectInput/SearchSelectInput';
import useQuery, { entityListTransformer } from '../utils/useQuery';

export default {
    title: 'Input/SearchSelectInput',
    component: SearchSelectInput,
    argTypes: {},
};

interface Option {
    id: string;
    name: string;
}

const options: Option[] = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
    { id: '3', name: 'Grapes' },
    { id: '4', name: 'Avocado' },
    { id: '5', name: 'Pear' },
];

// eslint-disable-next-line max-len
const Template: Story<SearchSelectInputProps<string, string, Option, { containerClassName?: string }, never>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string) => {
        updateArgs({ value: e });
    };

    const [searchValue, setSearchValue] = useState('');
    const [cacheOptions, setCacheOptions] = useState<Option[] | undefined | null>([
        options[0],
    ]);

    const [pending, searchOptions] = useQuery(
        options,
        searchValue,
        entityListTransformer,
        !searchValue,
    );

    return (
        <SearchSelectInput
            label="Fruit"
            {...props}
            value={value}
            options={cacheOptions}
            keySelector={(d) => d.id}
            labelSelector={(d) => d.name}
            onChange={setValue}
            nonClearable
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
    value: '1',
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: '1',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: '1',
    readOnly: true,
};
