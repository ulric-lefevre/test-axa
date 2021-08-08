import { useEffect, useRef } from "react";
import * as d3 from "d3";

import { Stock } from "../../types/Stock";
import { StockDate } from "../../types/StockDate";

import "./Chart.scss";

type Props = {
  data: Stock[];
};

const parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S.%fZ");

const Chart = ({ data }: Props) => {
  const d3Chart = useRef(null);

  useEffect(() => {
    const drawChart = () => {
      d3.selectAll("svg > *").remove();

      const stocksByDate: StockDate[] = data.map((item: Stock) => ({
        date: parseDate(item.timestamp) || new Date(),
        stocks: parseInt(item.stocks),
      }));

      const margin = { top: 50, right: 30, bottom: 30, left: 30 };
      const width =
        parseInt(d3.select("#chart").style("width")) -
        margin.left -
        margin.right;
      const height =
        parseInt(d3.select("#chart").style("height")) -
        margin.top -
        margin.bottom;

      const svg = d3
        .select(d3Chart.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const x = d3
        .scaleTime()
        .domain(
          d3.extent(
            stocksByDate.map(({ date }) => new Date(date.toDateString()))
          ) as Date[]
        )
        .range([0, width]);

      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      const max = d3.max(stocksByDate.map((items) => items.stocks)) as number;

      const y = d3.scaleLinear().domain([0, max]).range([height, 0]);

      svg.append("g").call(d3.axisLeft(y));

      svg
        .append("path")
        .datum(stocksByDate)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", "1")
        .attr(
          "d",
          d3
            .line<StockDate>()
            .x((stock) => x(new Date(stock.date.toDateString())))
            .y((stock) => y(stock.stocks))
        );

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 0 - margin.top / 2)
        .attr("text-anchor", "middle")
        .style("fill", "#fff")
        .text("Evolution of stocks");
    };
    drawChart();
  });

  return (
    <div id="chart">
      <svg ref={d3Chart} />
    </div>
  );
};

export default Chart;
