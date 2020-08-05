import React from 'react';
import ThemeContext, { UiMode } from './components/ThemeContext';

export function useThemeClassName(uiModeFromProps: UiMode | undefined, lightClassName: string, darkClassName: string) {
    const { uiMode } = React.useContext(ThemeContext);
    const className = React.useMemo(() => {
        const map = {
            light: lightClassName,
            dark: darkClassName,
        };

        if (uiModeFromProps) {
            return map[uiModeFromProps];
        }
        return map[uiMode];
    }, [uiModeFromProps, uiMode, lightClassName, darkClassName]);

    return className;
}
