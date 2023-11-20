import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const width = 928;
      const height = 500;
      const marginTop = 20;
      const marginRight = 0;
      const marginBottom = 30;
      const marginLeft = 40;

      const svg = d3.select(d3Container.current);
      svg.selectAll('*').remove();

      const x = d3
        .scaleBand()
        .domain(d3.sort(data, (d) => -d.frequency).map((d) => d.letter))
        .range([marginLeft, width - marginRight])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.frequency)])
        .nice()
        .range([height - marginBottom, marginTop]);

      svg
        .append('g')
        .attr('class', 'bars')
        .attr('fill', 'steelblue')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d) => x(d.letter))
        .attr('y', (d) => y(d.frequency))
        .attr('height', (d) => y(0) - y(d.frequency))
        .attr('width', x.bandwidth());

      svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x));

      svg
        .append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call((g) => g.select('.domain').remove());
    }
  }, [data]);

  return <svg ref={d3Container} width={928} height={500} />;
}

export default BarChart;
