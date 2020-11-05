import React from 'react';
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdIndeterminateCheckBox,
} from 'react-icons/md';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';

import styles from './styles.css';

export interface CheckmarkProps {
    className?: string;
    value: boolean | undefined;
    indeterminate?: boolean;
    uiMode?: UiMode;
}

function Checkmark(props: CheckmarkProps) {
    const {
        className,
        indeterminate,
        value,
    } = props;

    const iconClassName = _cs(
        className,
        styles.checkmark,
        'tui-checkmark',
    );

    return (
        <>
            {indeterminate && (
                <MdIndeterminateCheckBox
                    className={iconClassName}
                />
            )}
            {value && !indeterminate && (
                <MdCheckBox
                    className={iconClassName}
                />
            )}
            {!value && !indeterminate && (
                <MdCheckBoxOutlineBlank
                    className={iconClassName}
                />
            )}
        </>
    );
}

export default Checkmark;
