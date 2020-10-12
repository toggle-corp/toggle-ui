import React from 'react';
import { useArgs } from '@storybook/client-api';

import Pager, { PagerProps } from '#components/Pager';

export default {
    title: 'Input/Pager',
    component: Pager,
    argTypes: {},
};

const Template = (args: PagerProps) => {
    const [{ activePage, itemsPerPage }, handleArgsChange] = useArgs();

    const setActivePage = (e) => {
        handleArgsChange({ activePage: e });
    };

    const setItemsPerPage = (e) => {
        handleArgsChange({ itemsPerPage: e });
    };

    return (
        <Pager
            {...args}
            onItemsPerPageChange={setItemsPerPage}
            onActivePageChange={setActivePage}

            itemsPerPage={itemsPerPage}
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
