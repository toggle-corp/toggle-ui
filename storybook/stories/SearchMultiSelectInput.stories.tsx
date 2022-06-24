import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import SearchMultiSelectInput, { SearchMultiSelectInputProps } from '../../src/components/MultiSelectInput/SearchMultiSelectInput';
import useQuery, { entityListTransformer } from '../../src/utils/useQuery';

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
    { id: '1', name: 'artichoke' },
    { id: '2', name: 'aubergine (eggplant)biologically a fruit but taxed as a vegetable' },
    { id: '3', name: 'asparagus' },
    { id: '4', name: 'legumes' },
    { id: '5', name: 'alfalfa sprouts' },
    { id: '6', name: 'azuki beans (or adzuki)' },
    { id: '7', name: 'Apple' },
    { id: '8', name: 'bean sprouts' },
    { id: '9', name: 'black beans' },
    { id: '10', name: 'black-eyed peas' },
    { id: '11', name: 'borlotti bean' },
    { id: '12', name: 'broad beans' },
    { id: '13', name: 'chickpeas, garbanzos, or ceci beans' },
    { id: '14', name: 'green beans' },
    { id: '15', name: 'kidney beans' },
    { id: '16', name: 'lentils' },
    { id: '17', name: 'lima beans or butter bean' },
    { id: '18', name: 'mung beans' },
    { id: '19', name: 'navy beans' },
    { id: '20', name: 'peanuts' },
    { id: '21', name: 'pinto beans' },
    { id: '22', name: 'runner beans' },
    { id: '23', name: 'split peas' },
    { id: '24', name: 'soy beans' },
    { id: '25', name: 'peas' },
    { id: '26', name: 'mangetout or snap peas' },
    { id: '27', name: 'broccoflower (a hybrid)' },
    { id: '28', name: 'broccoli (calabrese)' },
    { id: '29', name: 'brussels sprouts' },
    { id: '30', name: 'cabbage' },
    { id: '31', name: 'kohlrabi' },
    { id: '32', name: 'Savoy cabbage' },
    { id: '33', name: 'red cabbage' },
    { id: '34', name: 'cauliflower' },
    { id: '35', name: 'celery' },
    { id: '36', name: 'endive' },
    { id: '37', name: 'fiddleheads' },
    { id: '38', name: 'frisee' },
    { id: '39', name: 'fennel' },
    { id: '40', name: 'greens' },
    { id: '41', name: 'bok choy' },
    { id: '42', name: 'chard (beet greens)' },
    { id: '43', name: 'collard greens' },
    { id: '44', name: 'kale' },
    { id: '45', name: 'mustard greens' },
    { id: '46', name: 'spinach' },
    { id: '47', name: 'herbs' },
    { id: '48', name: 'anise' },
    { id: '49', name: 'basil' },
    { id: '50', name: 'caraway' },
    { id: '51', name: 'coriander' },
    { id: '52', name: 'chamomile' },
    { id: '53', name: 'daikon' },
    { id: '54', name: 'dill' },
    { id: '55', name: 'fennel' },
    { id: '56', name: 'lavender' },
    { id: '57', name: 'cymbopogon (also known as lemongrass)' },
    { id: '58', name: 'marjoram' },
    { id: '59', name: 'oregano' },
    { id: '60', name: 'parsley' },
    { id: '61', name: 'rosemary' },
    { id: '62', name: 'thyme' },
    { id: '63', name: 'lettuce' },
    { id: '64', name: 'arugula' },
    { id: '65', name: 'mushrooms (actually a fungus, not a plant)' },
    { id: '66', name: 'nettles' },
    { id: '67', name: 'New Zealand spinach' },
    { id: '68', name: 'okra' },
    { id: '69', name: 'onions' },
    { id: '70', name: 'chives' },
    { id: '71', name: 'garlic' },
    { id: '72', name: 'leek' },
    { id: '73', name: 'onion' },
    { id: '74', name: 'shallot' },
    { id: '75', name: 'scallion (spring onion UK, green onion US)' },
    { id: '76', name: 'peppers (biologically berry, but taxed as vegetables)' },
    { id: '77', name: 'bell pepper' },
    { id: '78', name: 'chili pepper' },
    { id: '79', name: 'jalapeño' },
    { id: '80', name: 'habanero' },
    { id: '81', name: 'paprika' },
    { id: '82', name: 'tabasco pepper' },
    { id: '83', name: 'cayenne pepper' },
    { id: '84', name: 'radicchio' },
    { id: '85', name: 'rhubarb' },
    { id: '86', name: 'root vegetables' },
    { id: '87', name: 'beetroot (UK) beet (US)' },
    { id: '88', name: 'mangel-wurzel: a variety of beet used mostly as cattlefeed' },
    { id: '89', name: 'carrot' },
    { id: '90', name: 'celeriac' },
    { id: '91', name: 'corms' },
    { id: '92', name: 'eddoe' },
    { id: '93', name: 'konjac' },
    { id: '94', name: 'taro' },
    { id: '95', name: 'water chestnut' },
    { id: '96', name: 'ginger' },
    { id: '97', name: 'parsnip' },
    { id: '98', name: 'rutabaga' },
    { id: '99', name: 'radish' },
    { id: '100', name: 'wasabi' },
    { id: '101', name: 'horseradish' },
    { id: '102', name: 'Diakon or white radish' },
    { id: '103', name: 'tubers' },
    { id: '104', name: 'jicama' },
    { id: '105', name: 'jerusalem artichoke' },
    { id: '106', name: 'potato' },
    { id: '107', name: 'sweet potato' },
    { id: '108', name: 'yam' },
    { id: '109', name: 'turnip' },
    { id: '110', name: 'spinach' },
    { id: '111', name: 'salsify (Oyster Plant)' },
    { id: '112', name: 'skirret' },
    { id: '113', name: 'sweetcorn [1]' },
    { id: '114', name: 'topinambur' },
    { id: '115', name: 'squashes (biologically fruits, but taxed as vegetables)' },
    { id: '116', name: 'acorn squash' },
    { id: '117', name: 'bitter melon' },
    { id: '118', name: 'butternut squash' },
    { id: '119', name: 'banana squash' },
    { id: '120', name: 'courgette (UK), Zucchini (US)' },
    { id: '121', name: 'cucumber (biologically fruits, but taxed as vegetables)' },
    { id: '122', name: 'delicata' },
    { id: '123', name: 'gem squash' },
    { id: '124', name: 'hubbard squash' },
    { id: '125', name: 'marrow (UK) Squash (US)' },
    { id: '126', name: 'spaghetti squash' },
    { id: '127', name: 'tat soi' },
    { id: '128', name: 'tomato (biologically a fruit, but taxed as a vegetable.)' },
    { id: '129', name: 'watercress' },
];

// eslint-disable-next-line max-len
const Template: Story<SearchMultiSelectInputProps<string, string, Option, { containerClassName?: string }, never>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string[]) => {
        updateArgs({ value: e });
    };

    const [searchValue, setSearchValue] = useState('');
    const [opened, setOpened] = useState(false);
    const [cacheOptions, setCacheOptions] = useState<Option[] | undefined | null>([
        options[0],
        options[2],
    ]);

    const [pending, searchOptions, , totalCount] = useQuery(
        options,
        searchValue,
        entityListTransformer,
        !opened,
    );

    return (
        <SearchMultiSelectInput
            label="Vegetables"
            {...props}
            totalOptionsCount={totalCount}
            options={cacheOptions}
            value={value}
            onChange={setValue}
            keySelector={(d) => d.id}
            labelSelector={(d) => d.name}
            searchOptions={searchOptions}
            onSearchValueChange={setSearchValue}
            optionsPending={pending}
            onOptionsChange={setCacheOptions}
            onShowDropdownChange={setOpened}
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
