import React, { useRef, useEffect } from 'react';
import { _cs } from '@togglecorp/fujs';

import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
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
    colorSelector: (v: K) => string;
    margin: Margin;
}

const defaultProps = {
    colorSelector: () => '#b4d9cc',
    margin: { top: 30, right: 0, bottom: 40, left: 40 },
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
            top,
            right,
            bottom,
            left,
        },
    }  = props;

    const svgRef = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const x = scaleBand()
            .domain(data.map(d => labelSelector(d)))
            .range([left, width - right])
            .padding(0.1);

        const y = scaleLinear()
            .domain([0, max(data, valueSelector)])
            .nice()
            .range([height - bottom, top]);

        const xAxis = axisBottom(x);

        const yAxis = axisLeft(y);


        svg
            .select('.x-axis')
            .attr('transform', `translate(0, ${height - bottom })`)
            .call(xAxis);

        svg
            .select('.y-axis')
            .attr('transform', `translate(${left}, 0)`)
            .call(yAxis);

        svg
            .append('g')
            .attr('fill', (d: K) => colorSelector(d))
            .selectAll('.bar')
            .data(data)
            .join('rect')
            .attr('x', (d: K) => x(labelSelector(d)))
            .attr('y', (d: K) => y(valueSelector(d)))
            .attr('height', (d: K) => y(0) - y(valueSelector(d)))
            .attr('width', x.bandwidth());
    }, [data]);

    return (
        <svg ref={svgRef}>
            <g className={_cs(styles.xAxis, 'x-axis')} />
            <g className={_cs(styles.yAxis, 'y-axis')} />
        </svg>
    );
}

BarChart.defaultProps = defaultProps;

export default BarChart;
