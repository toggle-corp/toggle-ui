import React from 'react';
import { _cs, isFalsyString } from '@togglecorp/fujs';
import Button, { ButtonProps } from '../Button';

import useThemeClassName from '../../hooks/useThemeClassName';
import useHash from '../../hooks/useHash';
import { getHashFromBrowser, setHashToBrowser } from '../../utils';

import {
    TabsKey,
    TabsContext,
} from '../TabsContext';
import styles from './styles.css';

export interface TabProps<T extends TabsKey> extends Omit<ButtonProps<T>, 'onClick'> {
    name: T;
}

export function Tab<T extends TabsKey>(props: TabProps<T>) {
    const context = React.useContext(TabsContext);

    const {
        className,
        name,
        uiMode,
        ...otherProps
    } = props;

    let isActive = false;

    if (context.useHash) {
        isActive = context.hash === name;
    } else {
        isActive = context.activeTab === name;
    }

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
            onClick={context.useHash ? setHashToBrowser : context.setActiveTab}
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
            {children}
        </div>
    );
}

export interface TabPanelProps extends React.HTMLProps<HTMLDivElement> {
    name: TabsKey;
    elementRef?: React.Ref<HTMLDivElement>;
}

export function TabPanel(props: TabPanelProps) {
    const context = React.useContext(TabsContext);

    const {
        name,
        elementRef,
        ...otherProps
    } = props;

    let isActive;
    if (context.useHash) {
        isActive = context.hash === name;
    } else {
        isActive = context.activeTab === name;
    }

    if (!isActive) {
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

export interface BaseProps {
    children: React.ReactNode;
    disabled?: boolean;
}

export type TabsProps<T extends TabsKey> = BaseProps & (
    {
        useHash?: false;
        value: T | undefined;
        onChange: ((key: T | undefined) => void) | undefined;
    } | {
        useHash: true;
        // defaultHash will not override already existing hash
        defaultHash?: string;
        // initialHash will override hash there is already a hash
        initialHash?: string;
    }
);

export function Tabs<T extends TabsKey>(props: TabsProps<T>) {
    const {
        children,
        disabled,
    } = props;

    // eslint-disable-next-line react/destructuring-assignment
    const defaultHash = props.useHash && isFalsyString(getHashFromBrowser())
        // eslint-disable-next-line react/destructuring-assignment
        ? props.defaultHash
        : undefined;

    // eslint-disable-next-line react/destructuring-assignment
    const hash = useHash(props.useHash ? props.initialHash || defaultHash : undefined);

    // FIXME: destructuring here as props.value and props.onChange cannot be
    // added in dependency list
    // eslint-disable-next-line react/destructuring-assignment
    const onChange = !props.useHash ? props.onChange : undefined;
    // eslint-disable-next-line react/destructuring-assignment
    const value = !props.useHash ? props.value : undefined;

    const contextValue = React.useMemo(() => {
        // eslint-disable-next-line react/destructuring-assignment
        if (props.useHash) {
            return {
                disabled,
                hash,
                // eslint-disable-next-line react/destructuring-assignment
                useHash: props.useHash,
            };
        }

        // Note: following cast is required since we do not have any other method
        // to provide template in the context type
        return {
            disabled,
            activeTab: value,
            setActiveTab: onChange as (key: TabsKey | undefined) => void | undefined,
        };
    }, [
        // eslint-disable-next-line react/destructuring-assignment
        props.useHash,
        value,
        onChange,
        disabled,
        hash,
    ]);

    return (
        <TabsContext.Provider value={contextValue}>
            {children}
        </TabsContext.Provider>
    );
}

export default Tabs;
