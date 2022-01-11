import React, { useState, useEffect } from 'react';
import { randomString, _cs } from '@togglecorp/fujs';
import { SVGInjector } from '@tanem/svg-injector';

import styles from './styles.css';

interface Props {
    className?: string;
    src: string;
}

function Svg(props: Props) {
    const {
        className,
        src,
    } = props;

    const [id] = useState(() => `svg-${randomString(16)}`);
    const [svgId] = useState(() => `svg-${randomString(16)}`);

    useEffect(() => {
        const div = document.getElementById(id);
        if (div) {
            const svg = document.createElement('svg');
            svg.setAttribute('id', svgId);
            svg.setAttribute('class', styles.svg);
            svg.setAttribute('data-src', src);
            div.appendChild(svg);

            SVGInjector(svg);
        }

        return () => {
            const mySvg = document.getElementById(svgId);
            if (mySvg) {
                mySvg.remove();
            }
        };
    }, [id, svgId, src]);

    return (
        <div
            id={id}
            className={_cs(className, styles.svgContainer)}
        />
    );
}

export default Svg;
