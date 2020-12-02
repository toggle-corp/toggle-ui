import React, { useMemo } from 'react';

import { pie, arc } from 'd3-shape';

import styles from './styles.css';

export interface PieChartProps<K> {
    width: number;
    height: number;
    innerRadius: number;
    data: K[];
    valueSelector: (v: K) => number;
    labelSelector: (v: K) => string;
    colorSelector?: (v: K) => string;
    showLabels?: boolean;
}

const colorAccent = getComputedStyle(document.documentElement)
    .getPropertyValue('--tui-color-accent')
    .trim();

const defaultColorSelector = () => colorAccent;

function PieChart<K>(props: PieChartProps<K>) {
    const {
        width,
        height,
        data,
        valueSelector,
        labelSelector,
        colorSelector = defaultColorSelector,
        innerRadius = 0,
        showLabels = true,
    } = props;

    const pieGenerator = useMemo(
        () => pie()
            .value(valueSelector),
        [valueSelector],
    );

    const arcGenerator = useMemo(
        () => arc()
            .innerRadius(innerRadius)
            .outerRadius(Math.min(width, height) / 2 - 1),
        [innerRadius, width, height],
    );

    const arcs = pieGenerator(data);

    return (
        <svg
            width={width}
            height={height}
        >
            <g
                transform={`translate(${width / 2}, ${height / 2})`}
            >
                <g>
                    {arcs.map((d) => (
                        <path
                            key={labelSelector(d.data)}
                            d={arcGenerator(d)}
                            fill={colorSelector(d.data)}
                        >
                            <title>{labelSelector(d.data)}</title>
                        </path>
                    ))}
                </g>
                { showLabels && (
                    <g>
                        {arcs.map((d) => (
                            <text
                                className={styles.textLabel}
                                textAnchor="middle"
                                transform={`translate(${arcGenerator.centroid(d)})`}
                            >
                                <tspan>
                                    {labelSelector(d.data)}
                                </tspan>
                            </text>
                        ))}
                    </g>
                )}
            </g>
        </svg>
    );
}

export default PieChart;
