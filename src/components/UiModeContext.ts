import React from 'react';

export type UiMode = 'light' | 'dark';

export interface UiModeContextProps {
    uiMode: UiMode;
    setUiMode: (newMode: UiMode) => void;
}

const UiModeContext = React.createContext<UiModeContextProps>({
    uiMode: 'light',
    setUiMode: () => {
        console.warn('setUiMode called before it was assigned');
    },
});

export default UiModeContext;
