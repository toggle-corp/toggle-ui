import React from 'react';
import ThemeContext, { UiMode } from './components/ThemeContext';

// eslint-disable-next-line import/prefer-default-export
export function useThemeClassName(
    uiModeFromProps: UiMode | undefined,
    lightClassName: string,
    darkClassName: string,
) {
    const { uiMode } = React.useContext(ThemeContext);
    const className = React.useMemo(() => {
        const map = {
            light: lightClassName,
            dark: darkClassName,
        };

        return map[uiModeFromProps || uiMode];
    }, [uiModeFromProps, uiMode, lightClassName, darkClassName]);

    return className;
}
