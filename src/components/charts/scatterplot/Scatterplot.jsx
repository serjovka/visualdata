import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { baseScatterplotOptions } from "../../../constants";
import { motion, useDragControls } from "framer-motion"
import TopPanel from "../topPanel/TopPanel";
import DefaultOption from "../DefaultOPtion";
import ScatterplotOption from "./ScatterplotOption"

const Scatterplot = ({
    data,
    columns,
    appRef,
    closeFunction,
    zIndex,
    changeMaxCharZIndex,
    titleChart,
    title, // given d in data, returns the title
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    xType = d3.scaleLinear, // type of x-scale
    xDomain, // [xmin, xmax]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    xFormat, // a format specifier string for the x-axis
    yFormat, // a format specifier string for the y-axis
    stroke = "currentColor", // stroke color for the dots
    strokeWidth = 1.5, // stroke width for dots
    halo = "#fff", // color of label halo 
    haloWidth = 3 // padding around the labels
    }) => {

    const svgRef = useRef(null);
    const [options, setOptions] = useState({...baseScatterplotOptions});
    const changeOptions = (newOptions) => {
        setOptions({...newOptions});
    };
    useEffect(() => {
        const {width, height, xLabel, yLabel, r} = options;
        const fill = options.color.majorColor;
        
        const inset = r * 2;
        const insetTop = inset; // inset the default y-range
        const insetRight = inset; // inset the default x-range
        const insetBottom = inset; // inset the default y-range
        const insetLeft = inset; // inset the default x-range
        const xRange = [marginLeft + insetLeft, width - marginRight - insetRight]
        const yRange = [height - marginBottom - insetBottom, marginTop + insetTop]

        const X = d3.map(data, (d) => d[options.x]);
        const Y = d3.map(data, (d) => d[options.y]);
        const T = d3.map(data, (d) => d[options.title])
        const I = d3.range(X.length).filter(i => !isNaN(X[i]) && !isNaN(Y[i]));

        if (xDomain === undefined) xDomain = d3.extent(X);
        if (yDomain === undefined) yDomain = d3.extent(Y);

        const xScale = xType(xDomain, xRange);
        const yScale = yType(yDomain, yRange);
        const xAxis = d3.axisBottom(xScale).ticks(width / 80, xFormat);
        const yAxis = d3.axisLeft(yScale).ticks(height / 50, yFormat);

        const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", `max-width: 100%; height: auto; height: intrinsic; background-color: ${options.color.backgroundColor};`);
        
        const everything = svg.selectAll("*");
        everything.remove();

        svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .attr("style", `color: ${options.color.majorColor}`)
        .call(xAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("y2", marginTop + marginBottom - height)
            .attr("stroke-opacity", 0.2))
        .call(g => g.append("text")
            .attr("x", width)
            .attr("y", marginBottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(xLabel));

        svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("style", `color: ${options.color.majorColor}`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.2))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

        if (T) 
            svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .selectAll("text")
            .data(I)
            .join("text")
            .attr("dx", 7)
            .attr("dy", "0.35em")
            .attr("x", i => xScale(X[i]))
            .attr("y", i => yScale(Y[i]))
            .text(i => T[i])
            .call(text => text.clone(true))
            .attr("fill", "none")
            .attr("stroke", halo)
            .attr("stroke-width", haloWidth);

        svg.append("g")
        .attr("fill", fill)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .selectAll("circle")
        .data(I)
        .join("circle")
        .attr("cx", i => xScale(X[i]))
        .attr("cy", i => yScale(Y[i]))
        .attr("r", r);

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
            <ScatterplotOption columns={columns} options={options} changeOptions={changeOptions}/>
          </DefaultOption>}
        </div>
      </motion.div>
      );
};

export default Scatterplot;