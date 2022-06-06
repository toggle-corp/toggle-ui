import React, { useState } from 'react';

import {
    getHashFromBrowser,
    setHashToBrowser,
} from '../utils';

function useHash(value?: string) {
    const [initialValue] = useState<string | undefined>(value);

    const [hash, setHash] = useState(getHashFromBrowser());

    React.useEffect(() => {
        if (initialValue) {
            setHashToBrowser(initialValue);
        }
    }, [initialValue]);

    const handleHashChange = React.useCallback(() => {
        setHash(getHashFromBrowser());
    }, []);

    React.useEffect(() => {
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [handleHashChange]);

    return hash;
}

export default useHash;
