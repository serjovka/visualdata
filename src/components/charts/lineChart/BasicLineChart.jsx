import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import BasicLineChartOption from "./BasicLineChartOption";
import { baseLineChartOptions } from "../../../constants";
import { motion, useDragControls } from "framer-motion"
import TopPanel from "../topPanel/TopPanel";
import DefaultOption from "../DefaultOPtion";

export function testDate(str) {
  str = '' + str;
  var t = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(t === null)
    return false;
  var y = +t[1], m = +t[2], d = +t[3];
  // Below should be a more acurate algorithm
  if(m >= 1 && m <= 12 && d >= 1 && d <= 31) {
    return true;  
  }

  return false;
}

const BasicLineChart = ({
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
    strokeLinecap = "round", // stroke line cap of the line
    strokeLinejoin = "round", // stroke line join of the line
    }) => {

    const svgRef = useRef(null);
    const [options, setOptions] = useState({...baseLineChartOptions});
    const changeOptions = (newOptions) => {
        setOptions({...newOptions});
    };
    const [zoomState, setZoomState] = useState(null);

    useEffect(() => {
        let xAccessor;
        if(data.length > 0 && testDate(data?.[0]?.[options.x])){
          xAccessor = (d) => new Date(d[options.x]);
          xType = d3.scaleUtc;  
        }
        else{
          xAccessor =  (d) => d[options.x];
          xType = d3.scaleLinear;
        }
        const yAccessor = (d) => d[options.y];

        const X = d3.map(data, xAccessor);
        const Y = d3.map(data, yAccessor);
        const I = d3.range(X.length);
        
        if (defined === undefined) 
            defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
        const D = d3.map(data, defined);
       
        if (xDomain === undefined) 
            xDomain = d3.extent(X);
        if (yDomain === undefined) 
            yDomain = [d3.min(Y), d3.max(Y)];

        let xScale = xType(xDomain, [marginLeft, options.width - marginRight]);
        let yScale = yType(yDomain, [options.height - marginBottom, marginTop]);

        const xAxis = d3.axisBottom(xScale).ticks(options.width / 80).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(options.height / 40, yFormat);
        
        if(zoomState !== null){
          const newXScale = zoomState.rescaleX(xScale);
          const newYScale = zoomState.rescaleY(yScale);
          xAxis.scale(newXScale);
          yAxis.scale(newYScale);
          xScale = newXScale;
          yScale = newYScale;
        }

        var bisect = d3.bisector(xAccessor).left;
        
        // Construct a line generator.
        const line = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));

        const svg = d3
        .select(svgRef.current)
        .attr("width", options.width)
        .attr("height", options.height)
        .attr("viewBox", [0, 0, options.width, options.height])
        .attr("style", `max-width: 100%; height: auto; height: intrinsic; background-color: ${options.color.backgroundColor};`);

        const everything = svg.selectAll("*");
        everything.remove();

        const zoom = d3.zoom() 
        .scaleExtent([0.5, 10])
        .translateExtent([[marginLeft, marginTop], [options.width - marginLeft - marginRight, options.height - marginTop - marginBottom]])
        .extent([[marginLeft + 100, marginTop + 100], [options.width - marginLeft - marginRight, options.height - marginTop - marginBottom]])
        .on("zoom", (e) => {
          setZoomState(e.transform);
        });

        svg.append("g")
        .attr("transform", `translate(0,${options.height - marginBottom})`)
        .attr("style", `color: ${options.color.majorColor}`)
        .call(xAxis)
        .call(g => g.append("text")
        .attr("x", options.width)
        .attr("y", marginBottom)
        .attr("fill", options.color.minorColor)
        .attr("text-anchor", "end")
        .text(options.xLabel));

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
        .attr("fill", options.color.minorColor)
        .attr("text-anchor", "start")
        .text(options.yLabel));

        svg.append("path")
        .attr("fill", "none")
        .attr("stroke", options.color.majorColor)
        .attr("stroke-width", options.strokeWidth)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-opacity", options.strokeOpacity)
        .attr("d", line(I))

        svg.call(zoom);
        
        var focus = svg
        .append('g')
        .append('circle')
        .style("fill", "none")
        .attr("stroke", options.color.majorColor)
        .attr('r', 8.5)
        .style("opacity", 0);

        var focusText = svg
        .append('g')
        .append('text')
        .attr("fill", options.color.majorColor)
        .style("opacity", 0)
        .attr("text-anchor", "left")
        .attr("alignment-baseline", "middle")

        const mousemove = (e) => {
          var x0 = xScale.invert(e.offsetX);
          //const x0 = 0;
          var i = bisect(data, x0, 1);
          const selectedData = data[i-1];
          focus
            .attr("cx", xScale(xAccessor(selectedData)))
            .attr("cy", yScale(yAccessor(selectedData)))
          focusText
            .html("x:" + xAccessor(selectedData) + "  -  " + "y:" + yAccessor(selectedData))
            .attr("x", xScale(xAccessor(selectedData)) + 15)
            .attr("y", yScale(yAccessor(selectedData)))
        }

        svg
        .append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', options.width)
        .attr('height', options.height)
        .on('mouseover', () => {
          focus.style("opacity", 1)
          focusText.style("opacity",1)
        })
        .on('mousemove', mousemove)
        .on('mouseout', () => {
          focus.style("opacity", 0)
          focusText.style("opacity", 0)
        });
        
    }, [data, options, zoomState])
    
    const [optionsPanelState, setOptionsPanelState] = useState(false);
    const dragControls = useDragControls();
    const dragStart = (e) => {
      e.preventDefault();
      changeMaxCharZIndex();
      dragControls.start(e)
    };    

    return (
      <motion.div onClick={changeMaxCharZIndex} drag dragConstraints={appRef} dragListener={false} dragControls={dragControls} whileDrag={{ scale: 0.95, opacity: 0.8 }} dragMomentum={false} dragElastic={0} className='chart-wrapper' style={{zIndex: zIndex}}>
        <TopPanel dragStart={dragStart} title={title} closeFunction={closeFunction} optionsControl={() => setOptionsPanelState(!optionsPanelState)} svg={svgRef.current}/>
        <div className="line-chart">
          <svg ref={svgRef} />
          <div id="tooltip"></div>
          {optionsPanelState == 1 && 
          <DefaultOption options={options} changeOptions={changeOptions}>
              <BasicLineChartOption columns={columns} options={options} changeOptions={changeOptions}/>
          </DefaultOption>}
        </div>
      </motion.div>
      );
};

export default BasicLineChart;