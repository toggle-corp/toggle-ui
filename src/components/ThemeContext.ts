import React from 'react';

const noOp = () => {};

export type UiMode = 'light' | 'dark';

export interface ThemeContext {
    uiMode: UiMode;
    setUiMode: (newMode: UiMode) => void; 
}

const themeContext = React.createContext<ThemeContext>({
    uiMode: 'light',
    setUiMode: noOp,
});

export default themeContext;
