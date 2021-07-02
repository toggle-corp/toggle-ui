import React from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.css';

export interface Props extends Omit<React.HTMLProps<HTMLTableHeaderCellElement>, 'ref'> {
}

function TableHeader(props: Props) {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <th
            className={_cs(className, styles.th)}
            {...otherProps}
        >
            {children}
        </th>
    );
}

export default TableHeader;
