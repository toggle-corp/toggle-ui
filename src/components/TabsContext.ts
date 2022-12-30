import React from 'react';

export type TabsKey = string;

interface BaseTabContextProps {
    disabled?: boolean;
}

export type TabsContextProps = BaseTabContextProps & (
    {
        useHash?: false;
        activeTab: TabsKey | undefined;
        setActiveTab: (key: TabsKey) => void;
    } | {
        useHash: true;
        hash: string | undefined;
    }
);

export const TabsContext = React.createContext<TabsContextProps>({
    disabled: false,
    activeTab: undefined,
    setActiveTab: () => { console.warn('setActiveTab called before it was initialized'); },
});
