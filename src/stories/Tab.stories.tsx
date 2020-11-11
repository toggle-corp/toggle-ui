import React from 'react';
import { useArgs } from '@storybook/client-api';
import { Story } from '@storybook/react/types-6-0';

import {
    Tabs,
    Tab,
    TabPanel,
    TabList,
    TabsProps,
} from '#components/Tabs';

export default {
    title: 'View/Tabs',
    component: Tab,
    argTypes: {},
};

const Template: Story<TabsProps<string>> = () => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string) => {
        updateArgs({ value: e });
    };

    return (
        <Tabs
            value={value}
            onChange={setValue}
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

export const Default = Template.bind({});
Default.args = {
    value: 'hello',
};
