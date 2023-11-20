import "./SimpleBarChart.css";
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const SimpleBarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const w = 400;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "white")
      .style("margin-top", "50px");

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .rangeRound([0, w])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([h, 0]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => h - yScale(d.value))
      .attr("fill", "steelblue");

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("g").attr("transform", `translate(0, ${h})`).call(xAxis);

    svg.append("g").call(yAxis);
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default SimpleBarChart;
