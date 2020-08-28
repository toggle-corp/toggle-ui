import React from 'react';
import { action } from '@storybook/addon-actions';

import {
    Tabs,
    Tab,
    TabPanel,
    TabList,
} from '#components/Tabs';

export default {
    title: 'View/Tabs',
    component: Tab,
    argTypes: {},
};

export const Default = () => {
    const [activeTab, setActiveTab] = React.useState('hello');

    return (
        <Tabs
            value={activeTab}
            onChange={setActiveTab}
        >
            <TabList>
                <Tab name="hello">
                    Hello
                </Tab>
                <Tab name="bye">
                    Bye
                </Tab>
            </TabList>

            <TabPanel name="hello">
                Hello there!
            </TabPanel>
            <TabPanel name="bye">
                Bye Bye!
            </TabPanel>
        </Tabs>
    );
};
