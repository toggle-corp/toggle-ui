import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';

import Pager, { PagerProps } from '#components/Pager';

export default {
    title: 'Input/Pager',
    component: Pager,
    argTypes: {},
};

const Template: Story<PagerProps> = (args) => {
    const [{ activePage, itemsPerPage }, handleArgsChange] = useArgs();

    const setActivePage = (e: number) => {
        handleArgsChange({ activePage: e });
    };

    const setItemsPerPage = (e: number) => {
        handleArgsChange({ itemsPerPage: e });
    };

    return (
        <Pager
            {...args}
            onItemsPerPageChange={setItemsPerPage}
            onActivePageChange={setActivePage}
            maxItemsPerPage={itemsPerPage}
            activePage={activePage}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    activePage: 3,
    maxItemsPerPage: 25,
    itemsCount: 345,
};
