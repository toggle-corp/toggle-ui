import React from 'react';
import { _cs } from '@togglecorp/fujs';

import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';
import styles from './styles.css';

export interface InputContainerProps extends Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'label'>{
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
    * Gets called when the content of input changes
    */
    onChange?: (name: string | undefined, e: React.FormEvent<HTMLInputElement>) => void;
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
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);
    return (
        <div
            className={_cs(
                className,
                styles.inputContainer,
                themeClassName,
                disabled && styles.disabled,
            )}
        >
            { label && (
                <div className={styles.inputLabel}>
                    { label }
                </div>
            )}
            <div className={styles.inputSection}>
                { icons && (
                    <div className={styles.icons}>
                        { icons }
                    </div>
                )}
                <div className={styles.input}>
                    { input }
                </div>
                { actions && (
                    <div className={styles.actions}>
                        { actions }
                    </div>
                )}
            </div>
            { hintAndError && (
                <div className={styles.hintAndError}>
                    { hintAndError }
                </div>
            )}
        </div>
    );
}

export default InputContainer;