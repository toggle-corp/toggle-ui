import React from 'react';
import { _cs } from '@togglecorp/fujs';

import ThemeContext, { UiMode } from '../ThemeContext';

import Backdrop from '../Backdrop';
import LoadingAnimation from '../LoadingAnimation';

import styles from './styles.css';

export interface LoadingProps {
    className?: string;
    uiMode?: UiMode;
    compact?: boolean;
}

const reverseUiMode: {
    [key in UiMode]: UiMode;
} = {
    light: 'dark',
    dark: 'light',
};

function Loading(props: LoadingProps) {
    const { uiMode: defaultUiMode } = React.useContext(ThemeContext);
    const {
        className,
        uiMode = defaultUiMode,
        compact,
    } = props;

    // const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <Backdrop
            uiMode={reverseUiMode[uiMode]}
            className={_cs(className, styles.loading)}
        >
            <LoadingAnimation
                uiMode={uiMode}
                compact={compact}
            />
        </Backdrop>
    );
}

export default Loading;
