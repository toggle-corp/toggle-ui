import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Button, { ButtonProps } from '../Button';

import styles from './styles.css';

export type Props<T extends string | number | undefined> = Omit<ButtonProps<T>, 'icons'>;

function QuickActionButton<T extends string | number | undefined>(props: Props<T>) {
    const {
        className,
        childrenContainerClassName,
        ...otherProps
    } = props;

    return (
        <Button
            className={_cs(className, styles.button, styles.roundButton)}
            childrenContainerClassName={_cs(styles.children, childrenContainerClassName)}
            variant="default"
            {...otherProps}
        />
    );
}

export default QuickActionButton;
