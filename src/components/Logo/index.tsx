import React from 'react';
import { _cs } from '@togglecorp/fujs';

import Svg from '../Svg';
import helixSvg from './images/helix-icon.svg';
import styles from './styles.css';

export type SizeTypes = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
export type LogoTypes = 'default';

const sizeToStyleMap: {
    [key in SizeTypes]: string;
} = {
    extraSmall: styles.extraSmall,
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
    extraLarge: styles.extraLarge,
};

const variantToSvgMap: {
    [key in LogoTypes]: string;
} = {
    default: helixSvg,
};

export interface Props {
    className?: string;
    variant?: LogoTypes;
    size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
}

function Logo(props: Props) {
    const {
        className,
        variant = 'default',
        size = 'small',
    } = props;

    return (
        <Svg
            className={_cs(
                className,
                styles.logoStyles,
                sizeToStyleMap[size],
            )}
            src={variantToSvgMap[variant]}
        />
    );
}

export default Logo;
