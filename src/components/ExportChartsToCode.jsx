export default function ExportLineChart({
    options,
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
    }){
    
    const code = `
        import React, { useRef, useEffect, useState } from "react";
        import * as d3 from "d3";

        function testDate(str) {
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
          
        const BasicLineChart = () => {
            const svgRef = useRef(null);
            const options = ${JSON.stringify(options)};
            const [zoomState, setZoomState] = useState(null);

            
        }
    `;

    console.log(code);
}