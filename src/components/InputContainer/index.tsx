import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';
import styles from './styles.css';

export interface InputContainerProps {
    /**
    * Style for the button
    */
    className?: string;
    /**
    * Style for the label container
    */
    labelContainerClassName?: string;
    /**
    * Style for the hint and error container
    */
    hintAndErrorContainerClassName?: string;
    /**
    * Style for the input section
    */
    inputSectionClassName?: string;
    /**
    * Style for the icon container
    */
    iconsContainerClassName?: string;
    /**
    * Style for the input container
    */
    inputContainerClassName?: string;
    /**
    * Style for the actions container
    */
    actionsContainerClassName?: string;
    /**
     * uiMode: light or dark
     */
    uiMode?: UiMode;
    /**
    * Content before the main input content
    */
    icons?: React.ReactNode;
    /**
    * Content after the main input content
    */
    actions?: React.ReactNode;
    /**
    * The main input content
    */
    input: React.ReactNode;

    /**
    * Input label
    */
    label?: React.ReactNode;

    /**
    * Input hint and error
    */
    hintAndError?: React.ReactNode;

    /**
     * Is input disabled?
     */
    disabled?: boolean;

    /**
     * Is input readonly?
     */
    readOnly?: boolean;
}

/**
 * Common container for input elements
 */
function InputContainer(props: InputContainerProps) {
    const {
        className,
        uiMode,
        label,
        labelContainerClassName,
        inputSectionClassName,
        inputContainerClassName,
        icons,
        iconsContainerClassName,
        actions,
        actionsContainerClassName,
        input,
        hintAndError,
        hintAndErrorContainerClassName,
        disabled,
        readOnly,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);
    return (
        <div
            className={_cs(
                className,
                styles.inputContainer,
                themeClassName,
                disabled && styles.disabled,
                readOnly && styles.readOnly,
            )}
        >
            { label && (
                <div className={_cs(styles.inputLabel, labelContainerClassName)}>
                    { label }
                </div>
            )}
            <div className={_cs(styles.inputSection, inputSectionClassName)}>
                { icons && (
                    <div className={_cs(styles.icons, iconsContainerClassName)}>
                        { icons }
                    </div>
                )}
                <div className={_cs(styles.input, inputContainerClassName)}>
                    { input }
                </div>
                { (!readOnly && actions) && (
                    <div className={_cs(styles.actions, actionsContainerClassName)}>
                        { actions }
                    </div>
                )}
            </div>
            { hintAndError && (
                <div className={_cs(styles.hintAndError, hintAndErrorContainerClassName)}>
                    { hintAndError }
                </div>
            )}
        </div>
    );
}

export default InputContainer;
