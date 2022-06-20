import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { IoMdClose } from 'react-icons/io';

import Button from '../Button';
import BodyBackdrop from '../BodyBackdrop';
import { UiMode } from '../ThemeContext';
import { useThemeClassName } from '../../hooks';

import styles from './styles.css';

type SizeTypes = 'extraSmall' | 'small' | 'medium' | 'large' | 'cover';

const sizeToStyleMap: {
    [key in SizeTypes]: string;
} = {
    extraSmall: styles.extraSmallSize,
    small: styles.smallSize,
    medium: styles.mediumSize,
    large: styles.largeSize,
    cover: styles.coverSize,
};
export interface ModalProps {
    children?: React.ReactNode;
    heading?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    bodyClassName?: string;
    headingClassName?: string;
    footerClassName?: string;
    size?: SizeTypes;
    freeHeight?: boolean;
    onClose: () => void;
    uiMode?: UiMode;
    closeButtonHidden?: boolean;
}

function Modal(props: ModalProps) {
    const {
        heading,
        children,
        footer,

        className,
        headingClassName,
        bodyClassName,
        footerClassName,
        size = 'medium',
        freeHeight,

        onClose,
        uiMode,

        closeButtonHidden,
    } = props;

    const themeClassName = useThemeClassName(uiMode, styles.light, styles.dark);

    return (
        <BodyBackdrop
            uiMode={uiMode}
        >
            <div
                className={_cs(
                    className,
                    styles.modal,
                    themeClassName,
                    sizeToStyleMap[size],
                    freeHeight && styles.freeHeight,
                )}
            >
                {heading !== null && (
                    <div className={_cs(styles.modalHeader, headingClassName)}>
                        <h4 className={styles.titleContainer}>
                            {heading}
                        </h4>
                        {!closeButtonHidden && (
                            <div className={styles.actions}>
                                <Button
                                    className={styles.closeButton}
                                    onClick={onClose}
                                    transparent
                                    name="Close"
                                    uiMode={uiMode}
                                >
                                    <IoMdClose />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                <div className={_cs(styles.modalBody, bodyClassName)}>
                    {children}
                </div>
                {footer && (
                    <div className={_cs(styles.modalFooter, footerClassName)}>
                        {footer}
                    </div>
                )}
            </div>
        </BodyBackdrop>
    );
}

export default Modal;
