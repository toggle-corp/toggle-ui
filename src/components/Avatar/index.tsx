import React, { useState, useEffect } from 'react';
import { _cs } from '@togglecorp/fujs';
import { MdPerson } from 'react-icons/md';

import styles from './styles.css';

export interface AvatarProps {
    className?: string;
    alt?: string;
    children?: React.ReactNode;
    src?: string;
    srcSet?: string;
    sizes?: string;
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
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

    return { loading, hasError };
}

function Avatar(props: AvatarProps) {
    const {
        alt,
        src,
        srcSet,
        sizes,
        imgProps,
        className: classNameFromProps,
        children,
    } = props;

    const { loading, hasError } = useImage({ src, srcSet });
    const hasImage = src || srcSet;
    const className = _cs(classNameFromProps, styles.avatar);

    if (hasImage && !hasError && !loading) {
        return (
            <div className={className}>
                <img
                    className={styles.image}
                    alt={alt}
                    src={src}
                    srcSet={srcSet}
                    sizes={sizes}
                    {...imgProps}
                />
            </div>
        );
    }
    if (children) {
        return (
            <div className={className}>
                {children}
            </div>
        );
    }
    if (alt && (!hasImage || loading)) {
        const initials = alt.match(/(\b\S)?/g)?.join('')?.match(/(^\S|\S$)?/g)?.join('');
        return (
            <div className={className}>
                <div className={styles.icon}>
                    {initials}
                </div>
            </div>
        );
    }
    return (
        <div className={className}>
            <div className={styles.icon}>
                <MdPerson />
            </div>
        </div>
    );
}
export default Avatar;
