import React from 'react';

import styles from './styles.css';

interface DefaultEmptyComponentProps {
    optionsPending?: boolean;
    isFiltered?: boolean;
}

function EmptyOptions(props: DefaultEmptyComponentProps) {
    const {
        isFiltered = false,
        optionsPending = false,
    } = props;

    if (optionsPending) {
        // FIXME: use loading
        return (
            <div className={styles.empty}>
                Fetching options...
            </div>
        );
    }

    if (isFiltered) {
        return (
            <div className={styles.empty}>
                No matching options available.
            </div>
        );
    }

    return (
        <div className={styles.empty}>
            No options available.
        </div>
    );
}
export default EmptyOptions;
