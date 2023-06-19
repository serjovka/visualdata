import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import PieChartOption from "./PieChartOption";
import { basePieChartOptions } from "../../../constants";
import { motion, useDragControls } from "framer-motion"
import TopPanel from "../topPanel/TopPanel";
import DefaultOption from "../DefaultOPtion";

const PieChart = ({
    data,
    columns,
    appRef,
    closeFunction,
    zIndex,
    changeMaxCharZIndex,
    titleChart,
    format = ",", // a format specifier for values (in the label)
    strokeWidth = 1, // width of stroke separating wedges
    strokeLinejoin = "round", // line join of stroke separating wedges
    }) => {

    const svgRef = useRef(null);
    const [options, setOptions] = useState({...basePieChartOptions});
    const changeOptions = (newOptions) => {
        setOptions({...newOptions});
    };
    useEffect(() => {
        const stroke = options.innerRad > 0 ? "none" : "white" // stroke separating widths
        const outerRadius = Math.min(options.width, options.height) / 2;
        const labelRadius = (options.innerRad * 0.2 + outerRadius * 0.8);
        const padAngle = stroke === "none" ? 1 / outerRadius : 0;

        const N = d3.map(data, (d) => d[options.name]);
        const V = d3.map(data, (d) => d[options.value]);
        const I = d3.range(N.length).filter(i => !isNaN(V[i]));
        
        const names = new d3.InternSet(N);

        const colors = d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), names.size);
        const color = d3.scaleOrdinal(names, colors);

        const formatValue = d3.format(format);
        const title = i => `${N[i]}\n${formatValue(V[i])}`;

        const arcs = d3.pie().padAngle(padAngle).sort(null).value(i => V[i])(I);
        const arc = d3.arc().innerRadius(options.innerRad).outerRadius(outerRadius);
        const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

        const svg = d3
        .select(svgRef.current)
        .attr("width", options.width)
        .attr("height", options.height)
        .attr("viewBox", [-options.width / 2, -options.height / 2, options.width, options.height])
        .attr("style", `max-width: 100%; height: auto; height: intrinsic; background-color: ${options.color.backgroundColor};`);

        const everything = svg.selectAll("*");
        everything.remove();

        svg.append("g")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
        .selectAll("path")
        .data(arcs)
        .join("path")
        .attr("fill", d => color(N[d.data]))
        .attr("d", arc)
        .append("title")
        .text(d => title(d.data));

        svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .selectAll("tspan")
        .data(d => {
            const lines = `${title(d.data)}`.split(/\n/);
            return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
        }).join("tspan")
        .attr("fill", options.color.majorColor)
        .attr("x", 0)
        .attr("y", (_, i) => `${i * 1.1}em`)
        .attr("font-weight", (_, i) => i ? null : "bold")
        .text(d => d);
    }, [data, options])
    
    const [optionsPanelState, setOptionsPanelState] = useState(false);
    const dragControls = useDragControls();
    const dragStart = (e) => {
      e.preventDefault();
      changeMaxCharZIndex();
      dragControls.start(e)
    };    
    
    return (
      <motion.div onClick={changeMaxCharZIndex} drag dragConstraints={appRef} dragListener={false} dragControls={dragControls} whileDrag={{ scale: 0.95, opacity: 0.8 }} dragMomentum={false} dragElastic={0} className='chart-wrapper' style={{zIndex: zIndex}}>
        <TopPanel dragStart={dragStart} title={titleChart} closeFunction={closeFunction} optionsControl={() => setOptionsPanelState(!optionsPanelState)}/>
        <div className="line-chart">
          <svg ref={svgRef} />
          {optionsPanelState == 1 && 
          <DefaultOption options={options} changeOptions={changeOptions}>
            <PieChartOption columns={columns} options={options} changeOptions={changeOptions}/>
          </DefaultOption>}
        </div>
      </motion.div>
      );
};

export default PieChart;