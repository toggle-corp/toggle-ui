import React from 'react';

const noOp = () => {
    console.warn('setUiMode called before it was assigned');
};

export type UiMode = 'light' | 'dark';

export interface ThemeContextProps {
    uiMode: UiMode;
    setUiMode: (newMode: UiMode) => void;
}

const ThemeContext = React.createContext<ThemeContextProps>({
    uiMode: 'light',
    setUiMode: noOp,
});

export default ThemeContext;
