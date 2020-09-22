import React, { useMemo, useState, useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import List, { GroupedListProps } from '../List';
import ToggleButton from '../ToggleButton';

import styles from './styles.css';

type OptionKey = string | number;

interface AccordionGroupProps<D, GP, GK extends OptionKey> {
    groupKey: GK;
    groupIndex: number;
    data: D[];
    children: React.ReactNode;
    groupOpened: boolean;
    setGroupOpen: (key: GK) => void;
    groupTitleRenderer: (props: GP) => JSX.Element;
    groupTitleRendererParams: (key: GK, index: number, data: D[]) => GP;
    groupHeaderClassName?: string;
    groupClassName?: string;
}

function AccordionGroup<D, GP, GK extends OptionKey>({
    data,
    children,
    groupKey,
    groupIndex,
    groupOpened,
    setGroupOpen,
    groupHeaderClassName,
    groupClassName,
    groupTitleRenderer: GroupTitleRenderer,
    groupTitleRendererParams,
}: AccordionGroupProps<D, GP, GK>) {
    const handleGroupClick = useCallback(() => {
        setGroupOpen(groupKey);
    }, [groupKey, setGroupOpen]);

    const titleExtraProps = useMemo(() => (
        groupTitleRendererParams(groupKey, groupIndex, data)
    ), [
        groupTitleRendererParams,
        data,
        groupKey,
        groupIndex,
    ]);

    return (
        <div className={_cs(styles.group, groupClassName)}>
            <ToggleButton
                className={_cs(styles.groupHeader, groupHeaderClassName)}
                name="group-header"
                value={groupOpened}
                onChange={handleGroupClick}
                actionsClassName={styles.actions}
                actions={(groupOpened ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                childrenClassName={styles.groupTitle}
                transparent
            >
                <GroupTitleRenderer
                    {...titleExtraProps}
                />
            </ToggleButton>
            {groupOpened && (
                <>
                    { children }
                </>
            )}
        </div>
    );
}

// eslint-disable-next-line max-len
export interface AccordionProps<D, P, K extends OptionKey, GP, GK extends OptionKey> extends GroupedListProps<D, P, K, GP, GK> {
    groupTitleRenderer: (props: GP) => JSX.Element;
    groupTitleRendererParams: (key: GK, index: number, data: D[]) => GP;
    groupClassName?: string;
    groupHeaderClassName?: string;
    multipleExpandEnabled?: boolean;
}

function Accordion<D, P, K extends OptionKey, GP, GK extends OptionKey>(
    props: AccordionProps<D, P, K, GP, GK>,
) {
    const {
        groupTitleRenderer,
        groupTitleRendererParams,
        groupKeySelector,
        groupComparator,
        renderer,
        data,
        keySelector,
        rendererParams,
        rendererClassName,
        multipleExpandEnabled,
        groupClassName,
        groupHeaderClassName,
    } = props;

    const [openGroups, setOpenGroups] = useState<GK[]>([]);

    const handleGroupOpenChange = useCallback((groupKey) => {
        let newOpenGroups = [...openGroups];
        const selectedGroupIndex = newOpenGroups.indexOf(groupKey);

        if (selectedGroupIndex !== -1) {
            if (multipleExpandEnabled) {
                newOpenGroups.splice(selectedGroupIndex, 1);
            } else {
                newOpenGroups = [];
            }
        } else if (multipleExpandEnabled) {
            newOpenGroups.push(groupKey);
        } else {
            newOpenGroups = [groupKey];
        }

        setOpenGroups(newOpenGroups);
    }, [openGroups, setOpenGroups, multipleExpandEnabled]);

    const groupRendererParams = useCallback((key, index, allData) => ({
        data: allData,
        groupKey: key,
        groupIndex: index,
        groupOpened: openGroups.indexOf(key) !== -1,
        setGroupOpen: handleGroupOpenChange,
        groupTitleRenderer,
        groupClassName,
        groupHeaderClassName,
        groupTitleRendererParams,
    }), [
        handleGroupOpenChange,
        openGroups,
        groupTitleRenderer,
        groupHeaderClassName,
        groupClassName,
        groupTitleRendererParams,
    ]);

    // NOTE: setting this directly idk why it doesn't work otherwise
    return (
        <div className={styles.accordion}>
            <List<D, P, K, AccordionGroupProps<D, GP, GK>, GK>
                groupKeySelector={groupKeySelector}
                groupComparator={groupComparator}
                groupRenderer={AccordionGroup}
                groupRendererParams={groupRendererParams}
                grouped

                renderer={renderer}
                data={data}
                keySelector={keySelector}
                rendererParams={rendererParams}
                rendererClassName={rendererClassName}
            />
        </div>
    );
}

export default Accordion;
