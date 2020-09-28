import React, { ReactNode } from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

export interface ChipProps {
    /**
    * Class name for Chip
     */
    className?: string;
    /**
     * Label for the chip
     */
    label?: ReactNode,
    /**
     * Class name of Chip label
     */
    labelClassName?: string;
    /**
     * Left component of the chip
     */
    icon?: ReactNode,
    /**
     * Class name of icon
     */
    iconClassName?: string;
    /**
     * Right component of the chip
     */
    action?: ReactNode;
    /**
     * Class name for action
     */
    actionClassName?: string;
    /**
     * Children for the chip
     */
    children?: ReactNode;
}

function Chip(props: ChipProps) {
    const {
        label,
        icon = null,
        action,
        className,
        labelClassName,
        iconClassName,
        actionClassName,
        children,
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
                    className={_cs(
                        styles.icon,
                        iconClassName,
                    )}
                >
                    {icon}
                </span>
            )}
            {children ? (
                <>
                    {children}
                </>
            )
                : (
                    <span
                        className={_cs(
                            styles.label,
                            labelClassName,
                        )}
                    >
                        {label}
                    </span>
                )}
            {action && (
                <span
                    className={_cs(
                        styles.action,
                        actionClassName,
                    )}
                >
                    {action}
                </span>
            )}
        </div>
    );
}

export default Chip;
