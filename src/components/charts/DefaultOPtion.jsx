import React, { useRef, useEffect, useState } from "react";
import { themes, baseLineChartOptions } from "../../constants";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const DefaultOption = ({options, changeOptions, children}) => {
    return (
        <div className="options-panel">
            {children}
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <InputLabel id="theme-select-label">Тема</InputLabel>
                <Select
                    labelId="theme-select-label"
                    value={options.color.name}
                    label="Theme"
                    onChange={(e) => {changeOptions({...options, color: themes[e.target.value]})}}
                >
                    {Object.keys(themes).map((e) => {
                        return <MenuItem value={e} key={e}>{themes[e].name}</MenuItem>
                    })}
                </Select>           
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 200 }} size="small">
                <Typography variant="body2" gutterBottom>
                    Ширина
                </Typography>            
                <Slider
                    size="small"
                    value={options.width}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={300} max={1500}
                    onChange={(e) => {changeOptions({...options, width: e.target.value})}}
                />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 200 }} size="small">
                <Typography variant="body2" gutterBottom>
                    Высота
                </Typography>            
                <Slider
                    size="small"
                    value={options.height}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={300} max={1500}
                    onChange={(e) => {changeOptions({...options, height: e.target.value})}}
                />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 200 }} size="small">
                <TextField
                    size="small"
                    label="Ось X"
                    value={options.xLabel}
                    maxLength={20}
                    onChange={(e) => {changeOptions({...options, xLabel: e.target.value})}}
                />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 200 }} size="small">
                <TextField
                    size="small"
                    label="Ось Y"
                    value={options.yLabel}
                    maxLength={20}
                    onChange={(e) => {changeOptions({...options, yLabel: e.target.value})}}
                />
            </FormControl>
        </div>
    );
}
export default DefaultOption;