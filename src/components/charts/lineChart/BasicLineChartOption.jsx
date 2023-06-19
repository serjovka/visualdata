import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const BasicLineChartOption = ({columns, options, changeOptions}) => {
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="x-select-label">X</InputLabel>
                <Select
                    labelId="x-select-label"
                    value={options.x}
                    label="X"
                    onChange={(e) => {changeOptions({...options, x: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "X"}>{e.header}</MenuItem>
                    })}
                </Select>       
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="y-select-label">Y</InputLabel>
                <Select
                    labelId="y-select-label"
                    value={options.y}
                    label="Y"
                    onChange={(e) => {changeOptions({...options, y: e.target.value})}}
                >
                    {columns.map((e) => {
                        return <MenuItem value={e.header} key={e.header + "Y"}>{e.header}</MenuItem>
                    })}
                </Select>           
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 200 }} size="small">
                <Typography variant="body2" gutterBottom>
                    Ширина линии
                </Typography>            
                <Slider
                    size="small"
                    value={options.strokeWidth}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={1} max={5}
                    onChange={(e) => {changeOptions({...options, strokeWidth: e.target.value})}}
                />
            </FormControl>
            <FormControl sx={{ m: 1, maxWidth: 200 }} size="small">
                <Typography variant="body2" gutterBottom>
                    Прозрачность
                </Typography>            
                <Slider
                    size="small"
                    value={options.strokeOpacity}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    min={0} max={1} step={0.01}
                    onChange={(e) => {changeOptions({...options, strokeOpacity: e.target.value})}}
                />
            </FormControl>
        </>
    );
}
export default BasicLineChartOption;