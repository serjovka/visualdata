import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { baseLineChartOptions } from "../../../constants";
import { motion, useDragControls } from "framer-motion"
import TopPanel from "../topPanel/TopPanel";
import DefaultOption from "../DefaultOPtion";

const MapChart = ({
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
  const [optionsPanelState, setOptionsPanelState] = useState(false);
  const dragControls = useDragControls();
  const dragStart = (e) => {
    e.preventDefault();
    changeMaxCharZIndex();
    dragControls.start(e)
  };    


  useEffect(() => {
    const svg = d3
    .select(svgRef.current)
    .attr("width", options.width)
    .attr("height", options.height)
    .attr("viewBox", [0, 0, options.width, options.height])
    .attr("style", `max-width: 100%; height: auto; height: intrinsic; background-color: ${options.color.backgroundColor};`);
    
    const everything = svg.selectAll("*");
    everything.remove();

    const path = d3.geoPath();
    const projection = d3.geoMercator()
    .scale(Math.min(options.width, options.height) / 2 / Math.PI)
    .center([0,20])
    .translate([options.width / 2,options.height / 2]);

    // Data and color scale
    let data = new Map()
    const colorScale = d3.scaleThreshold()
    .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
    .range(d3.schemeBlues[7]);

// Load external data and boot
    Promise.all([
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) {
        data.set(d.code, +d.pop)
    })
    ]).then(function(loadData){
        console.log(loadData);
        let topo = loadData[0]

    // Draw the map
      svg.append("g")
      .selectAll("path")
      .data(topo.features)
      .join("path")
        // draw each country
        .attr("d", d3.geoPath()
          .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d) {
          d.total = data.get(d.id) || 0;
          return colorScale(d.total);
        })
    })
    },[data,options]);

    return (
      <motion.div onClick={changeMaxCharZIndex} drag dragConstraints={appRef} dragListener={false} dragControls={dragControls} whileDrag={{ scale: 0.95, opacity: 0.8 }} dragMomentum={false} dragElastic={0} className='chart-wrapper' style={{zIndex: zIndex}}>
        <TopPanel dragStart={dragStart} title={title} closeFunction={closeFunction} optionsControl={() => setOptionsPanelState(!optionsPanelState)}/>
        <div className="line-chart">
          <svg ref={svgRef} />
          {optionsPanelState == 1 && 
          <DefaultOption options={options} changeOptions={changeOptions}>
          </DefaultOption>}
        </div>
      </motion.div>
      );
}

export default MapChart;