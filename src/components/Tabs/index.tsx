import React from 'react';
import { _cs } from '@togglecorp/fujs';
import Button, { ButtonProps } from '../Button';

import { useThemeClassName } from '../../hooks';
import styles from './styles.css';

const TabContext = React.createContext({
    activeTab: undefined,
    setActiveTab: () => { console.warn('setActiveTab called before it was initialized'); },
});

type TabKey = string | undefined;

export interface TabProps<T> extends Omit<ButtonProps, 'onClick'>{
    name: T;
    setActiveTab: (name: T) => void;
}

export function Tab<T extends TabKey>(props: TabProps<T>) {
    const {
        activeTab,
        setActiveTab,
    } = React.useContext(TabContext);

    const {
        className,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        onClick, // capture onClick
        name,
        uiMode,
        ...otherProps
    } = props;

    const isActive = name === activeTab;
    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <Button
            className={_cs(
                className,
                styles.tab,
                isActive && styles.active,
                themeClassName,
            )}
            uiMode={uiMode}
            transparent
            onClick={setActiveTab}
            name={name}
            role="tab"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export function TabList(props) {
    const {
        children,
        className,
    } = props;

    return (
        <div
            className={_cs(className, styles.tabList)}
            role="tablist"
        >
            { children }
        </div>
    );
}

export function TabPanel(props) {
    const { activeTab } = React.useContext(TabContext);

    const {
        name,
        ...otherProps
    } = props;

    if (name !== activeTab) {
        return null;
    }

    return (
        <div
            role="tabpanel"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        />
    );
}

export interface TabsProps<T> {
    children: React.ReactNode;
    value: T;
    onChange: (key: T) => void;
}

export function Tabs<T extends TabKey>(props: TabsProps<T>) {
    const {
        children,
        value,
        onChange,
    } = props;

    const contextValue = React.useMemo(() => ({
        activeTab: value,
        setActiveTab: onChange,
    }), [value, onChange]);

    return (
        <TabContext.Provider value={contextValue}>
            { children }
        </TabContext.Provider>
    );
}

export default Tabs;
