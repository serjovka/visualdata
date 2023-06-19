import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import BasicBarChartOption from "./BasicBarChartOption";
import { baseBarChartOptions } from "../../../constants";
import { motion, useDragControls } from "framer-motion";
import TopPanel from "../topPanel/TopPanel";
import DefaultOption from "../DefaultOPtion";

const BasicBarChart = ({
    data,
    columns,
    appRef,
    closeFunction,
    zIndex,
    changeMaxCharZIndex,
    titleChart,
    title,
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    xDomain, // [xmin, xmax]
    yType = d3.scaleLinear, // the y-scale type
    yDomain, // [ymin, ymax]
    yFormat, // a format specifier string for the y-axis
    }) => {

    const svgRef = useRef(null);
    const [options, setOptions] = useState({...baseBarChartOptions});
    const changeOptions = (newOptions) => {
        setOptions({...newOptions});
    };

    useEffect(() => {
        const X = d3.map(data, (d) => d[options.x]);
        const Y = d3.map(data, (d) => d[options.y]);
        
        if (xDomain === undefined) 
            xDomain = X;
        if (yDomain === undefined) 
            yDomain = [0, d3.max(Y)]; 
        xDomain = new d3.InternSet(xDomain);

        const I = d3.range(X.length).filter(i => xDomain.has(X[i]));

        const xScale = d3.scaleBand(xDomain, [marginLeft, options.width - marginRight]).padding(options.xPadding);
        const yScale = yType(yDomain, [options.height - marginBottom, marginTop]);
        const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(options.height / 40, yFormat);
        
        // Compute titles.
        title = i => `${X[i]}\n${Y[i]}`;

        const svg = d3
        .select(svgRef.current)
        .attr("width", options.width)
        .attr("height", options.height)
        .attr("viewBox", [0, 0, options.width, options.height])
        .attr("style", `max-width: 100%; height: auto; height: intrinsic; background-color: ${options.color.backgroundColor};`);

        const everything = svg.selectAll("*");
        everything.remove();

        svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("style", `color: ${options.color.majorColor}`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", options.width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.2))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", options.color.majorColor)
            .attr("text-anchor", "start")
            .text(options.yLabel));

        const bar = svg.append("g")
            .attr("fill", options.color.majorColor)
            .attr("fill-opacity", options.strokeOpacity)
            .selectAll("rect")
            .data(I)
            .join("rect")
            .attr("x", i => xScale(X[i]))
            .attr("y", i => yScale(Y[i]))
            .attr("height", i => yScale(0) - yScale(Y[i]))
            .attr("width", xScale.bandwidth());
        
        if (title) bar.append("title")
            .attr("fill", options.color.majorColor)
            .text(title);

        svg.append("g")
        .attr("transform", `translate(0,${options.height - marginBottom})`)
        .attr("style", `color: ${options.color.majorColor}`)
        .call(xAxis)
        .call(g => g.append("text")
        .attr("x", options.width)
        .attr("y", marginBottom)
        .attr("fill", options.color.majorColor)
        .attr("text-anchor", "end")
        .text(options.xLabel));

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
                    <BasicBarChartOption columns={columns} options={options} changeOptions={changeOptions}/>
                </DefaultOption>}
            </div>
        </motion.div>
    );    
};

export default BasicBarChart;