import React from 'react';

import styles from './styles.css';

interface DefaultEmptyComponentProps {
    pending?: boolean;
    filtered?: boolean;
    empty?: boolean;
}

function EmptyOptions(props: DefaultEmptyComponentProps) {
    const {
        filtered = false,
        pending = false,
        empty = false,
    } = props;

    if (pending) {
        // FIXME: use loading
        return (
            <div className={styles.empty}>
                Fetching options...
            </div>
        );
    }

    if (!empty) {
        return null;
    }

    if (filtered) {
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
