import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import CandlestickOption from "./CandlestickOption";
import { candleStickChartOptions } from "../../../constants";
import { motion, useDragControls } from "framer-motion"
import TopPanel from "../topPanel/TopPanel";
import DefaultOption from "../DefaultOPtion";

const CandlestickChart = ({
    data,
    columns,
    appRef,
    closeFunction,
    zIndex,
    changeMaxCharZIndex,
    titleChart,
    title, // given d in data, returns the title text
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    xDomain, // array of x-values (defaults to every weekday)
    xPadding = 0.2,
    xTicks, // array of x-values to label (defaults to every other Monday)
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    xFormat = "%b %-d", // a format specifier for the date on the x-axis
    yFormat = "~f", // a format specifier for the value on the y-axis
    stroke = "currentColor", // stroke color for the daily rule
    strokeLinecap = "round", // stroke line cap for the rules
    colors = ["#4daf4a", "#999999", "#e41a1c"] // [up, no change, down]
}) => {
    const svgRef = useRef(null);
    const [options, setOptions] = useState({...candleStickChartOptions});
    const changeOptions = (newOptions) => {
        setOptions({...newOptions});
    };
    const [optionsPanelState, setOptionsPanelState] = useState(false);
    const dragControls = useDragControls();
    const dragStart = (e) => {
        e.preventDefault();
        changeMaxCharZIndex();
        dragControls.start(e)
    }; 

    useEffect(() => {
        const X = d3.map(data, (d) => new Date(d[options.date]));
        const Yo = d3.map(data, (d) => d[options.open]);
        const Yc = d3.map(data, (d) => d[options.close]);
        const Yh = d3.map(data, (d) => d[options.high]);
        const Yl = d3.map(data, (d) => d[options.low]);
        const I = d3.range(X.length);
        //console.log(X, Yo, Yc, Yh, Yl, I);

        const weeks = (start, stop, stride) => d3.utcMonday.every(stride).range(start, +stop + 1);
        const weekdays = (start, stop) => d3.utcDays(start, +stop + 1).filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6);
    
        if (xDomain === undefined) xDomain = weekdays(d3.min(X), d3.max(X));
        if (yDomain === undefined) yDomain = [d3.min(Yl), d3.max(Yh)];
        if (xTicks === undefined) xTicks = weeks(d3.min(xDomain), d3.max(xDomain), 2);

        const xScale = d3.scaleBand(xDomain, [marginLeft, options.width - marginRight]).padding(xPadding);
        const yScale = yType(yDomain, [options.height - marginBottom, marginTop]);
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.utcFormat(xFormat)).tickValues(xTicks);
        const yAxis = d3.axisLeft(yScale).ticks(options.height / 40, yFormat);

        title = i => `${X[i]?.toLocaleDateString()}\nOpen: ${Yo[i]}\nClose: ${Yc[i]}\nLow: ${Yl[i]}\nHigh: ${Yh[i]}`; 

        const svg = d3
        .select(svgRef.current)
        .attr("width", options.width)
        .attr("height", options.height)
        .attr("viewBox", [0, 0, options.width, options.height])
        .attr("style", `max-width: 100%; height: auto; height: intrinsic; background-color: ${options.color.backgroundColor};`);

        const everything = svg.selectAll("*");
        everything.remove();

        svg.append("g")
        .attr("transform", `translate(0,${options.height - marginBottom})`)
        .attr("style", `color: ${options.color.majorColor}`)
        .call(xAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
        .attr("x", options.width)
        .attr("y", marginBottom)
        .attr("fill", options.color.majorColor)
        .attr("text-anchor", "end")
        .text(options.xLabel));;

        svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .attr("style", `color: ${options.color.majorColor}`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("stroke-opacity", 0.3)
            .attr("x2", options.width - marginLeft - marginRight))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", options.color.majorColor)
            .attr("text-anchor", "start")
            .text(options.yLabel));


        const g = svg.append("g")
        .attr("stroke", stroke)
        .attr("style", `color: ${options.color.majorColor}`)
        .attr("stroke-linecap", strokeLinecap)
        .selectAll("g")
        .data(I)
        .join("g")
        .attr("transform", i => `translate(${xScale(X[i])},0)`);
        
        g.append("line")
            .attr("y1", i => yScale(Yl[i]))
            .attr("y2", i => yScale(Yh[i]));
      
        g.append("line")
            .attr("y1", i => yScale(Yo[i]))
            .attr("y2", i => yScale(Yc[i]))
            .attr("stroke-width", xScale.bandwidth())
            .attr("stroke", i => colors[1 + Math.sign(Yo[i] - Yc[i])]);
      
        if (title) g.append("title")
            .text(title);
            
    },[data, options]);

    return(
        <motion.div onClick={changeMaxCharZIndex} drag dragConstraints={appRef} dragListener={false} dragControls={dragControls} whileDrag={{ scale: 0.95, opacity: 0.8 }} dragMomentum={false} dragElastic={0} className='chart-wrapper' style={{zIndex: zIndex}}>
            <TopPanel dragStart={dragStart} title={titleChart} closeFunction={closeFunction} optionsControl={() => setOptionsPanelState(!optionsPanelState)}/>
            <div className="line-chart">
                <svg ref={svgRef} />
                {optionsPanelState == 1 && 
                <DefaultOption options={options} changeOptions={changeOptions}>
                    <CandlestickOption columns={columns} options={options} changeOptions={changeOptions}/>
                </DefaultOption>}
            </div>
        </motion.div>
    );
};

export default CandlestickChart;