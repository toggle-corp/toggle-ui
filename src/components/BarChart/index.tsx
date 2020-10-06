import React, { useMemo } from 'react';

import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

import styles from './styles.css';

interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
interface Props<K> {
    width: number;
    height: number;
    data: K[];
    valueSelector: (v: K) => number;
    labelSelector: (v: K) => string;
    colorSelector?: (v: K) => string;
    margin?: Margin;
}

const defaultProps = {
    colorSelector: () => '#b4d9cc',
    margin: { top: 30, right: 0, bottom: 40, left: 50 },
};

function BarChart<K>(props: Props<K>) {
    const {
        width,
        height,
        data,
        valueSelector,
        labelSelector,
        colorSelector,
        margin: {
            top = 0,
            right = 0,
            bottom = 0,
            left = 0,
        } = {},
    } = props;

    const x = useMemo(() => scaleBand()
        .domain(data.map((d) => labelSelector(d)))
        .range([left, width - right])
        .padding(0.1),
    [data, labelSelector, left, right, width]);

    const y = useMemo(() => scaleLinear()
        .domain([0, max(data, valueSelector)])
        .nice()
        .range([height - bottom, top]),
    [data, valueSelector, bottom, top, height]);

    const bars = useMemo(() => data.map((d) => (
        <g
            key={`bar-${labelSelector(d)}`}
            fill={colorSelector ? colorSelector(d) : '#b4d9cc'}
        >
            <rect
                y={y(valueSelector(d))}
                x={x(labelSelector(d))}
                height={y(0) - y(valueSelector(d))}
                width={x.bandwidth()}
            />
        </g>
    )),
    [data, valueSelector, labelSelector, colorSelector, x, y]);

    const xAxisLabels = useMemo(() => data.map((d) => (
        <g
            key={`x-axis-label-${labelSelector(d)}`}
            transform={`translate(${x(labelSelector(d))}, ${y(0)})`}
        >
            <text
                textAnchor="middle"
                className={styles.label}
                x={x.bandwidth() / 2}
                y={10}
                dy="0.75em"
            >
                {labelSelector(d)}
            </text>
        </g>
    )),
    [data, labelSelector, x, y]);

    const yAxisLabels = useMemo(() => {
        const ticks = y.ticks(height / 50);
        return ticks.map((d) => (
            <g
                key={`y-axis-label-${d}`}
                transform={`translate(${left}, ${y(d)})`}
            >
                <text
                    textAnchor="end"
                    className={styles.label}
                    y={0}
                    x={-5}
                    dy="0.32em"
                >
                    {d}
                </text>
            </g>
        ));
    }, [y, left, height]);

    return (
        <svg
            width={width}
            height={height}
        >
            {bars}
            <g
                key="x-axis"
            >
                <line
                    className={styles.line}
                    x1={left}
                    y1={y(0)}
                    x2={width}
                    y2={y(0)}
                />
                {xAxisLabels}
            </g>
            <g
                key="y-axis"
            >
                <line
                    className={styles.line}
                    x1={left}
                    y1={y(0)}
                    x2={left}
                    y2={-height}
                />
                {yAxisLabels}
            </g>
        </svg>
    );
}

BarChart.defaultProps = defaultProps;

export default BarChart;
