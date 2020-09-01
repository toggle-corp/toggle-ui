import React from 'react';
import { _cs } from '@togglecorp/fujs';
import Button, { ButtonProps } from '../Button';

import { useThemeClassName } from '../../hooks';
import styles from './styles.css';

type TabKey = string | undefined;

export interface TabContextProps {
    activeTab: TabKey;
    setActiveTab: (key: TabKey) => void;
}

const TabContext = React.createContext<TabContextProps>({
    activeTab: undefined,
    setActiveTab: () => { console.warn('setActiveTab called before it was initialized'); },
});

export interface TabProps<T extends TabKey> extends Omit<ButtonProps<T>, 'onClick'>{
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

export interface TabListProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

export function TabList(props: TabListProps) {
    const {
        children,
        className,
        ...otherProps
    } = props;

    return (
        <div
            {...otherProps}
            className={_cs(className, styles.tabList)}
            role="tablist"
        >
            { children }
        </div>
    );
}

export interface TabPanelProps extends React.HTMLProps<HTMLDivElement> {
    name: TabKey;
    elementRef?: React.Ref<HTMLDivElement>;
}

export function TabPanel(props: TabPanelProps) {
    const { activeTab } = React.useContext(TabContext);

    const {
        name,
        elementRef,
        ...otherProps
    } = props;

    if (name !== activeTab) {
        return null;
    }

    return (
        <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            role="tabpanel"
            ref={elementRef}
        />
    );
}

export interface TabsProps {
    children: React.ReactNode;
    value: TabKey;
    onChange: (key: TabKey) => void;
}

export function Tabs(props: TabsProps) {
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
