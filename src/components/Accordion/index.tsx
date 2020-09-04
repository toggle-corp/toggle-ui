import React, { useMemo, useState, useCallback } from 'react';

import List, { GroupedListProps } from '../List';

import styles from './styles.css';

type OptionKey = string | number;

interface AccordionGroupProps<D, GP, GK extends OptionKey> {
    groupKey: GK;
    groupIndex: number;
    data: D[];
    children: React.ReactNode;
    isGroupOpen: boolean;
    setGroupOpen: (key: GK) => void;
    groupTitleRenderer: React.ComponentType<GP>;
    groupTitleRendererParams: (key: GK, index: number, data: D[]) => GP;
    groupTitleRendererClassName?: string;
}

function AccordionGroup<D, GP, GK extends OptionKey>({
    data,
    children,
    groupKey,
    groupIndex,
    isGroupOpen,
    setGroupOpen,
    groupTitleRenderer: GroupTitleRenderer,
    groupTitleRendererParams,
    groupTitleRendererClassName,
}: AccordionGroupProps<D, GP, GK>) {
    const handleGroupOpen = useCallback(() => {
        setGroupOpen(groupKey);
    }, [groupKey, setGroupOpen]);

    const renderTitle = useMemo(() => {
        const extraProps = groupTitleRendererParams(groupKey, groupIndex, data);

        return (
            <GroupTitleRenderer
                className={groupTitleRendererClassName}
                {...extraProps}
            />
        );
    }, [
        groupTitleRendererParams,
        groupTitleRendererClassName,
        data,
        groupKey,
        groupIndex,
    ]);

    return (
        <div className={styles.group}>
            <button
                className={styles.groupHeader}
                name="asd"
                onClick={handleGroupOpen}
                type="button"
            >
                {renderTitle}
            </button>
            {isGroupOpen && (
                <div>
                    { children }
                </div>
            )}
        </div>
    );
}

export interface AccordionProps<D, P, K extends OptionKey, GP, GK extends OptionKey> extends
GroupedListProps<D, P, K, GP, GK> {
    groupTitleRenderer: React.ComponentType<GP>;
    groupTitleRendererParams: (key: GK, index: number, data: D[]) => GP;
    groupTitleRendererClassName?: string;
}

function Accordion<D, P, K extends OptionKey, GP, GK extends OptionKey>(
    props: AccordionProps<D, P, K, GP, GK>,
) {
    const {
        groupTitleRenderer,
        groupTitleRendererParams,
        groupTitleRendererClassName,
        groupKeySelector,
        groupComparator,
        renderer,
        data,
        keySelector,
        rendererParams,
        rendererClassName,
    } = props;

    const [openGroup, setOpenGroup] = useState<GK | undefined>(undefined);

    const groupRendererParams = useCallback((key, index, allData) => ({
        data: allData,
        groupKey: key,
        groupIndex: index,
        isGroupOpen: key === openGroup,
        setGroupOpen: setOpenGroup,
        groupTitleRenderer,
        groupTitleRendererParams,
        groupTitleRendererClassName,
    }), [
        setOpenGroup,
        openGroup,
        groupTitleRenderer,
        groupTitleRendererParams,
        groupTitleRendererClassName,
    ]);

    return (
        <div className={styles.accordion}>
            <List
                groupKeySelector={groupKeySelector}
                groupComparator={groupComparator}
                renderer={renderer}
                groupRenderer={AccordionGroup}
                groupRendererParams={groupRendererParams}
                data={data}
                keySelector={keySelector}
                rendererParams={rendererParams}
                rendererClassName={rendererClassName}
                grouped
            />
        </div>
    );
}

export default Accordion;
