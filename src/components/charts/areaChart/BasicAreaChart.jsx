import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import BasicLineChartOption from "../lineChart/BasicLineChartOption";
import { baseLineChartOptions } from "../../../constants";
import { motion, useDragControls } from "framer-motion"
import { testDate } from "../lineChart/BasicLineChart";
import TopPanel from "../topPanel/TopPanel";
import DefaultOption from "../DefaultOPtion";

const BasicAreaChart = ({
    data,
    columns,
    appRef,
    closeFunction,
    zIndex,
    changeMaxCharZIndex,
    title,
    defined, // for gaps in data
    curve = d3.curveLinear, // method of interpolation between points
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    xType = d3.scaleLinear, // the x-scale type
    xDomain, // [xmin, xmax] 
    yType = d3.scaleLinear, // the y-scale type
    yDomain, // [ymin, ymax]
    yFormat, // a format specifier string for the y-axis
    }) => {

    const svgRef = useRef(null);
    const [options, setOptions] = useState({...baseLineChartOptions});
    const changeOptions = (newOptions) => {
        setOptions({...newOptions});
    };
    useEffect(() => {
        // Compute values.
        let X = [];
        if(data.length > 0 && testDate(data?.[0]?.[options.x])){
          X = d3.map(data, (d) => new Date(d[options.x]));
          xType = d3.scaleUtc;  
        }
        else{
          X = d3.map(data, (d) => d[options.x]);
          xType = d3.scaleLinear;
        }
        const Y = d3.map(data, (d) => d[options.y]);
        const I = d3.range(X.length);
        //const minValue = d3.min(Y) < 0 ? d3.min(Y) : 0; experement

        if (defined === undefined) 
            defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
        const D = d3.map(data, defined);
        // Compute default domains.
        if (xDomain === undefined) 
            xDomain = d3.extent(X);
        if (yDomain === undefined) 
            yDomain = [d3.min(Y), d3.max(Y)];
          // Construct scales and axes.
        const xScale = xType(xDomain, [marginLeft, options.width - marginRight]);
        const yScale = yType(yDomain, [options.height - marginBottom, marginTop]);
        const xAxis = d3.axisBottom(xScale).ticks(options.width / 80).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(options.height / 40, yFormat);
        
        // Construct a area generator.
        const area = d3.area()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y0(yScale(d3.min(Y)))
        .y1(i => yScale(Y[i]));
        
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
            .attr("stroke-width", options.strokeWidth)
            .attr("x2", options.width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.2))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", options.color.majorColor)
            .attr("text-anchor", "start")
            .text(options.yLabel));
        
        svg.append("path")
        .attr("fill", options.color.majorColor)
        .attr("d", area(I))
        .attr("fill-opacity", options.strokeOpacity);

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
        <TopPanel dragStart={dragStart} title={title} closeFunction={closeFunction} optionsControl={() => setOptionsPanelState(!optionsPanelState)}/>
        <div className="line-chart">
          <svg ref={svgRef} />
          {optionsPanelState == 1 && 
          <DefaultOption options={options} changeOptions={changeOptions}>
            <BasicLineChartOption columns={columns} options={options} changeOptions={changeOptions}/>
          </DefaultOption>}
        </div>
      </motion.div>
      );
};

export default BasicAreaChart;