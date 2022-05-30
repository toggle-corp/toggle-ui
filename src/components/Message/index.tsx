import React, { memo } from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoRefreshOutline } from 'react-icons/io5';

import Button from '../Button';
import QuickActionButton from '../QuickActionButton';
import PendingMessage from '../PendingMessage';

import styles from './styles.css';

export const genericMemo: (<T>(c: T) => T) = memo;

export interface MessageProps {
    className?: string;
    pending?: boolean;
    empty?: boolean;
    filtered?: boolean;
    errored?: boolean;
    emptyIcon?: React.ReactNode;
    filteredEmptyIcon?: React.ReactNode;
    erroredEmptyIcon?: React.ReactNode;
    onReload?: () => void;
    actions?: React.ReactNode;
    message?: React.ReactNode;
    pendingMessage?: string;
    emptyMessage?: React.ReactNode;
    filteredEmptyMessage?: React.ReactNode;
    erroredEmptyMessage?: React.ReactNode;
    pendingContainerClassName?: string;
    actionsContainerClassName?: string;
    compact?: boolean;
    compactAndVertical?: boolean;
    compactPendingMessage?: boolean;
    compactEmptyMessage?: boolean;
    messageHidden?: boolean;
}

function Message(props: MessageProps) {
    const {
        className,
        pending,
        empty,
        filtered,
        errored,
        message: messageFromProps,
        pendingMessage,
        emptyMessage = 'No data available',
        filteredEmptyMessage = 'No matching data',
        erroredEmptyMessage = 'Oops! We ran into an issue',
        pendingContainerClassName,
        compact,
        compactPendingMessage,
        compactEmptyMessage,
        compactAndVertical,
        messageHidden = false,
        onReload,
        actions,
        actionsContainerClassName,
    } = props;

    if (pending) {
        return (
            <PendingMessage
                className={pendingContainerClassName}
                message={pendingMessage}
                compact={compactPendingMessage || compact}
            />
        );
    }

    let message: React.ReactNode = messageFromProps;

    if (empty || errored) {
        if (errored) {
            message = erroredEmptyMessage;
        } else if (filtered) {
            message = filteredEmptyMessage;
        } else {
            message = emptyMessage;
        }
    }

    if (!message) {
        return null;
    }

    const showActions = (errored && onReload) || actions;

    return (
        <div
            className={_cs(
                className,
                styles.message,
                (compactAndVertical || compact || compactEmptyMessage) && styles.compact,
                compactAndVertical && styles.vertical,
            )}
        >
            {!messageHidden && (
                <div className={styles.content}>
                    {message}
                </div>
            )}
            {showActions && (
                <div className={_cs(styles.actions, actionsContainerClassName)}>
                    {onReload && compact && (
                        <QuickActionButton
                            name={undefined}
                            onClick={onReload}
                            variant="primary"
                        >
                            <IoRefreshOutline />
                        </QuickActionButton>
                    )}
                    {onReload && !compact && (
                        <Button
                            name={undefined}
                            onClick={onReload}
                            variant="default"
                            icons={(
                                <IoRefreshOutline />
                            )}
                        >
                            Reload
                        </Button>
                    )}
                    {actions}
                </div>
            )}
        </div>
    );
}

export default genericMemo(Message);
