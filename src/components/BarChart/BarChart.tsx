import React, {Component, useEffect, useRef} from 'react';
import * as d3 from 'd3';

type Props = {
    id: number
}

function BarChart({ id }: Props) {

    const intialised = useRef(false);

    const drawChart = () => {
        const data:  Array<number> = [12, 5, 6, 6, 9, 10];

        const svg = d3.select("body").append("svg").attr("width", 700).attr("width", 700).attr("height", 300);
        
        svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => 300 - 10 * d)
        .attr("width", 65)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green");

        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => d)
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => 300 - (10 * d) - 3)
    };

    useEffect(()=> {
        if(!intialised.current) {
            intialised.current = true;
            drawChart()
        }
    }, []);

    return (
        <div id={"#" + id}></div>
    )
}

export default BarChart;