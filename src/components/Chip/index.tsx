import React, { ReactNode } from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';
import Button, { ButtonProps } from '../Button';

export interface ActionComponentProps {
    /**
     * Right component of the chip
     */
    action?: ReactNode,
    /**
     * Class name for action
     */
    actionClassName?: string;
    /**
     * Handle click for action component
     */
    onClick?: () => void,
}

function ActionComponent(props: ActionComponentProps) {
    const {
        action,
        actionClassName,
        onClick,
    } = props;

    return (
        <span
            role="button"
            className={styles.actionComponent}
        >
            <Button
                name="action"
                onClick={onClick}
                className={_cs(
                    styles.action,
                    actionClassName,
                )}
            >
                {action}
            </Button>
        </span>
    );
}

export interface ChipProps extends ActionComponentProps {
    /**
     * Label for the chip
     */
    label: ReactNode,
    /**
     * Check if chip is clickable
     */
    clickable?: boolean,
    /**
     * Left component of the chip
     */
    icon?: ReactNode,
    /**
     * Check if chip is disabled
     */
    disabled?: boolean,
    /**
     * Classname of icon
     */
    iconClassName?: string;

    /**
     * Content for the chip
     */
    children?: ReactNode;

    /**
     * Class name for Chip
     */
    className?: string;
}

function Chip(props: ChipProps) {
    const {
        label,
        icon = null,
        action,
        className,
        iconClassName,
        actionClassName,
        children,
        onClick,
    } = props;

    return (
        <div
            className={_cs(
                styles.chipRow,
                className,
            )}
        >
            {icon && (
                <span
                    className={_cs(styles.icon, iconClassName)}
                >
                    {icon}
                </span>
            )}
            {children ? { children } : (
                <span
                    className={_cs(
                        styles.label,
                    )}
                >
                    {label}
                </span>
            )}
            {action && (
                <ActionComponent
                    action={action}
                    actionClassName={actionClassName}
                    onClick={onClick}
                />
            )}
        </div>
    );
}

export default Chip;
