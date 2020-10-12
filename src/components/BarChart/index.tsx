import React, { useMemo } from 'react';

import { scaleBand, scaleLinear } from 'd3-scale';

import styles from './styles.css';

// FIXME: Remove all hardcoded values

interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface BarChartProps<K> {
    width: number;
    height: number;
    data: K[];
    valueSelector: (v: K) => number;
    labelSelector: (v: K) => string;
    colorSelector?: (v: K) => string;
    margin?: Margin;
}

const colorAccent = getComputedStyle(document.documentElement)
    .getPropertyValue('--tui-color-accent')
    .trim();

const defaultColorSelector = () => colorAccent;
const defaultMargin = {
    top: 10,
    right: 0,
    bottom: 32,
    left: 48,
};

function BarChart<K>(props: BarChartProps<K>) {
    const {
        width,
        height,
        data,
        valueSelector,
        labelSelector,
        colorSelector = defaultColorSelector,
        margin = defaultMargin,
    } = props;

    const {
        top,
        right,
        bottom,
        left,
    } = margin;

    const x = useMemo(
        () => scaleBand()
            .domain(data.map((d) => labelSelector(d)))
            .range([left, width - right])
            .padding(0.1),
        [data, labelSelector, left, right, width],
    );

    const y = useMemo(
        () => {
            const maxValue = Math.max(...data.map(valueSelector)) ?? 0;
            return scaleLinear()
                .domain([0, maxValue])
                .nice()
                .range([height - bottom, top]);
        },
        [data, valueSelector, bottom, top, height],
    );

    const xAxisLabels = data.map((d) => (
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
    ));

    const ticks = y.ticks(height / 50);
    const yAxisLabels = ticks.map((d:number) => (
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

    return (
        <svg
            width={width}
            height={height}
        >
            {data.map((d) => {
                const xHeight = (y(0) ?? 0) - (y(valueSelector(d)) ?? 0);
                return (
                    <g
                        key={`bar-${labelSelector(d)}`}
                        fill={colorSelector(d)}
                    >
                        <rect
                            y={y(valueSelector(d))}
                            x={x(labelSelector(d))}
                            height={xHeight}
                            width={x.bandwidth()}
                        />
                    </g>
                );
            })}
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

export default BarChart;
