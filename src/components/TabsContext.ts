import React from 'react';

export type TabsKey = string;
export type TabsVariant = 'primary' | 'secondary' | 'step';

interface BaseTabContextProps {
    variant?: TabsVariant;
    disabled?: boolean;
    activeTab?: TabsKey | undefined;
    setActiveTab?: (key: TabsKey) => void;
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
    variant: 'primary',
    setActiveTab: () => { console.warn('setActiveTab called before it was initialized'); },
});
