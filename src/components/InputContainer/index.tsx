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
    * Style for the hint container
    */
    hintContainerClassName?: string;
    /**
    * Style for the error container
    */
    errorContainerClassName?: string;
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
    * Input hint
    */
    hint?: React.ReactNode;

    /**
    * Input error
    */
    error?: React.ReactNode;

    /**
     * Is input disabled?
     */
    disabled?: boolean;

    /**
     * Is input readonly?
     */
    readOnly?: boolean;

    inputSectionRef?: React.RefObject<HTMLDivElement>;
}

/**
 * Common container for input elements
 */
const InputContainer = React.forwardRef<HTMLDivElement, InputContainerProps>(
    ({
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
        hintContainerClassName,
        errorContainerClassName,
        disabled,
        readOnly,
        hint,
        error,
        inputSectionRef,
    }, ref) => {
        const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);
        return (
            <div
                ref={ref}
                className={_cs(
                    className,
                    styles.inputContainer,
                    themeClassName,
                    disabled && styles.disabled,
                    readOnly && styles.readOnly,
                    !!error && styles.errored,
                )}
            >
                { label && (
                    <div className={_cs(styles.inputLabel, labelContainerClassName)}>
                        { label }
                    </div>
                )}
                <div
                    ref={inputSectionRef}
                    className={_cs(styles.inputSection, inputSectionClassName)}
                >
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
                { error && (
                    <div className={_cs(styles.error, errorContainerClassName)}>
                        { error }
                    </div>
                )}
                { !error && hint && (
                    <div className={_cs(styles.hint, hintContainerClassName)}>
                        { hint }
                    </div>
                )}
            </div>
        );
    },
);

export default InputContainer;
