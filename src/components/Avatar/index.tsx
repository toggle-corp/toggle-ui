import React, { useState, useEffect } from 'react';
import {
    _cs,
    getHexFromString,
    getColorOnBgColor,
} from '@togglecorp/fujs';

import styles from './styles.css';

function getInitials(name: string) {
    if (name.length <= 0) {
        return '?';
    }
    const letters = name.trim().split(/\s/).map((item) => item[0]);
    return (
        letters.length <= 1
            ? letters[0]
            : `${letters[0]}${letters[letters.length - 1]}`
    );
}

interface ImageLoadProps {
    src?: string;
    srcSet?: string;
}

function useImage(props: ImageLoadProps) {
    const {
        src,
        srcSet,
    } = props;

    const hasImage = src || srcSet;

    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setLoading(false);
        setHasError(false);

        const image = new Image();
        if (src) {
            image.src = src;
        }
        if (srcSet) {
            image.srcset = srcSet;
        }

        const handleLoad = () => {
            setLoading(false);
            setHasError(false);
        };

        const handleError = () => {
            setLoading(false);
            setHasError(true);
        };

        image.onload = handleLoad;
        image.onerror = handleError;

        return () => {
            image.removeEventListener('error', handleError);
            image.removeEventListener('load', handleLoad);
        };
    }, [src, srcSet]);

    return { isLoading: loading, hasError, hasImage };
}

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    alt: string;
}

function Avatar(props: AvatarProps) {
    const {
        className: classNameFromProps,
        alt,
        src,
        srcSet,
        ...otherProps
    } = props;

    const { isLoading, hasError, hasImage } = useImage({ src, srcSet });

    const className = _cs(classNameFromProps, styles.avatar);

    if (!hasImage || hasError || isLoading) {
        const initials = getInitials(alt);
        const backgroundColor = getHexFromString(alt);
        const textColor = getColorOnBgColor(backgroundColor);

        return (
            <div className={className}>
                <div
                    className={styles.icon}
                    style={{
                        backgroundColor,
                        color: textColor,
                    }}
                >
                    {initials}
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <img
                className={styles.image}
                alt={alt}
                src={src}
                srcSet={srcSet}
                {...otherProps}
            />
        </div>
    );
}
export default Avatar;
